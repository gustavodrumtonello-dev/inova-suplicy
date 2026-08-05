import cv2


class Camera:

    def __init__(self, camera_id=0):
        self.camera = cv2.VideoCapture(camera_id)

    def capturar(self):
        sucesso, frame = self.camera.read()

        if sucesso:
            return frame

        return None


    def liberar(self):
        self.camera.release()