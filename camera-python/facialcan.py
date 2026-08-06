import cv2
import time

def iniciar_sistema_cameras_mjpg():
    # cv2.CAP_DSHOW com formato de dados MJPEG
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

    # Força a codificação para MJPEG e define a resolução
    cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*'MJPG'))
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    if not cap.isOpened():
        print("Erro ao abrir a câmera com DirectShow.")
        return

    print("Aguardando o sensor da câmera inicializar...")
    time.sleep(2) # Aguarda 2 segundos para o sensor ligar

    # Descarta os primeiros 15 frames vazios/pretos emitidos pelo hardware
    for _ in range(15):
        cap.grab()

    print("Câmera pronta! Pressione 'q' na janela para fechar.")

    while True:
        ret, frame = cap.read()

        if not ret or frame is None:
            print("Aviso: Falha ao receber frame.")
            break

        cv2.imshow('Sistema de Registro de Atrasos - Camera', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    iniciar_sistema_cameras_mjpg()