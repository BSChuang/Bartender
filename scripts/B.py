from multiprocessing import Process,Pipe
from threading import Thread
import speech_recognition as sr
import time

done = [True] * 6

def g(q):
    while True:
        if not q.empty():
            msg = q.get()
            print(msg)

            if msg == 'another' and sum(done) < len(done):
                print('current pouring')
            elif msg == 'stop':
                stop()
            else:
                for i in range(0, 5):
                    thr = Thread(target=timer, args=(i, i + 5))
                    thr.start()

def stop():
    global done
    print('stopping all')
    done = [True] * 6
    # set all pins low

def timer(pin, quantity):
    done[pin] = False
    # set pin high
    print('pouring from', pin, 'for', quantity, 'seconds')
    time.sleep(quantity)
    print(done)
    if not done[pin]:
        print('done pouring', pin)
        done[pin] = True
        # set pin low
    else:
        print('already done', pin)


def recognize_speech_from_mic(recognizer, microphone):
    """Transcribe speech from recorded from `microphone`.

    Returns a dictionary with three keys:
    "success": a boolean indicating whether or not the API request was
               successful
    "error":   `None` if no error occured, otherwise a string containing
               an error message if the API could not be reached or
               speech was unrecognizable
    "transcription": `None` if speech could not be transcribed,
               otherwise a string containing the transcribed text
    """
    # check that recognizer and microphone arguments are appropriate type
    if not isinstance(recognizer, sr.Recognizer):
        raise TypeError("`recognizer` must be `Recognizer` instance")

    if not isinstance(microphone, sr.Microphone):
        raise TypeError("`microphone` must be `Microphone` instance")

    # adjust the recognizer sensitivity to ambient noise and record audio
    # from the microphone
    with microphone as source:
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

    # set up the response object
    response = {
        "success": True,
        "error": None,
        "transcription": None
    }

    # try recognizing the speech in the recording
    # if a RequestError or UnknownValueError exception is caught,
    #     update the response object accordingly
    try:
        response["transcription"] = recognizer.recognize_google(audio)
    except sr.RequestError:
        # API was unreachable or unresponsive
        response["success"] = False
        response["error"] = "API unavailable"
    except sr.UnknownValueError:
        # speech was unintelligible
        response["error"] = "Unable to recognize speech"

    return response

def ParallelRecognizer(q):
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()

    while True:
        q.put(recognize_speech_from_mic(recognizer, microphone))

