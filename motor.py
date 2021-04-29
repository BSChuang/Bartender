import RPi.GPIO as GPIO
import time

led=11
GPIO.setmode(GPIO.BOARD)
GPIO.setup(led, GPIO.OUT)

for i in range(5):
    GPIO.output(led, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(led, GPIO.LOW)
    time.sleep(1)
    print("here")
    #print('Switch status = ', GPIO.input(switch))

GPIO.cleanup()