import cv2

cap = cv2.VideoCapture(0, cv2.CAP_MSMF)

if not cap.isOpened():
    print("Não foi possível abrir a câmera.")
    exit()

while True:
    ret, frame = cap.read()

    if not ret:
        print("Não foi possível capturar um frame.")
        continue

    cv2.imshow("Webcam", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()