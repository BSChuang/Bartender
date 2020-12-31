from ParallelSpeech import fParallelSpeech
from ParallelFace import fParallelFace
from multiprocessing import Process,Queue,Pipe

import face_recognition
import cv2
import numpy as np
import uuid
import glob
import json

favorites = None
with open('../favorites.json') as inFile:
    favorites = json.load(inFile)

previous = None
with open('../previous.json') as inFile:
    previous = json.load(inFile)

lastPerson = None

def dispense(drink):
    print('Dispensing', drink)
    previous[lastPerson] = drink
    with open('../previous.json', 'w') as outFile:
        json.dump(previous, outFile)

def parseQR(qr):
    if qr[0] == 'g':
        dispense(qr[1:])
        
    elif qr[0] == 'f':
        if len(qr) > 1:
            if lastPerson != None:
                print('Favoriting', qr[1:])
                favorites[lastPerson] = qr[1:]
                with open('../favorites.json', 'w') as outFile:
                    json.dump(favorites, outFile)

            dispense(qr[1:])            
        else:
            if lastPerson in favorites:
                dispense(favorites[lastPerson])

    elif qr[0] == 'p':
        if lastPerson != None:
            dispense(previous[lastPerson])


if __name__ == '__main__':
    q = Queue()

    speechProcess = Process(target=fParallelSpeech, args=(q,))
    faceProcess = Process(target=fParallelFace, args=(q,))

    speechProcess.start()
    faceProcess.start()

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
                parseQR(res['args'])
                

            elif res['process'] == 'speech':
                res = res['args']
                if res['success']:
                    latestSpeech = res['transcription'].lower()
                    print(f'{lastPerson} says: {latestSpeech}')
                    #speechParser(latestSpeech, lastPerson)
                else:
                    print("Error recognizing speech")