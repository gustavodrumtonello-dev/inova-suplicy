"""
Modulo de integracao e sincronizacao com o Supabase para o sistema de Reconhecimento Facial.

Permite:
1. Conectar ao Supabase via URL e API Key configuradas no arquivo .env
2. Baixar fotos registradas na tabela (ex: teste_reconhecimento), direto dos Buckets ou de URLs diretas
3. Detectar rostos nas imagens, normalizar (200x200 escala de cinza equalizada)
4. Salvar no dataset local (faces_dataset/<Nome>/) e disparar o treinamento do modelo LBPH
"""

import os
import io
import re
import sys
import shutil
import urllib.parse
from typing import List, Dict, Tuple, Optional

# pyrefly: ignore [missing-import]
import cv2
# pyrefly: ignore [missing-import]
import numpy as np
import requests
from dotenv import load_dotenv

# Carrega variaveis do arquivo .env
PASTA_BASE = os.path.dirname(os.path.abspath(__file__))
ARQUIVO_ENV = os.path.join(PASTA_BASE, ".env")
load_dotenv(ARQUIVO_ENV)


def _limpar_env(chave: str, padrao: str = "") -> str:
    valor = os.getenv(chave, padrao)
    if valor is None:
        return padrao
    return valor.strip().strip("'").strip('"').strip()


SUPABASE_URL = _limpar_env("SUPABASE_URL", "")
SUPABASE_KEY = _limpar_env("SUPABASE_KEY", "")
SUPABASE_TABLE = _limpar_env("SUPABASE_TABLE", "teste_reconhecimento")
SUPABASE_COL_NAME = _limpar_env("SUPABASE_COL_NAME", "nome")
SUPABASE_COL_IMAGE = _limpar_env("SUPABASE_COL_IMAGE", "imagem_url")
SUPABASE_BUCKETS_RAW = _limpar_env("SUPABASE_BUCKETS", "Gustavo,Victor")
SUPABASE_URLS_RAW = _limpar_env("SUPABASE_URLS", "")

PASTA_DADOS = os.path.join(PASTA_BASE, "faces_dataset")
TAM_ROSTO = (200, 200)

# Detector de faces Haar cascade
CAMINHO_CASCADE = os.path.join(cv2.data.haarcascades, "haarcascade_frontalface_default.xml")
DETECTOR = cv2.CascadeClassifier(CAMINHO_CASCADE)


def obter_buckets() -> List[str]:
    """Retorna a lista de buckets configurados no .env."""
    if not SUPABASE_BUCKETS_RAW:
        return []
    return [b.strip() for b in SUPABASE_BUCKETS_RAW.split(",") if b.strip()]


def obter_urls_diretas() -> List[Tuple[str, str]]:
    """Retorna lista de pares (nome, url) configurados no SUPABASE_URLS."""
    if not SUPABASE_URLS_RAW:
        return []
    pares = []
    # Suporta separador ';' ou ','
    itens = re.split(r"[;,]", SUPABASE_URLS_RAW)
    for item in itens:
        if ":" in item:
            partes = item.split(":", 1)
            nome = partes[0].strip()
            url = partes[1].strip()
            if url.startswith("//"):
                url = "https:" + url
            elif not url.startswith("http"):
                url = "https://" + url
            if nome and url:
                pares.append((nome, url))
    return pares


def obter_cliente_supabase():
    """Inicializa e retorna o cliente Supabase."""
    if not SUPABASE_URL or not SUPABASE_KEY or "seu-projeto" in SUPABASE_URL:
        raise ValueError(
            "Credenciais do Supabase nao configuradas!\n"
            f"Abra o arquivo .env em:\n  {ARQUIVO_ENV}\n"
            "E preencha SUPABASE_URL e SUPABASE_KEY com os dados do seu projeto Supabase."
        )

    try:
        from supabase import create_client, Client
        return create_client(SUPABASE_URL, SUPABASE_KEY)
    except ImportError:
        raise RuntimeError("Biblioteca supabase nao instalada. Rode: pip install supabase")


def normalizar_nome_pasta(nome: str) -> str:
    """Limpa caracteres invalidos para nomes de pastas no Windows."""
    nome_limpo = re.sub(r'[\\/*?:"<>|]', "", str(nome).strip())
    return nome_limpo if nome_limpo else "SemNome"


