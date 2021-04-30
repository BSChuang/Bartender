import time
import RPi.GPIO as GPIO
from multiprocessing import Process,Queue,Pipe
from threading import Thread

pinList = [11, 13, 16, 15, 18, 29, 31, 37]
ounceTime = {11: 7.5, 13: 10, 16: 10, 15: 9, 18: 7.5, 29: 11, 31: 10.5, 37: 8}

isDone = {pin:True for pin in pinList}

def fParallelGPIO(q):
    while True:
        if not q.empty():
            res = q.get()
            print(res)
            command = res['args']
            if command == 'i': # i for init
                initBoard()
            elif command == 's':
                stop()
            elif isinstance(command, dict): # if command is a dictionary, we know it's a drink
                if sum(isDone.values()) == len(isDone): # if no drinks are currently pouring
                    for pin in command.keys(): # command = dict with pins as keys and length of pour (ounces * seconds/ounce) as values
                        processThread = Thread(target=timer, args=(pin, command[pin] * ounceTime[pin]))
                        processThread.start()
                else:
                    print("already dispensing!")

def initBoard():
    GPIO.setmode(GPIO.BOARD)
    for i in pinList:
        GPIO.setup(i, GPIO.OUT)
        GPIO.output(i, GPIO.HIGH)

def stop():
    global isDone
    print('stopping all')
    for pin in pinList:
        isDone[pin] = True
        GPIO.output(pin, GPIO.HIGH)
    # set all pins high (off)

def timer(pin, quantity):
    GPIO.output(pin, GPIO.LOW) # Activate GPIO pin
    isDone[pin] = False
    print('pouring from', pin, 'for', quantity, 'seconds')
    time.sleep(quantity)

    if not isDone[pin]: # If not already set to done, turn pin off
        print('done pouring', pin)
        isDone[pin] = True
        GPIO.output(pin, GPIO.HIGH)
    else:
        print('already done', pin)