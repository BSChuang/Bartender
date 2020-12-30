from ParallelSpeech import ParallelRecognizer
from multiprocessing import Process,Queue,Pipe

import face_recognition
import cv2
import numpy as np
import uuid
import glob
import json

def requestParser(request, speaker):
    with open('drinks.json') as drinksFile:
        drinks = json.load(drinksFile)

        if 'the usual' in request:
            with open('usuals.json') as usualsFile:
                usuals = json.load(usualsFile)
                print(drinks[usuals[speaker]])
        
        for drink in drinks.keys():
            if drink in request:
                print(drinks[drink])

if __name__ == '__main__':
    # Get a reference to webcam #0 (the default one)
    video_capture = cv2.VideoCapture(0)

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
    process_this_frame = True

    latestSpeaker = ''
    latestSpeech = ''

    # Initialize speech multiprocessing
    q = Queue()
    p = Process(target=ParallelRecognizer, args=(q,))
    p.start()

    faceTimer = 0
    while True:
        ret, frame = video_capture.read()
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Only process every other frame of video to save time
        if process_this_frame:

            # Face timer releases latest speaker after not being seen for a bit 
            faceTimer += 1
            if faceTimer > 60:
                latestSpeaker = ''

            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            face_names = []
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = ""

                # # If a match was found in known_face_encodings, just use the first one.
                # if True in matches:
                #     first_match_index = matches.index(True)
                #     name = known_face_names[first_match_index]

                # Or instead, use the known face with the smallest distance to the new face
                face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)                

                # Add id for new face into database if detected (CHANGE TO ONLY WHEN SAVE FACE BUTTON IS PRESSED)
                if min(face_distances) > 0.5:
                    print("NEW FACE DETECTED")
                    id = str(uuid.uuid4())[:8]
                    cv2.imwrite(f'faces/{id}.jpg', frame)

                    newFace = face_recognition.load_image_file(f'faces/{id}.jpg')
                    if len(face_recognition.face_encodings(newFace)) > 0:
                        newFaceEncoding = face_recognition.face_encodings(newFace)[0]
                        known_face_encodings.append(newFaceEncoding)
                        known_face_names.append(id)

                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]

                face_names.append(name)

                latestSpeaker = name

                if name != '':
                    faceTimer = 0
        
            if not q.empty():
                res = q.get()
                if isinstance(res, str):
                    print(res)
                else:
                    if res['success']:
                        latestSpeech = res['transcription'].lower()
                        print(f'{latestSpeaker} says: {latestSpeech}')
                        requestParser(latestSpeech, latestSpeaker)
                    else:
                        print("Error recognizing speech")

        process_this_frame = not process_this_frame

        
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
    video_capture.release()
    cv2.destroyAllWindows()
    p.terminate()