def bytes_para_imagem_cinza(dados_bytes: bytes) -> Optional[np.ndarray]:
    """Converte bytes de uma imagem para matriz numpy em escala de cinza."""
    if not dados_bytes:
        return None
    try:
        nparr = np.frombuffer(dados_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            return None
        return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    except Exception as e:
        print(f"  [!] Erro ao decodificar imagem: {e}")
        return None


def recortar_e_preparar_rosto(cinza: np.ndarray) -> List[np.ndarray]:
    """
    Detecta face(s) na imagem, recorta e redimensiona para TAM_ROSTO com equalizacao de histograma.
    Gera variacoes (aumentacao de dados) para enriquecer o treino do LBPH.
    """
    if cinza is None or cinza.size == 0:
        return []

    faces = DETECTOR.detectMultiScale(
        cinza, scaleFactor=1.1, minNeighbors=4, minSize=(60, 60)
    )

    if len(faces) == 0:
        # Tenta com scaleFactor mais sensivel
        faces = DETECTOR.detectMultiScale(
            cinza, scaleFactor=1.05, minNeighbors=3, minSize=(40, 40)
        )

    if len(faces) == 0:
        # Se nao detectou rosto pelo Haar cascade, usa a imagem inteira
        rosto_base = cv2.resize(cinza, TAM_ROSTO)
        rosto_equalizado = cv2.equalizeHist(rosto_base)
        base = rosto_equalizado
    else:
        maior = max(faces, key=lambda f: f[2] * f[3])
        x, y, w, h = maior
        # Margem de seguranca de 10%
        margem_x = int(w * 0.1)
        margem_y = int(h * 0.1)
        x1 = max(0, x - margem_x)
        y1 = max(0, y - margem_y)
        x2 = min(cinza.shape[1], x + w + margem_x)
        y2 = min(cinza.shape[0], y + h + margem_y)

        recorte = cinza[y1:y2, x1:x2]
        rosto_base = cv2.resize(recorte, TAM_ROSTO)
        base = cv2.equalizeHist(rosto_base)

    # Gera 10 variacoes para garantir que o LBPH aprenda bem mesmo com 1 foto
    variacoes = [base]

    # 1. Flip horizontal
    variacoes.append(cv2.flip(base, 1))

    # 2. Ajustes de brilho e contraste
    for b_offset in (+25, -25, +40, -40):
        mod = np.clip(base.astype(np.int16) + b_offset, 0, 255).astype(np.uint8)
        variacoes.append(cv2.equalizeHist(mod))

    # 3. Leves rotacoes (-5 e +5 graus)
    h, w = base.shape
    centro = (w // 2, h // 2)
    for ang in (-5, 5):
        M = cv2.getRotationMatrix2D(centro, ang, 1.0)
        rot = cv2.warpAffine(base, M, (w, h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
        variacoes.append(cv2.equalizeHist(rot))

    # 4. Leve zoom central (92%)
    dh, dw = int(h * 0.04), int(w * 0.04)
    zoom = cv2.resize(base[dh:h - dh, dw:w - dw], TAM_ROSTO)
    variacoes.append(cv2.equalizeHist(zoom))

    # 5. Zoom + flip
    variacoes.append(cv2.flip(zoom, 1))

    return variacoes


def baixar_imagem_url(url: str) -> Optional[bytes]:
    """Baixa uma imagem a partir de uma URL HTTP/HTTPS."""
    try:
        resp = requests.get(url, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
        if resp.status_code == 200:
            return resp.content
        else:
            print(f"  [!] HTTP {resp.status_code} ao baixar {url}")
            return None
    except Exception as e:
        print(f"  [!] Erro ao baixar URL {url}: {e}")
        return None


def baixar_do_bucket(client, bucket_name: str, file_path: str) -> Optional[bytes]:
    """Baixa um arquivo diretamente do Supabase Storage usando o client."""
    try:
        dados = client.storage.from_(bucket_name).download(file_path)
        return dados
    except Exception as e:
        try:
            public_url = client.storage.from_(bucket_name).get_public_url(file_path)
            if public_url:
                return baixar_imagem_url(public_url)
        except Exception:
            pass
        print(f"  [!] Erro ao baixar '{file_path}' do bucket '{bucket_name}': {e}")
        return None


def testar_conexao():
    """Testa a conexao com o Supabase, verifica a tabela e os buckets."""
    print("\n--- Testando Conexao com o Supabase ---")
    try:
        client = obter_cliente_supabase()
        print(f"[OK] Cliente Supabase inicializado com sucesso para: {SUPABASE_URL}")
    except Exception as e:
        print(f"[ERRO] Falha ao inicializar Supabase: {e}")
        return

    # Testa Tabela
    print(f"\nVerificando tabela '{SUPABASE_TABLE}'...")
    try:
        resp = client.table(SUPABASE_TABLE).select("*").limit(10).execute()
        registros = resp.data or []
        print(f"[OK] Tabela acessivel! Encontrados {len(registros)} registro(s):")
        for reg in registros:
            print(f"   -> {reg}")
    except Exception as e:
        print(f"[AVISO] Nao foi possivel ler a tabela '{SUPABASE_TABLE}': {e}")

    # Testa Buckets
    buckets = obter_buckets()
    print(f"\nVerificando buckets configurados: {buckets}...")
    for b in buckets:
        try:
            arquivos = client.storage.from_(b).list()
            print(f"[OK] Bucket '{b}': {len(arquivos)} item(ns) encontrado(s):")
            for arq in arquivos:
                nome_arq = arq.get("name") if isinstance(arq, dict) else getattr(arq, "name", str(arq))
                print(f"     - {nome_arq}")
        except Exception as e:
            print(f"[AVISO] Erro ao listar bucket '{b}': {e}")

    # Testa URLs diretas
    urls_diretas = obter_urls_diretas()
    if urls_diretas:
        print(f"\nVerificando URLs diretas configuradas ({len(urls_diretas)} URLs)...")
        for nome, url in urls_diretas:
            print(f"   -> {nome}: {url}")

    print("\n--- Fim do Teste ---")


def sincronizar_supabase(limpar_dataset_antigo: bool = True) -> bool:
    """
    Sincroniza todos os registros e fotos do Supabase para a pasta faces_dataset/.
    """
    client = obter_cliente_supabase()

    if limpar_dataset_antigo and os.path.exists(PASTA_DADOS):
        print(f"\nLimpando dataset local antigo em '{PASTA_DADOS}'...")
        shutil.rmtree(PASTA_DADOS)

    os.makedirs(PASTA_DADOS, exist_ok=True)

    fotos_processadas_total = 0
    pessoas_processadas = set()

    # -------------------------------------------------------------------------
    # 1. Processar registros da tabela de banco de dados (ex: teste_reconhecimento)
    # -------------------------------------------------------------------------
    print(f"\n1) Consultando tabela '{SUPABASE_TABLE}'...")
    try:
        resp = client.table(SUPABASE_TABLE).select("*").execute()
        registros = resp.data or []
        print(f"   Encontrados {len(registros)} registro(s) na tabela.")

        for item in registros:
            nome = item.get(SUPABASE_COL_NAME) or item.get("name") or item.get("Nome")
            img_ref = item.get(SUPABASE_COL_IMAGE) or item.get("foto_url") or item.get("foto") or item.get("imagem") or item.get("image_url") or item.get("url")

            if not nome:
                continue

            nome_pasta = normalizar_nome_pasta(nome)
            pasta_pessoa = os.path.join(PASTA_DADOS, nome_pasta)
            os.makedirs(pasta_pessoa, exist_ok=True)

            dados_bytes = None

            if img_ref:
                img_ref_str = str(img_ref).strip()
                if img_ref_str.startswith("http://") or img_ref_str.startswith("https://"):
                    print(f"   Baixando imagem via URL para '{nome}'...")
                    dados_bytes = baixar_imagem_url(img_ref_str)
                else:
                    buckets_para_testar = [nome_pasta] + obter_buckets()
                    for b in buckets_para_testar:
                        dados_bytes = baixar_do_bucket(client, b, img_ref_str)
                        if dados_bytes:
                            break

            if dados_bytes:
                img_cinza = bytes_para_imagem_cinza(dados_bytes)
                if img_cinza is not None:
                    amostras = recortar_e_preparar_rosto(img_cinza)
                    idx_inicio = len(os.listdir(pasta_pessoa))
                    for i, rosto in enumerate(amostras):
                        caminho_salvar = os.path.join(pasta_pessoa, f"{idx_inicio + i:03d}.png")
                        ok, buf = cv2.imencode(".png", rosto)
                        if ok:
                            buf.tofile(caminho_salvar)
                            fotos_processadas_total += 1
                    pessoas_processadas.add(nome_pasta)
                    print(f"   [+] '{nome}': {len(amostras)} amostra(s) gerada(s) a partir da tabela.")

    except Exception as e:
        print(f"   [!] Aviso ao processar tabela '{SUPABASE_TABLE}': {e}")

    # -------------------------------------------------------------------------
    # 2. Processar diretamente os Buckets (ex: Gustavo, Victor)
    # -------------------------------------------------------------------------
    buckets = obter_buckets()
    if buckets:
        print(f"\n2) Verificando arquivos nos buckets {buckets}...")
        for b in buckets:
            nome_pessoa = normalizar_nome_pasta(b)
            pasta_pessoa = os.path.join(PASTA_DADOS, nome_pessoa)
            os.makedirs(pasta_pessoa, exist_ok=True)

            try:
                lista_arquivos = client.storage.from_(b).list()
                if not lista_arquivos:
                    continue

                for arq in lista_arquivos:
                    nome_arq = arq.get("name") if isinstance(arq, dict) else getattr(arq, "name", str(arq))
                    if not nome_arq or nome_arq.startswith("."):
                        continue

                    ext = os.path.splitext(nome_arq)[1].lower()
                    if ext and ext not in [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".jfif"]:
                        continue

                    dados_bytes = baixar_do_bucket(client, b, nome_arq)
                    if dados_bytes:
                        img_cinza = bytes_para_imagem_cinza(dados_bytes)
                        if img_cinza is not None:
                            amostras = recortar_e_preparar_rosto(img_cinza)
                            idx_inicio = len(os.listdir(pasta_pessoa))
                            for i, rosto in enumerate(amostras):
                                caminho_salvar = os.path.join(pasta_pessoa, f"{idx_inicio + i:03d}.png")
                                ok, buf = cv2.imencode(".png", rosto)
                                if ok:
                                    buf.tofile(caminho_salvar)
                                    fotos_processadas_total += 1
                            pessoas_processadas.add(nome_pessoa)
                            print(f"     -> Baixado do bucket '{b}': {nome_arq} ({len(amostras)} amostras)")

            except Exception as e:
                print(f"   [!] Erro ao processar bucket '{b}': {e}")

    # -------------------------------------------------------------------------
    # 3. Processar URLs diretas configuradas (ex: SUPABASE_URLS no .env)
    # -------------------------------------------------------------------------
    urls_diretas = obter_urls_diretas()
    if urls_diretas:
        print(f"\n3) Processando URLs diretas de fotos ({len(urls_diretas)})...")
        for nome, url in urls_diretas:
            nome_pasta = normalizar_nome_pasta(nome)
            pasta_pessoa = os.path.join(PASTA_DADOS, nome_pasta)
            os.makedirs(pasta_pessoa, exist_ok=True)

            print(f"   Baixando foto de '{nome}' via URL direta...")
            dados_bytes = baixar_imagem_url(url)
            if dados_bytes:
                img_cinza = bytes_para_imagem_cinza(dados_bytes)
                if img_cinza is not None:
                    amostras = recortar_e_preparar_rosto(img_cinza)
                    idx_inicio = len(os.listdir(pasta_pessoa))
                    for i, rosto in enumerate(amostras):
                        caminho_salvar = os.path.join(pasta_pessoa, f"{idx_inicio + i:03d}.png")
                        ok, buf = cv2.imencode(".png", rosto)
                        if ok:
                            buf.tofile(caminho_salvar)
                            fotos_processadas_total += 1
                    pessoas_processadas.add(nome_pasta)
                    print(f"   [+] '{nome}': {len(amostras)} amostras geradas com sucesso!")

    print(f"\nSincronizacao concluida!")
    print(f"Total de {fotos_processadas_total} imagens preparadas para {len(pessoas_processadas)} pessoa(s): {list(pessoas_processadas)}")
    return fotos_processadas_total > 0


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1].lower() == "testar":
        testar_conexao()
    else:
        sucesso = sincronizar_supabase()
        if sucesso:
            print("\nPara treinar o modelo e iniciar o reconhecimento:")
            print("  python camera.py treinar")
            print("  python camera.py reconhecer")
