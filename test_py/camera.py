"""
Sistema de reconhecimento de faces via webcam ou fotos conectado ao Supabase e OpenCV.

Como usar:

1) Configurar o Supabase:
    Preencha o arquivo .env com SUPABASE_URL e SUPABASE_KEY.

2) Sincronizar fotos do Supabase e treinar:
    python camera.py sync

3) Testar reconhecimento em fotos (SEM precisar de webcam):
    python camera.py demo                  # Testa direto nas fotos do Supabase
    python camera.py foto "caminho_ou_url" # Testa em uma foto ou link especifico

4) Reconhecer ao vivo pela webcam:
    python camera.py reconhecer
    python camera.py reconhecer --camera 1 # se tiver outra camera ou celular conectado

Comandos adicionais:
    python camera.py testar             # testa conexao com o Supabase
    python camera.py treinar            # treina o modelo com fotos locais
    python camera.py listar             # lista pessoas cadastradas

Aperte Q a qualquer momento para fechar a janela da camera/imagem.
"""

import os
import sys

import cv2
import numpy as np
import requests

# ---------------------------------------------------------------------------
# Configuracoes
# ---------------------------------------------------------------------------
PASTA_BASE = os.path.dirname(os.path.abspath(__file__))
PASTA_DADOS = os.path.join(PASTA_BASE, "faces_dataset")
ARQUIVO_MODELO = os.path.join(PASTA_BASE, "modelo_lbph.yml")
ARQUIVO_ROTULOS = os.path.join(PASTA_BASE, "rotulos.txt")

QTD_AMOSTRAS = 40          # quantas fotos capturar por pessoa no cadastro local
INTERVALO_CAPTURA = 3      # salva 1 a cada N quadros
INDICE_CAMERA = 0          # 0 = webcam padrao
LIMIAR_CONFIANCA = 35.0    # abaixo disso = reconhecido; acima = "Desconhecido"
TAM_ROSTO = (200, 200)     # tamanho padronizado das imagens de rosto
QUADROS_AQUECIMENTO = 10   # descarta os primeiros quadros

# Detector de faces (Haar cascade embutido no OpenCV)
CAMINHO_CASCADE = os.path.join(cv2.data.haarcascades, "haarcascade_frontalface_default.xml")
DETECTOR = cv2.CascadeClassifier(CAMINHO_CASCADE)


# ---------------------------------------------------------------------------
# Utilidades
# ---------------------------------------------------------------------------
def verificar_detector():
    """Garante que o arquivo do Haar cascade foi carregado."""
    if DETECTOR.empty():
        raise RuntimeError(
            f"Nao consegui carregar o detector de faces em:\n  {CAMINHO_CASCADE}\n"
            "Instale a versao compativel:  pip install \"opencv-contrib-python<5\""
        )


def ler_imagem_cinza(caminho):
    """cv2.imread quebra com acentos no caminho (Windows). Isso resolve."""
    try:
        dados = np.fromfile(caminho, dtype=np.uint8)
    except OSError:
        return None
    if dados.size == 0:
        return None
    return cv2.imdecode(dados, cv2.IMREAD_GRAYSCALE)


def salvar_imagem(caminho, imagem):
    """cv2.imwrite quebra com acentos no caminho (Windows). Isso resolve."""
    ok, buffer = cv2.imencode(".png", imagem)
    if not ok:
        return False
    buffer.tofile(caminho)
    return True


