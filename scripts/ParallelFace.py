from multiprocessing import Process,Queue,Pipe

import face_recognition
import cv2
import numpy as np
import uuid
import glob
import json
from WebcamVideoStream import WebcamVideoStream
from VideoStream import PiVideoStream

def fParallelFace(q):
    #vs = cv2.VideoCapture(0)
    #vs.set(cv2.CAP_PROP_FOURCC,cv2.VideoWriter_fourcc('M','J','P','G'))
    vs = WebcamVideoStream(src=0).start()
    #vs = PiVideoStream().start()
    # Create arrays of known face encodings and their names
    known_face_encodings = []
    known_face_names = []

    # Load faces from faces folder, taking names from jpg name
    for file in glob.glob('faces/*.jpg'):
        file_img = face_recognition.load_image_file(file)
        if len(face_recognition.face_encodings(file_img)) > 0:
            file_face_encoding = face_recognition.face_encodings(file_img)[0]
            
            known_face_encodings.append(file_face_encoding)
            known_face_names.append(file.replace('faces\\', '').replace('.jpg', ''))

    #obama_image = face_recognition.load_image_file("faces/obama.jpg")
    #obama_face_encoding = face_recognition.face_encodings(obama_image)[0]

    # Initialize some variables
    face_locations = []
    face_encodings = []
    face_names = []
    process_this_frame = 0
    qrCodeDetector = cv2.QRCodeDetector()

    newUser = None
    while True:
        if process_this_frame % 20 == 0:
            process_this_frame = 0
            frame = vs.read()
            
            small_frame = None
            try:
                small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
            except:
                continue
            rgb_small_frame = small_frame[:, :, ::-1]

            # Only process every other frame of video to save time
            # QR Code reading
            try:
                qrText = qrCodeDetector.detectAndDecode(frame)[0]
                if qrText != '':
                    q.put({'process': 'qr', 'args': qrText})

                    if qrText[0] == 'n':
                        newUser = qrText[1:]
            except:
                pass

            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            face_names = []
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = "Unknown"

                # # If a match was found in known_face_encodings, just use the first one.
                # if True in matches:
                #     first_match_index = matches.index(True)
                #     name = known_face_names[first_match_index]

                # Or instead, use the known face with the smallest distance to the new face
                face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)                

                # Add id for new face into database if detected (CHANGE TO ONLY WHEN SAVE FACE BUTTON IS PRESSED)
                if newUser:
                    print("NEW USER")
                    if len(face_recognition.face_encodings(frame)) > 0:
                        newFaceEncoding = face_recognition.face_encodings(frame)[0]
                        if newUser in known_face_names:
                            index = known_face_names.index(newUser)
                            known_face_encodings[index] = newFaceEncoding
                        else:
                            known_face_names.append(newUser)
                            known_face_encodings.append(newFaceEncoding)

                        cv2.imwrite(f'faces/{newUser}.jpg', frame)
                        newUser = None
                        


                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]

                face_names.append(name)

                q.put({'process': 'face', 'args': name})

        process_this_frame += 1
        
        if True:
            # Display the results
            for (top, right, bottom, left), name in zip(face_locations, face_names):
                # Scale back up face locations since the frame we detected in was scaled to 1/4 size
                top *= 4
                right *= 4
                bottom *= 4
                left *= 4

                # Draw a box around the face
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

                # Draw a label with a name below the face
                cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

            # Display the resulting image
            cv2.imshow('Video', frame)

        # Hit 'q' on the keyboard to quit!
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release handle to the webcam
    #video_capture.release()
    vs.stop()
    cv2.destroyAllWindows()
    