from camera import Camera
from detector import Detector


camera = Camera()

detector = Detector()


while True:

    frame = camera.capturar()

    if frame is None:
        break


    rostos = detector.detectar(frame)


    if rostos:
        print("Rosto detectado")


    cv2.imshow(
        "Reconhecimento Facial",
        frame
    )


    if cv2.waitKey(1) == ord("q"):
        break


camera.liberar()