from multiprocessing import Process,Pipe
import speech_recognition as sr
import time

def g(q):
    msg = "Hello"
    while True:
        time.sleep(1.5)
        q.put({'function': 'C', 'arg': 'goodbye'})
    #child_conn.close()