def abrir_camera(fonte=INDICE_CAMERA):
    """Abre a webcam ou stream IP."""
    # Se fonte for string numerica
    if isinstance(fonte, str) and fonte.isdigit():
        fonte = int(fonte)

    if isinstance(fonte, str):
        # Stream URL (ex: IP Webcam, RTSP, etc.)
        cam = cv2.VideoCapture(fonte)
        if cam.isOpened():
            print(f"Camera conectada via stream: {fonte}")
            return cam
        cam.release()
        raise RuntimeError(f"Nao consegui abrir o stream de video em: {fonte}")

    for nome, backend in (("DirectShow", cv2.CAP_DSHOW),
                          ("MSMF", cv2.CAP_MSMF),
                          ("padrao", cv2.CAP_ANY)):
        cam = cv2.VideoCapture(fonte, backend)
        if cam.isOpened():
            for _ in range(QUADROS_AQUECIMENTO):
                cam.read()
            print(f"Camera {fonte} aberta via {nome}.")
            return cam
        cam.release()

    raise RuntimeError(
        f"Nao consegui acessar a webcam {fonte}.\n"
        "- No Windows: Verifique Configuracoes > Privacidade e Seguranca > Camera > 'Permitir que os aplicativos acessem a camera'.\n"
        "- Se o computador for desktop e nao tiver webcam fisica, você pode testar fotos usando: python camera.py demo"
    )


def detectar_faces(cinza):
    """Retorna a lista de retangulos (x, y, w, h) das faces encontradas."""
    return DETECTOR.detectMultiScale(
        cinza, scaleFactor=1.15, minNeighbors=4, minSize=(60, 60)
    )


def maior_face(faces):
    """Escolhe a face mais proxima da camera (a de maior area)."""
    return max(faces, key=lambda f: f[2] * f[3])


def preparar_rosto(cinza, caixa):
    """Recorta, redimensiona e equaliza o rosto."""
    x, y, w, h = caixa
    rosto = cv2.resize(cinza[y:y + h, x:x + w], TAM_ROSTO)
    return cv2.equalizeHist(rosto)


def janela_fechada(titulo):
    """Detecta se o usuario fechou a janela no X."""
    try:
        return cv2.getWindowProperty(titulo, cv2.WND_PROP_VISIBLE) < 1
    except cv2.error:
        return True


def proximo_indice(pasta):
    """Continua a numeracao das fotos em vez de sobrescrever cadastros antigos."""
    maior = -1
    for arquivo in os.listdir(pasta):
        nome, _ = os.path.splitext(arquivo)
        if nome.isdigit():
            maior = max(maior, int(nome))
    return maior + 1


