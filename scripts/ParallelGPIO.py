import time
from multiprocessing import Process,Queue,Pipe
from threading import Thread

import RPi.GPIO as GPIO

pinList = [11, 13, 15, 16, 18]
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
                    for pin in command.keys():
                        processThread = Thread(target=timer, args=(pin, command[pin]))
                        processThread.start()
                else:
                    print("already dispensing!")

def initBoard():
    GPIO.setmode(GPIO.BOARD)
    for i in pinList:
        GPIO.setup(i, GPIO.OUT)

def stop():
    global isDone
    print('stopping all')
    isDone = {pin:True for pin in pinList}
    # set all pins low

def timer(pin, quantity):
    isDone[pin] = False
    print('pouring from', pin, 'for', quantity, 'seconds')
    time.sleep(quantity)

    if not isDone[pin]:
        print('done pouring', pin)
        isDone[pin] = True
        # set pin low
    else:
        print('already done', pin)