import os
import cv2
import numpy as np
import customtkinter as ctk
from dotenv import load_dotenv
from supabase import create_client, Client

# --- 1. CONFIGURAÇÃO E CONEXÃO SUPABASE ---
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
BUCKET_NAME = os.getenv("BUCKET_NAME", "fotos_alunos")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Credenciais do Supabase não encontradas no arquivo .env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Classificador facial OpenCV (Haar Cascade)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# --- 2. CAPTURA DE FOTO E EMBEDDING ---
def capturar_foto_e_embedding():
    cap = cv2.VideoCapture(0)
    print("Pressione 'ESPAÇO' na janela da câmera para tirar a foto (ou 'ESC' para cancelar).")
    
    foto_salva_path = "temp_aluno.jpg"
    embedding_dummy = []
    
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Erro ao acessar a webcam.")
            break
            
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(100, 100))
        
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
            
        cv2.imshow("Captura de Aluno - Pressione ESPAÇO", frame)
        
        key = cv2.waitKey(1)
        if key == 32:  # ESPAÇO
            if len(faces) > 0:
                cv2.imwrite(foto_salva_path, frame)
                
                # Gera o vetor facial base
                x, y, w, h = faces[0]
                rosto = gray[y:y+h, x:x+w]
                rosto_resized = cv2.resize(rosto, (64, 64))
                embedding_dummy = rosto_resized.flatten().tolist()
                
                print("Foto capturada com sucesso!")
                break
            else:
                print("Nenhum rosto detectado! Posicione-se em frente à câmera.")
        elif key == 27:  # ESC
            break
            
    cap.release()
    cv2.destroyAllWindows()
    return foto_salva_path if len(embedding_dummy) > 0 else None, embedding_dummy

# --- 3. ENVIO DOS DADOS AO BUCKET fotos_alunos E TABELA alunos ---
def salvar_no_supabase(nome, turma_id, caminho_foto, embedding):
    nome_limpo = nome.lower().replace(" ", "_")
    nome_arquivo = f"{nome_limpo}_{turma_id}.jpg"
    
    # 1. Upload para o bucket fotos_alunos
    with open(caminho_foto, 'rb') as f:
        supabase.storage.from_(BUCKET_NAME).upload(
            file=f,
            path=nome_arquivo,
            file_options={"content-type": "image/jpeg", "upsert": "true"}
        )
    
    # 2. Obtém a URL pública da foto
    foto_url = supabase.storage.from_(BUCKET_NAME).get_public_url(nome_arquivo)
    
    # 3. Salva os dados na tabela 'alunos'
    dados_aluno = {
        "nome": nome,
        "turma_id": int(turma_id),
        "foto_url": foto_url,
        "embedding_facial": embedding
    }
    
    res = supabase.table("alunos").insert(dados_aluno).execute()
    
    # Apaga a foto temporária do computador
    if os.path.exists(caminho_foto):
        os.remove(caminho_foto)
        
    return res

# --- 4. INTERFACE GRÁFICA DE CADASTRO ---
def iniciar_interface():
    ctk.set_appearance_mode("System")
    ctk.set_default_color_theme("blue")
    
    app = ctk.CTk()
    app.title("Portaria Escolar - Cadastro de Aluno")
    app.geometry("400x350")
    
    lbl_titulo = ctk.CTkLabel(app, text="Cadastrar Novo Aluno", font=("Arial", 20, "bold"))
    lbl_titulo.pack(pady=20)
    
    entry_nome = ctk.CTkEntry(app, placeholder_text="Nome completo do aluno", width=300)
    entry_nome.pack(pady=10)
    
    entry_turma = ctk.CTkEntry(app, placeholder_text="ID da Turma (Ex: 1, 2 ou 3)", width=300)
    entry_turma.pack(pady=10)
    
    lbl_status = ctk.CTkLabel(app, text="", font=("Arial", 12))
    lbl_status.pack(pady=10)
    
    def acao_cadastrar():
        nome = entry_nome.get().strip()
        turma_id = entry_turma.get().strip()
        
        if not nome or not turma_id:
            lbl_status.configure(text="Preencha todos os campos!", text_color="red")
            return
            
        lbl_status.configure(text="Abra a janela da câmera para capturar...", text_color="yellow")
        app.update()
        
        caminho_foto, embedding = capturar_foto_e_embedding()
        
        if caminho_foto and embedding:
            try:
                salvar_no_supabase(nome, turma_id, caminho_foto, embedding)
                lbl_status.configure(text="Aluno cadastrado em 'fotos_alunos' com sucesso!", text_color="green")
                entry_nome.delete(0, 'end')
                entry_turma.delete(0, 'end')
            except Exception as e:
                lbl_status.configure(text=f"Erro ao salvar: {e}", text_color="red")
        else:
            lbl_status.configure(text="Captura cancelada ou nenhum rosto detectado.", text_color="red")

    btn_capturar = ctk.CTkButton(app, text="Capturar Foto & Salvar", command=acao_cadastrar, width=300)
    btn_capturar.pack(pady=20)
    
    app.mainloop()

if __name__ == "__main__":
    iniciar_interface()