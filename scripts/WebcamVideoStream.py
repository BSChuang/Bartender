# import the necessary packages
from threading import Thread
import cv2
from picamera.array import PiRGBArray
from picamera import PiCamera

class WebcamVideoStream:
    def __init__(self, src=0):
        self.camera = PiCamera()
        self.camera.resolution = (640, 480)
        self.camera.framerate = 32
        self.rawCapture = PiRGBArray(camera, size=(640, 480))

		#self.stream = cv2.VideoCapture(src)
		#(self.grabbed, self.frame) = self.stream.read()
		# initialize the variable used to indicate if the thread should
		# be stopped
        self.stopped = False
    def start(self):
        # start the thread to read frames from the video stream
        Thread(target=self.update, args=()).start()
        return self
    def update(self):
        for frame in self.camera.capture_continuous(self.rawCapture, format="bgr", use_video_port=True):
            self.frame = frame.array
		# keep looping infinitely until the thread is stopped
        """ while True:
        # if the thread indicator variable is set, stop the thread
        # if self.stopped:
        # return
        # # otherwise, read the next frame from the stream
        # (self.grabbed, self.frame) = self.stream.read() """
    def read(self):
        return self.frame
    def stop(self):
    # indicate that the thread should be stopped
        self.stopped = True