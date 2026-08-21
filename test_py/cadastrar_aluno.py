# pyrefly: ignore [missing-import]
import cv2
import os
import tkinter as tk
from tkinter import ttk, messagebox
from PIL import Image, ImageTk
from supabase import create_client, Client
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
BUCKET_NAME = os.getenv("BUCKET_NAME", "fotos_alunos")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Erro: SUPABASE_URL ou SUPABASE_KEY não foram encontradas no arquivo .env!")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
PASTA_LOCAL_TEMP = "temp"

if not os.path.exists(PASTA_LOCAL_TEMP):
    os.makedirs(PASTA_LOCAL_TEMP)

def buscar_turmas():
    """Busca as turmas cadastradas na tabela 'turmas' do Supabase."""
    try:
        # ✅ Correção: Alinhado 'Nome' para 'nome' (minúsculo)
        resposta = supabase.table("turmas").select("id, nome").execute()
        return resposta.data if resposta.data else []
    except Exception as e:
        print(f"[ERRO] Falha ao carregar turmas: {e}")
        return []

def abrir_tela_cadastro():
    turmas_cadastradas = buscar_turmas()
    
    # ✅ Correção: Uso do backend DirectShow (CAP_DSHOW) no Windows
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

    win = tk.Tk()
    win.title("Cadastrar Novo Aluno - Supabase")
    win.geometry("800x680")

    frame_form = tk.Frame(win, pady=10)
    frame_form.pack()

    tk.Label(frame_form, text="Nome Completo:", font=("Arial", 11)).grid(row=0, column=0, sticky="w", padx=5)
    entry_nome = tk.Entry(frame_form, width=30, font=("Arial", 11))
    entry_nome.grid(row=0, column=1, padx=5, pady=5)

    tk.Label(frame_form, text="Turma / Ano:", font=("Arial", 11)).grid(row=1, column=0, sticky="w", padx=5)
    
    mapa_turmas = {}
    if turmas_cadastradas:
        opcoes_turmas = []
        for t in turmas_cadastradas:
            # ✅ Correção: Chave de acesso em minúsculo 'nome'
            label = f"{t['nome']} (ID: {t['id']})"
            opcoes_turmas.append(label)
            mapa_turmas[label] = t['id']
            
        combo_turma = ttk.Combobox(frame_form, values=opcoes_turmas, width=28, font=("Arial", 11), state="readonly")
        combo_turma.current(0)
        combo_turma.grid(row=1, column=1, padx=5, pady=5)
    else:
        combo_turma = tk.Entry(frame_form, width=30, font=("Arial", 11))
        combo_turma.grid(row=1, column=1, padx=5, pady=5)

    label_video = tk.Label(win, bg="black")
    label_video.pack(fill="both", expand=True, padx=10, pady=10)

    frame_atual = {"imagem": None}

    def atualizar_frame():
        if cap is not None and cap.isOpened():
            ret, frame = cap.read()
            if ret and frame is not None:
                frame = cv2.flip(frame, 1)
                frame_atual["imagem"] = frame.copy()
                
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                img = Image.fromarray(frame_rgb)
                img = img.resize((640, 360))
                imgtk = ImageTk.PhotoImage(image=img)
                label_video.imgtk = imgtk
                label_video.configure(image=imgtk)

        label_video.after(15, atualizar_frame)

    def salvar_cadastro_supabase():
        nome = entry_nome.get().strip()

        if turmas_cadastradas:
            turma_selecionada = combo_turma.get()
            turma_id = mapa_turmas.get(turma_selecionada)
        else:
            try:
                turma_id = int(combo_turma.get().strip())
            except ValueError:
                messagebox.showwarning("Aviso", "Insira um número válido para o ID da Turma!")
                return

        if not nome or not turma_id:
            messagebox.showwarning("Aviso", "Preencha o Nome e selecione a Turma!")
            return

        if frame_atual["imagem"] is None:
            messagebox.showerror("Erro", "Nenhuma imagem foi capturada pela webcam!")
            return

        try:
            nome_arquivo = f"aluno_{nome.lower().replace(' ', '_')}.jpg"
            caminho_temp = os.path.join(PASTA_LOCAL_TEMP, nome_arquivo)
            cv2.imwrite(caminho_temp, frame_atual["imagem"])

            with open(caminho_temp, 'rb') as f:
                supabase.storage.from_(BUCKET_NAME).upload(
                    file=f,
                    path=nome_arquivo,
                    file_options={"content-type": "image/jpeg", "x-upsert": "true"}
                )

            url_foto = supabase.storage.from_(BUCKET_NAME).get_public_url(nome_arquivo)

            # ✅ Correção: Nomes das colunas ajustados para minúsculas
            dados = {
                "nome": nome,
                "turma_id": turma_id,
                "foto_url": url_foto
            }
            supabase.table("alunos").insert(dados).execute()

            messagebox.showinfo("Sucesso", f"Aluno '{nome}' cadastrado com sucesso no Supabase!")
            entry_nome.delete(0, tk.END)

            if os.path.exists(caminho_temp):
                os.remove(caminho_temp)

        except Exception as e:
            messagebox.showerror("Erro no Supabase", f"Falha ao enviar os dados: {e}")

    btn_cadastrar = tk.Button(
        win, text="☁️ Capturar e Salvar no Supabase", font=("Arial", 12, "bold"),
        bg="#007bff", fg="white", command=salvar_cadastro_supabase, padx=10, pady=5
    )
    btn_cadastrar.pack(pady=10)

    def fechar():
        if cap is not None and cap.isOpened():
            cap.release()
        win.destroy()

    win.protocol("WM_DELETE_WINDOW", fechar)
    atualizar_frame()
    win.mainloop()

if __name__ == "__main__":
    abrir_tela_cadastro()