from multiprocessing import Process,Queue,Pipe
import speech_recognition as sr
import B, C
import time

""" if __name__ == '__main__':
    #parent_conn,child_conn = Pipe()
    q = Queue()
    p = Process(target=g, args=(q,))
    p.start()
    while True:
        print('.')
        time.sleep(1)
        if not q.empty():
            print(q.get()) """

if __name__ == '__main__':
    #parent_conn,child_conn = Pipe()
    

    q = Queue()
    p1 = Process(target=B.g, args=(q,))
    p2 = Process(target=C.g, args=(q,))
    p1.start()
    p2.start()
    while True:
        print('.')
        time.sleep(1)
        if not q.empty():
            print(q.get())