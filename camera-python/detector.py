import mediapipe as mp


class Detector:

    def __init__(self):

        self.face = mp.solutions.face_detection.FaceDetection(
            model_selection=0,
            min_detection_confidence=0.5
        )


    def detectar(self, imagem):

        rgb = imagem[:, :, ::-1]

        resultado = self.face.process(rgb)

        return resultado.detections