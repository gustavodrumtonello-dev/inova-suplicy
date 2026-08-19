import cv2
import os
import urllib.request
import numpy as np
import tkinter as tk
from PIL import Image, ImageTk
from supabase import create_client, Client
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Erro: SUPABASE_URL ou SUPABASE_KEY não foram encontradas no arquivo .env!")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def carregar_alunos_supabase():
    """Busca alunos e turmas no Supabase e baixa os rostos para comparação."""
    try:
        resposta = supabase.table("alunos").select("Nome, Foto_url, turmas(Nome)").execute()
        registros = resposta.data if resposta.data else []

        alunos = []
        for reg in registros:
            nome = reg.get("Nome")
            foto_url = reg.get("Foto_url")
            turma_nome = reg.get("turmas", {}).get("Nome", "Sem Turma") if reg.get("turmas") else "Sem Turma"

            if foto_url:
                try:
                    req = urllib.request.urlopen(foto_url)
                    arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
                    img = cv2.imdecode(arr, cv2.IMREAD_GRAYSCALE)

                    if img is not None:
                        img = cv2.resize(img, (100, 100))
                        alunos.append({
                            "nome": nome,
                            "turma": turma_nome,
                            "imagem": img
                        })
                except Exception as e:
                    print(f"[ERRO] Não foi possível carregar foto do aluno {nome}: {e}")

        print(f"[SUPABASE] {len(alunos)} aluno(s) carregado(s) com sucesso!")
        return alunos

    except Exception as e:
        print(f"[ERRO] Falha ao conectar ao Supabase: {e}")
        return []

def iniciar_camera():
    alunos = carregar_alunos_supabase()
    cap = cv2.VideoCapture(0)

    detector = None
    try:
        if hasattr(cv2, 'CascadeClassifier') and hasattr(cv2, 'data'):
            detector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    except Exception:
        detector = None

    win = tk.Tk()
    win.title("Portaria Escolar - Reconhecimento Facial (Supabase)")
    win.geometry("800x600")

    label_video = tk.Label(win, bg="black")
    label_video.pack(fill="both", expand=True)

    def processar_frame():
        if cap is not None and cap.isOpened():
            ret, frame = cap.read()
            if ret and frame is not None:
                frame = cv2.flip(frame, 1)
                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

                if detector is not None:
                    rostos = detector.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(60, 60))

                    for (x, y, w, h) in rostos:
                        rosto_cortado = gray[y:y+h, x:x+w]
                        rosto_redim = cv2.resize(rosto_cortado, (100, 100))

                        nome_identificado = "Desconhecido"
                        menor_diferenca = float("inf")

                        for aluno in alunos:
                            res = cv2.matchTemplate(rosto_redim, aluno["imagem"], cv2.TM_SQDIFF_NORMED)
                            _, min_val, _, _ = cv2.minMaxLoc(res)

                            if min_val < 0.45 and min_val < menor_diferenca:
                                menor_diferenca = min_val
                                nome_identificado = f"{aluno['nome']} ({aluno['turma']})"

                        cor = (0, 255, 0) if nome_identificado != "Desconhecido" else (0, 0, 255)
                        cv2.rectangle(frame, (x, y), (x + w, y + h), cor, 2)
                        cv2.putText(frame, nome_identificado, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, cor, 2)

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