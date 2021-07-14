import pyttsx3
engine = pyttsx3.init()
engine.setProperty('rate', 125)
for voice in engine.getProperty('voices'):
    print(voice.id)
engine.setProperty('voice', 'english-rp')
engine.say("I am a robot beep boop")
engine.runAndWait()