# ---------------------------------------------------------------------------
# 1) CADASTRAR - captura fotos pela webcam
# ---------------------------------------------------------------------------
def cadastrar(nome, indice_camera=INDICE_CAMERA):
    verificar_detector()

    pasta_pessoa = os.path.join(PASTA_DADOS, nome)
    os.makedirs(pasta_pessoa, exist_ok=True)
    numero = proximo_indice(pasta_pessoa)
    if numero:
        print(f"Ja existiam {numero} foto(s) de '{nome}'. As novas serao adicionadas.")

    titulo = "Cadastro - aperte Q para sair"
    cam = abrir_camera(indice_camera)
    print(f"Cadastrando '{nome}'. Olhe para a camera e mova um pouco o rosto.")
    print("Capturando... aperte Q para cancelar.")

    capturadas = 0
    quadros = 0
    try:
        while capturadas < QTD_AMOSTRAS:
            ok, quadro = cam.read()
            if not ok:
                print("Perdi o sinal da camera.")
                break

            quadros += 1
            cinza = cv2.cvtColor(quadro, cv2.COLOR_BGR2GRAY)
            faces = detectar_faces(cinza)

            if len(faces):
                caixa = maior_face(faces)
                x, y, w, h = caixa
                cor = (0, 255, 0)

                if quadros % INTERVALO_CAPTURA == 0:
                    caminho = os.path.join(pasta_pessoa, f"{numero + capturadas:03d}.png")
                    if salvar_imagem(caminho, preparar_rosto(cinza, caixa)):
                        capturadas += 1

                cv2.rectangle(quadro, (x, y), (x + w, y + h), cor, 2)
                cv2.putText(quadro, f"{capturadas}/{QTD_AMOSTRAS}", (x, y - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, cor, 2)
            else:
                cv2.putText(quadro, "Nenhum rosto detectado", (20, 40),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

            cv2.imshow(titulo, quadro)
            if cv2.waitKey(1) & 0xFF == ord("q") or janela_fechada(titulo):
                break
    finally:
        cam.release()
        cv2.destroyAllWindows()

    print(f"Pronto! {capturadas} foto(s) nova(s) salva(s) em {pasta_pessoa}")
    if capturadas:
        print("Agora rode:  python camera.py treinar")


# ---------------------------------------------------------------------------
# 2) TREINAR - le fotos e treina o LBPH
# ---------------------------------------------------------------------------
def treinar():
    if not os.path.isdir(PASTA_DADOS):
        print("Nenhum rosto cadastrado. Sincronize com o Supabase:")
        print("  python camera.py sync")
        return

    rostos, rotulos, nomes = [], [], {}
    id_atual = 0

    for nome in sorted(os.listdir(PASTA_DADOS)):
        pasta_pessoa = os.path.join(PASTA_DADOS, nome)
        if not os.path.isdir(pasta_pessoa):
            continue

        encontradas = 0
        for arquivo in sorted(os.listdir(pasta_pessoa)):
            img = ler_imagem_cinza(os.path.join(pasta_pessoa, arquivo))
            if img is None:
                continue
            if img.shape != TAM_ROSTO[::-1]:
                img = cv2.resize(img, TAM_ROSTO)
            rostos.append(img)
            rotulos.append(id_atual)
            encontradas += 1

        if encontradas:
            nomes[id_atual] = nome
            id_atual += 1
            print(f"  {nome}: {encontradas} imagem(ns)")
        else:
            print(f"  {nome}: pasta vazia, ignorada")

    if not rostos:
        print("Nao encontrei imagens para treinar.")
        return

    reconhecedor = cv2.face.LBPHFaceRecognizer_create()
    reconhecedor.train(rostos, np.array(rotulos))
    reconhecedor.write(ARQUIVO_MODELO)

    with open(ARQUIVO_ROTULOS, "w", encoding="utf-8") as f:
        for id_pessoa, nome in nomes.items():
            f.write(f"{id_pessoa};{nome}\n")

    print(f"\n[OK] Modelo treinado com sucesso!")
    print(f"Total: {len(rostos)} imagens de {len(nomes)} pessoa(s): {list(nomes.values())}")
    print("Agora teste com:  python camera.py demo   ou   python camera.py reconhecer")


def carregar_rotulos():
    nomes = {}
    if os.path.exists(ARQUIVO_ROTULOS):
        with open(ARQUIVO_ROTULOS, encoding="utf-8") as f:
            for linha in f:
                if ";" in linha:
                    id_pessoa, nome = linha.strip().split(";", 1)
                    nomes[int(id_pessoa)] = nome
    return nomes


def listar():
    if not os.path.isdir(PASTA_DADOS):
        print("Nenhum rosto cadastrado ainda.")
        return
    print(f"Cadastros em {PASTA_DADOS}:")
    vazio = True
    for nome in sorted(os.listdir(PASTA_DADOS)):
        pasta = os.path.join(PASTA_DADOS, nome)
        if os.path.isdir(pasta):
            print(f"  {nome}: {len(os.listdir(pasta))} foto(s)")
            vazio = False
    if vazio:
        print("  (nenhum)")
    print("Modelo treinado:", "sim" if os.path.exists(ARQUIVO_MODELO) else "nao")


# ---------------------------------------------------------------------------
# 3) RECONHECER - ao vivo pela webcam
# ---------------------------------------------------------------------------
def reconhecer(indice_camera=INDICE_CAMERA):
    verificar_detector()

    if not os.path.exists(ARQUIVO_MODELO):
        print("Modelo nao encontrado. Sincronize com o Supabase ou treine:")
        print("  python camera.py sync")
        return

    reconhecedor = cv2.face.LBPHFaceRecognizer_create()
    reconhecedor.read(ARQUIVO_MODELO)
    nomes = carregar_rotulos()

    titulo = "Reconhecimento Facial - Aperte Q para sair"
    cam = abrir_camera(indice_camera)
    print("Reconhecimento ao vivo iniciado. Aperte Q para sair.")

    try:
        while True:
            ok, quadro = cam.read()
            if not ok:
                print("Perdi o sinal da camera.")
                break

            cinza = cv2.cvtColor(quadro, cv2.COLOR_BGR2GRAY)
            faces = detectar_faces(cinza)

            for caixa in faces:
                x, y, w, h = caixa
                id_pessoa, confianca = reconhecedor.predict(preparar_rosto(cinza, caixa))

                # No LBPH: confianca menor = mais proximo / mais confianca
                if confianca < LIMIAR_CONFIANCA:
                    nome = nomes.get(id_pessoa, "Desconhecido")
                    cor = (0, 255, 0)
                    legenda = f"{nome} ({confianca:.0f})"
                else:
                    cor = (0, 0, 255)
                    legenda = f"Desconhecido ({confianca:.0f})"

                cv2.rectangle(quadro, (x, y), (x + w, y + h), cor, 2)
                cv2.putText(quadro, legenda, (x, y - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, cor, 2)

            cv2.imshow(titulo, quadro)
            if cv2.waitKey(1) & 0xFF == ord("q") or janela_fechada(titulo):
                break
    finally:
        cam.release()
        cv2.destroyAllWindows()


# ---------------------------------------------------------------------------
# 4) TESTE DE FOTOS (SEM NECESSIDADE DE WEBCAM)
# ---------------------------------------------------------------------------
def testar_foto(caminho_ou_url: str):
    """Executa o reconhecimento facial em uma imagem local ou URL."""
    verificar_detector()

    if not os.path.exists(ARQUIVO_MODELO):
        print("Modelo nao encontrado. Rode primeiro:  python camera.py sync")
        return

    reconhecedor = cv2.face.LBPHFaceRecognizer_create()
    reconhecedor.read(ARQUIVO_MODELO)
    nomes = carregar_rotulos()

    quadro = None
    if caminho_ou_url.startswith("http://") or caminho_ou_url.startswith("https://"):
        print(f"\nBaixando foto para teste: {caminho_ou_url}...")
        resp = requests.get(caminho_ou_url, timeout=15)
        if resp.status_code == 200:
            arr = np.frombuffer(resp.content, np.uint8)
            quadro = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        else:
            print(f"[ERRO] Falha ao baixar imagem: HTTP {resp.status_code}")
            return
    else:
        try:
            arr = np.fromfile(caminho_ou_url, dtype=np.uint8)
            quadro = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        except Exception as e:
            print(f"[ERRO] Falha ao abrir arquivo {caminho_ou_url}: {e}")
            return

    if quadro is None:
        print(f"[ERRO] Nao foi possivel carregar a imagem de: {caminho_ou_url}")
        return

    cinza = cv2.cvtColor(quadro, cv2.COLOR_BGR2GRAY)
    faces = detectar_faces(cinza)

    print(f"\n--- Resultado do Reconhecimento ---")
    print(f"Faces detectadas na imagem: {len(faces)}")

    if len(faces) == 0:
        print("[!] Nenhuma face detectada pelo algoritmo Haar Cascade nesta foto.")
        return

    for i, caixa in enumerate(faces):
        x, y, w, h = caixa
        id_pessoa, confianca = reconhecedor.predict(preparar_rosto(cinza, caixa))

        if confianca < LIMIAR_CONFIANCA:
            nome = nomes.get(id_pessoa, "Desconhecido")
            status = f"[RECONHECIDO] -> {nome} (Confianca LBPH: {confianca:.1f})"
            cor = (0, 255, 0)
        else:
            status = f"[DESCONHECIDO] (Confianca LBPH: {confianca:.1f})"
            cor = (0, 0, 255)

        print(f"Face #{i+1}: {status}")

        cv2.rectangle(quadro, (x, y), (x + w, y + h), cor, 2)
        cv2.putText(quadro, status.replace("[RECONHECIDO] -> ", "").replace("[DESCONHECIDO]", "Desconhecido"),
                    (x, max(20, y - 10)), cv2.FONT_HERSHEY_SIMPLEX, 0.7, cor, 2)

    # Salva imagem resultante
    caminho_resultado = os.path.join(PASTA_BASE, "resultado_teste.png")
    cv2.imwrite(caminho_resultado, quadro)
    print(f"\n[OK] Imagem com o resultado anotado salva em:\n  {caminho_resultado}")

    # Tenta exibir janela se possivel
    try:
        titulo = f"Resultado - Aperte Q para fechar"
        cv2.imshow(titulo, quadro)
        cv2.waitKey(2000)
        cv2.destroyAllWindows()
    except Exception:
        pass



def executar_demo():
    """Testa automaticamente o reconhecimento usando as fotos do Supabase."""
    from supabase_sync import obter_urls_diretas
    urls = obter_urls_diretas()
    if not urls:
        print("Nenhuma URL configurada em SUPABASE_URLS no .env.")
        return

    print("\n=======================================================")
    print("        TESTANDO RECONHECIMENTO FACIAL (DEMO)          ")
    print("=======================================================")
    for nome, url in urls:
        print(f"\n>>> Testando foto de '{nome}':")
        testar_foto(url)


# ---------------------------------------------------------------------------
# 5) SUPABASE - Sincronizacao e Testes
# ---------------------------------------------------------------------------
def executar_sincronizacao():
    """Baixa as fotos do Supabase e treina o modelo automaticamente."""
    from supabase_sync import sincronizar_supabase
    print("--- Sincronizando dados com o Supabase ---")
    sucesso = sincronizar_supabase(limpar_dataset_antigo=True)
    if sucesso:
        print("\n--- Iniciando Treinamento com as novas fotos ---")
        treinar()
    else:
        print("\nNenhuma imagem foi baixada do Supabase. Verifique seu .env e o comando 'python camera.py testar'.")


def executar_teste():
    """Testa conexao com o Supabase e exibe status."""
    from supabase_sync import testar_conexao
    testar_conexao()


# ---------------------------------------------------------------------------
# Ponto de entrada
# ---------------------------------------------------------------------------
def extrair_camera(args):
    """Le a opcao --camera N ou --url URL e devolve (fonte, args_restantes)."""
    fonte = INDICE_CAMERA
    restantes = []
    i = 0
    while i < len(args):
        if args[i] == "--camera" and i + 1 < len(args):
            fonte = args[i + 1]
            i += 2
        elif args[i] == "--url" and i + 1 < len(args):
            fonte = args[i + 1]
            i += 2
        else:
            restantes.append(args[i])
            i += 1
    return fonte, restantes


def main():
    fonte_camera, args = extrair_camera(sys.argv[1:])
    comando = args[0].lower() if args else "reconhecer"

    try:
        if comando in ("demo", "teste_demo"):
            executar_demo()
        elif comando in ("foto", "testar_foto", "test_foto"):
            if len(args) < 2:
                print('Informe o caminho da foto ou URL. Ex: python camera.py foto "minha_foto.jpg"')
                return
            testar_foto(args[1])
        elif comando in ("sync", "supabase", "sincronizar"):
            executar_sincronizacao()
        elif comando in ("testar", "teste", "test"):
            executar_teste()
        elif comando == "cadastrar":
            if len(args) < 2:
                print('Informe o nome. Ex: python camera.py cadastrar "Gustavo"')
                return
            cadastrar(args[1], fonte_camera)
        elif comando == "treinar":
            treinar()
        elif comando == "listar":
            listar()
        elif comando == "reconhecer":
            reconhecer(fonte_camera)
        else:
            print(__doc__)
    except RuntimeError as erro:
        print(f"\nErro: {erro}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nCancelado.")


if __name__ == "__main__":
    main()
