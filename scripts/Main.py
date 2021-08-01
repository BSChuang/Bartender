from ParallelSpeech import fParallelSpeech
from ParallelFace import fParallelFace
from ParallelGPIO import fParallelGPIO
from ParallelServer import fParallelServer
from multiprocessing import Process, Queue, Pipe

import face_recognition
import cv2
import numpy as np
import uuid
import glob
import json
import requests
import pyttsx3
import time

import os
from datetime import datetime, timedelta
from flask import Flask, request, abort, jsonify

WEBHOOK_VERIFY_TOKEN = 'baaartender'
CLIENT_AUTH_TIMEOUT = 24 # in Hours

app = Flask(__name__)

authorised_clients = {}

@app.route('/webhook', methods=['POST'])
def webhook():
    verify_token = request.args.get('verify_token')
    print(verify_token)
    if verify_token == WEBHOOK_VERIFY_TOKEN:
        q.put({'process': 'assistant', 'args': request.json['drink']})
        return jsonify({'status':'success'}), 200
    else:
        return jsonify({'status':'not authorised'}), 401



pinList = [11, 13, 16, 15, 18, 29, 31, 37]
engine = pyttsx3.init()
engine.setProperty('rate', 125)
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

    try:
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
    except:
        return
        
def speak(phrase):
    engine.say(phrase)
    engine.runAndWait()

def dispense(drink):
    if drink in drinks:
        hasIngredients = True
        for ingredient in drinks[drink].keys():
            if ingredient not in ingredientPins.keys():
                hasIngredients = False
                break
        if hasIngredients:
            print('pouring')
            speak(f"Pouring {drink}")
            toPour = {ingredientPins[ingredient]:quantity for (ingredient, quantity) in drinks[drink].items()}
            gpioQ.put({'process': 'main', 'args': toPour}) # send pin:quantity (length of pour)

            if lastPerson is not None:
                previous[lastPerson] = drink
                with open('../previous.json', 'w') as outFile:
                    json.dump(previous, outFile)
        else:
            print("Does not have all required ingredients!")
            speak(f"Missing ingredients for {drink}")
    else:
        print("Drink does not exist!")
        speak("Drink does not exist")


def parseQR(qr):
    if qr[0] == 'g': # Dispense drink
        dispense(qr[1:])

    elif qr[0] == 'f': # Favorite
        if len(qr) > 1:
            if lastPerson is not None:
                print('Favoriting', qr[1:])
                favorites[lastPerson] = qr[1:]
                with open('../favorites.json', 'w') as outFile:
                    json.dump(favorites, outFile)

            dispense(qr[1:])
        else:
            if lastPerson in favorites:
                dispense(favorites[lastPerson])

    elif qr[0] == 'p': # Previous
        if lastPerson != None:
            dispense(previous[lastPerson])
    elif qr[0] == 'i': # Set ingredients of machine
        global ingredientPins

        ingredientList = qr[1:].split('|')
        print('set ingredients ', ingredientList)
        speak(f"Set ingredients as {','.join([ing for ing in ingredientList if ing != 'None'])}")
        ingredientPins = {ingredientList[i]: pinList[i] for i in range(len(pinList))}
        del ingredientPins['None']

    elif qr[0] == 's': # Save new crafted drink
        ingredientList = qr[1:].split('|')
        drinkName = ingredientList.pop(0).lower()
        ingredientList = [x.split(':') for x in ingredientList]
        drinkDict = {x[0]: x[1] for x in ingredientList}
        drinks[drinkName] = drinkDict
        speak(f"Saved {drinkName}")

        with open('../drinks.json', 'w') as outFile: # Save to drinks.json
            json.dump(drinks, outFile)


    elif qr[0] == 'c':
        print('cleaning...')
        speak("Cleaning")
        gpioQ.put({'process': 'main', 'args': {pin:10 for pin in pinList}}) # clean each for 1 ounce

def readProcess(q):
    personTimer = 0
    while True:
        if personTimer < 50000:
            personTimer += 1
        if personTimer >= 50000:
            lastPerson = None

        if not q.empty():
            res = q.get()

            if res['process'] == 'face':
                if lastPerson != res['args']:
                    speak(f"Hello {res['args']}")
                    
                lastPerson = res['args']
                personTimer = 0
                print('face:', res['args'])

            elif res['process'] == 'qr':
                print('qr:', res['args'])
                parseQR(res['args'])

            elif res['process'] == 'assistant':
                print(res['args'])

            elif res['process'] == 'speech':
                res = res['args']
                if res['success']:
                    latestSpeech = res['transcription'].lower()
                    print(f'{lastPerson} says: {latestSpeech}')
                    #speechParser(latestSpeech, lastPerson)
                else:
                    print("Error recognizing speech")

q = None
gpioQ = None
if __name__ == '__main__':
    initJSON()
    q = Queue()

    if False:
        speechProcess = Process(target=fParallelSpeech, args=(q,))
        speechProcess.start()

    #assistantProcess = Process(target=fParallelServer, args=(q,))
    #assistantProcess.start()

    faceProcess = Process(target=fParallelFace, args=(q,))
    faceProcess.start()

    gpioQ = Queue()
    gpioProcess = Process(target=fParallelGPIO, args=(gpioQ,))
    gpioProcess.start()
    gpioQ.put({'process': 'main', 'args': 'i'})

    readProcess = Process(target=readProcess, args=(q,))
    readProcess.start()

    speak("Loading")
    time.sleep(30)
    speak("Ready")

    app.run('0.0.0.0')
