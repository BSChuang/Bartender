# import the necessary packages
from threading import Thread
import cv2

from picamera.array import PiRGBArray
from picamera import PiCamera
import time
# initialize the camera and grab a reference to the raw camera capture

class WebcamVideoStream:
    def __init__(self, src=0):
        self.stream = cv2.VideoCapture(src)
        self.stream.set(3, 480)
        self.stream.set(4, 270)
        (self.grabbed, self.frame) = self.stream.read()
        
        time.sleep(1)

        self.stopped = False
    def start(self):
        # start the thread to read frames from the video stream
        Thread(target=self.update, args=()).start()
        return self
    def update(self):
        while True:
            if self.stopped:
                return
            (self.grabbed, self.frame) = self.stream.read()
    def read(self):
        return self.frame
    def stop(self):
    # indicate that the thread should be stopped
        self.stopped = True