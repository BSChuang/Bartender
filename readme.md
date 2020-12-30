# QRtender

Facial Recognition
Speech Recognition
Multiprocessing for parallel face and speech recognition
    Facial recognition in main program

GUI for drink selection (in case speech recognition unavailable (too loud))
    Button to save face and name
Scrap GUI, will be hands-free


Originally saved face when uniqueness was over a threshold, but too many false positives (i.e. saving faces when they had already been saved)
Previously used GUI, but wanted hands-free (didn't want to invest in monitor)

NOW:
Uses speech OR QR Codes to configure and decide drinks
Facial recognition to save and load favorite drinks and get previous drink

QR Code Rules:
    Get drink: "g[drink name]"
    Favorite drink: "f[drink name]"
    Get favorite drink: "f"
    Get previous drink: "p"

    Set new user: "n[username]"

    Set drink: "s[drink name]:[drink json]"
    Set ingredients: "1:[ingredient1]|2:[ingredient2]|3:[ingredient3]|4:[ingredient4]|5:[ingredient5]|6:[ingredient6]"

1 Green LED:
    Turns on when face is recognized



Main.py runs processes FR, SR, GUI, which all communicate with Main.py
Send messages back and forth with {'process': [process name], 'arg': arguments}


