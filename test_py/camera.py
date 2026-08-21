# pyrefly: ignore [missing-import]
import cv2
import os
import urllib.request
import numpy as np
import tkinter as tk
from PIL import Image, ImageTk
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import datetime, time

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Erro: SUPABASE_URL ou SUPABASE_KEY não foram encontradas no arquivo .env!")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ⏰ CONFIGURAÇÃO DE HORÁRIO DE ENTRADA
HORA_LIMITE_ENTRADA = time(7, 30)

ultimas_entradas = {}

def carregar_alunos_supabase():
    try:
        resposta = supabase.table("alunos").select("id, nome, foto_url, turmas(nome)").execute()
        registros = resposta.data if resposta.data else []

        alunos = []
        for reg in registros:
            aluno_id = reg.get("id")
            nome = reg.get("nome")
            foto_url = reg.get("foto_url")
            
            turma_data = reg.get("turmas")
            turma_nome = "Sem Turma"
            if turma_data and isinstance(turma_data, dict):
                turma_nome = turma_data.get("nome", "Sem Turma")

            if foto_url:
                try:
                    req = urllib.request.urlopen(foto_url)
                    arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
                    img = cv2.imdecode(arr, cv2.IMREAD_GRAYSCALE)

                    if img is not None:
                        img = cv2.resize(img, (100, 100))
                        alunos.append({
                            "id": aluno_id,
                            "nome": nome,
                            "turma": turma_nome,
                            "imagem": img
                        })
                        print(f"[OK] Foto carregada para: {nome}")
                except Exception as e:
                    print(f"[ERRO] Falha ao baixar foto de {nome}: {e}")

        print(f"\n[TOTAL] {len(alunos)} aluno(s) carregado(s)!\n")
        return alunos

    except Exception as e:
        print(f"[ERRO CRITICO] Supabase: {e}")
        return []

def registrar_entrada_banco(aluno_id, status):
    agora = datetime.now()
    if aluno_id in ultimas_entradas:
        if (agora - ultimas_entradas[aluno_id]).total_seconds() < 60:
            return

    try:
        supabase.table("entradas").insert({
            "aluno_id": aluno_id,
            "status": status,
            "data_hora": agora.isoformat()
        }).execute()
        ultimas_entradas[aluno_id] = agora
        print(f"[REGISTRO] Entrada salva: ID {aluno_id} ({status})")
    except Exception as e:
        print(f"[AVISO] Tabela 'entradas' não atualizada: {e}")

def iniciar_camera():
    alunos = carregar_alunos_supabase()
    
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    if not cap.isOpened():
        cap = cv2.VideoCapture(0)

    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    # Carga do detector com caminho padrão estático
    detector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    win = tk.Tk()
    win.title("Portaria Escolar - Reconhecimento Facial")
    win.geometry("800x600")

    label_video = tk.Label(win, bg="black")
    label_video.pack(fill="both", expand=True)

    def processar_frame():
        if cap is not None and cap.isOpened():
            ret, frame = cap.read()
            
            if ret and frame is not None and frame.size > 0:
                frame = cv2.flip(frame, 1)
                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

                if not detector.empty():
                    # ✅ Ajuste de sensibilidade: minNeighbors baixado para 3 e minSize para 30x30
                    rostos = detector.detectMultiScale(
                        gray, 
                        scaleFactor=1.1, 
                        minNeighbors=3, 
                        minSize=(30, 30)
                    )

                    for (x, y, w, h) in rostos:
                        rosto_cortado = gray[y:y+h, x:x+w]
                        rosto_redim = cv2.resize(rosto_cortado, (100, 100))

                        aluno_encontrado = None
                        menor_diferenca = float("inf")

                        for aluno in alunos:
                            res = cv2.matchTemplate(rosto_redim, aluno["imagem"], cv2.TM_SQDIFF_NORMED)
                            _, min_val, _, _ = cv2.minMaxLoc(res)

                            if min_val < menor_diferenca:
                                menor_diferenca = min_val

                            # Limiar tolerante para o teste
                            if min_val < 0.60:
                                aluno_encontrado = aluno

                        agora = datetime.now()
                        hora_atual_str = agora.strftime("%H:%M:%S")

                        if aluno_encontrado:
                            nome = aluno_encontrado['nome']
                            turma = aluno_encontrado['turma']
                            aluno_id = aluno_encontrado.get('id')
                            
                            if agora.time() <= HORA_LIMITE_ENTRADA:
                                cor = (0, 255, 0)      # Verde (No horário)
                                status = "No Horario"
                            else:
                                cor = (0, 165, 255)    # Laranja (Atrasado)
                                status = "ATRASADO"

                            texto1 = f"{nome} ({turma})"
                            texto2 = f"{status} - {hora_atual_str}"

                            if aluno_id:
                                registrar_entrada_banco(aluno_id, status)
                        else:
                            cor = (0, 0, 255)          # Vermelho (Desconhecido)
                            texto1 = f"Desconhecido ({menor_diferenca:.2f})"
                            texto2 = f"Hora: {hora_atual_str}"

                        # Desenha retângulo no rosto
                        cv2.rectangle(frame, (x, y), (x + w, y + h), cor, 2)
                        cv2.putText(frame, texto1, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, cor, 2)
                        cv2.putText(frame, texto2, (x, y + h + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, cor, 2)
                else:
                    cv2.putText(frame, "ERRO: Detector HaarCascade Vazio", (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                img = Image.fromarray(frame_rgb)
                imgtk = ImageTk.PhotoImage(image=img)
                
                label_video.imgtk = imgtk
                label_video.configure(image=imgtk)

        label_video.after(20, processar_frame)

    def fechar():
        if cap is not None and cap.isOpened():
            cap.release()
        win.destroy()

    win.protocol("WM_DELETE_WINDOW", fechar)
    processar_frame()
    win.mainloop()

if __name__ == "__main__":
    iniciar_camera()