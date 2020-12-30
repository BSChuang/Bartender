from ParallelSpeech import fParallelSpeech
from ParallelFace import fParallelFace
from multiprocessing import Process,Queue,Pipe

import face_recognition
import cv2
import numpy as np
import uuid
import glob
import json

if __name__ == '__main__':
    q = Queue()

    speechProcess = Process(target=fParallelSpeech, args=(q,))
    faceProcess = Process(target=fParallelFace, args=(q,))

    speechProcess.start()
    faceProcess.start()

    lastPerson = None
    personTimer = 0

    while True:
        personTimer += 1
        if personTimer > 50000:
            lastPerson = None

        if not q.empty():
            res = q.get()

            if res['process'] == 'face':
                lastPerson = res['args']
                personTimer = 0
                print('face:', res['args'])

            elif res['process'] == 'qr':
                print('qr:', res['args'])
                

            elif res['process'] == 'speech':
                res = res['args']
                if res['success']:
                    latestSpeech = res['transcription'].lower()
                    print(f'{latestSpeaker} says: {latestSpeech}')
                    speechParser(latestSpeech, latestSpeaker)
                else:
                    print("Error recognizing speech")