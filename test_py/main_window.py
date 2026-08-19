import tkinter as tk
from tkinter import messagebox
import subprocess
import sys

def abrir_cadastro():
    try:
        subprocess.Popen([sys.executable, "cadastrar_aluno.py"])
    except Exception as e:
        messagebox.showerror("Erro", f"Não foi possível abrir a tela de cadastro: {e}")

def abrir_camera():
    try:
        subprocess.Popen([sys.executable, "camera.py"])
    except Exception as e:
        messagebox.showerror("Erro", f"Não foi possível iniciar a portaria: {e}")

def criar_menu_principal():
    win = tk.Tk()
    win.title("Sistema de Portaria Escolar - Inova Suplicy")
    win.geometry("500x400")
    win.resizable(False, False)
    win.configure(bg="#f4f6f9")

    lbl_titulo = tk.Label(
        win, text="Portaria Escolar - Inova Suplicy", 
        font=("Arial", 16, "bold"), bg="#f4f6f9", fg="#2c3e50"
    )
    lbl_titulo.pack(pady=30)

    lbl_sub = tk.Label(
        win, text="Escolha uma opção para iniciar:", 
        font=("Arial", 11), bg="#f4f6f9", fg="#7f8c8d"
    )
    lbl_sub.pack(pady=5)

    frame_btn = tk.Frame(win, bg="#f4f6f9")
    frame_btn.pack(pady=20)

    btn_cadastrar = tk.Button(
        frame_btn, text="👤 Cadastrar Novo Aluno", 
        font=("Arial", 12, "bold"), bg="#007bff", fg="white", 
        width=25, height=2, cursor="hand2", command=abrir_cadastro
    )
    btn_cadastrar.pack(pady=10)

    btn_camera = tk.Button(
        frame_btn, text="📹 Iniciar Portaria (Câmera)", 
        font=("Arial", 12, "bold"), bg="#28a745", fg="white", 
        width=25, height=2, cursor="hand2", command=abrir_camera
    )
    btn_camera.pack(pady=10)

    lbl_rodape = tk.Label(
        win, text="Inova Suplicy © 2026", 
        font=("Arial", 9), bg="#f4f6f9", fg="#bdc3c7"
    )
    lbl_rodape.pack(side="bottom", pady=15)

    win.mainloop()

if __name__ == "__main__":
    criar_menu_principal()