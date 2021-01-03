from ParallelSpeech import fParallelSpeech
from ParallelFace import fParallelFace
from ParallelGPIO import fParallelGPIO
from multiprocessing import Process, Queue, Pipe

import face_recognition
import cv2
import numpy as np
import uuid
import glob
import json
import requests

pinList = [11, 13, 15, 16, 18]
ingredientPins = {}

drinks = None
favorites = None
previous = None

lastPerson = None

def initJSON():
    global drinks
    global favorites
    global previous

    with open('../drinks.json') as inFile:
        drinks = json.load(inFile)
    with open('../favorites.json') as inFile:
        favorites = json.load(inFile)
    with open('../previous.json') as inFile:
        previous = json.load(inFile)

    drinksURL = 'https://raw.githubusercontent.com/BSChuang/Bartender/main/react-app/src/drinks.json'
    resp = requests.get(drinksURL)
    newDrinks = json.loads(resp.text)

    # Only add drinks that are not in machine drink list (don't replace machine drink list)
    for drink in newDrinks.keys():
        if drink not in drinks:
            drinks[drink] = newDrinks[drink]

    # Save drinks
    with open('../drinks.json', 'w') as outFile:
        json.dump(drinks, outFile)

def dispense(drink):
    if drink in drinks:
        hasIngredients = True
        for ingredient in drinks[drink].keys():
            if ingredient not in ingredientPins.keys():
                hasIngredients = False
                break
        if hasIngredients:
            print('pouring')
            toPour = {ingredientPins[ingredient]:quantity for (ingredient, quantity) in drinks[drink].items()}
            gpioQ.put({'process': 'main', 'args': toPour}) # send pin:quantity (length of pour)
            previous[lastPerson] = drink
            with open('../previous.json', 'w') as outFile:
                json.dump(previous, outFile)
        else:
            print("Does not have all required ingredients!")
    else:
        print("Drink does not exist!")


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
    elif qr[0] == 'i':
        global ingredientPins

        ingredientList = qr[1:].split('|')
        ingredientPins = {ingredientList[i]: pinList[i] for i in range(len(pinList))}

    elif qr[0] == 'c':
        print('cleaning...')
        gpioQ.put({'process': 'main', 'args': {pin:10 for pin in pinList}}) # clean each for 10 seconds

q = None
gpioQ = None
if __name__ == '__main__':
    initJSON()
    q = Queue()

    if True:
        speechProcess = Process(target=fParallelSpeech, args=(q,))
        speechProcess.start()

    faceProcess = Process(target=fParallelFace, args=(q,))
    faceProcess.start()

    gpioQ = Queue()
    gpioProcess = Process(target=fParallelGPIO, args=(gpioQ,))
    gpioProcess.start()

    gpioQ.put({'process': 'main', 'args': 'init'})

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
