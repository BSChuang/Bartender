# QRtender
PREVIOUS IDEA:
Facial Recognition
Speech Recognition
Multiprocessing for parallel face and speech recognition
    Facial recognition in main program

GUI for drink selection (in case speech recognition unavailable (too loud))
    Button to save face and name
Scrap GUI, will be hands-free

Originally saved face when uniqueness was over a threshold, but too many false positives (i.e. saving faces when they had already been saved)
Previously used GUI, but wanted hands-free (didn't want to invest in monitor)

CURRENT IDEA:
Uses speech OR QR Codes to configure and decide drinks
Facial recognition to save and load favorite drinks and get previous drink

QR Code Rules:
    Get drink: "g[drink name]"
    Favorite drink: "f[drink name]"
    Get favorite drink: "f"
    Get previous drink: "p"

    Set new user: "n[username]"

    Set drink: "s[drink name]|[ingredient1]:[quantity1]|[ingredient2]:[quantity2]|etc"
    Set ingredients: "i[ingredient1]|[ingredient2]|[ingredient3]|[ingredient4]|[ingredient5]|[ingredient6]"

1 Green LED:
    Turns on when face is recognized
Yellow LED:
    Turns on when drink is dispensing
Red LED:
    Turns on when error
Yellow and red when drink is added or ingredients are configured
All turn on when new user is added

PULL drinks.json/ingredients.json from github (easiest way to keep updated) whenever loads
Make sure to combine with saved drinks.json/ingredients to keep crafted drinks

TODO:
Assign ingredients to each slot
Choose drink by name (error when drink not in system)
Error when drink ingredients do not exist
Build the actual thing 

Main.py runs processes FR, SR, GUI, which all communicate with Main.py
Send messages back and forth with {'process': [process name], 'arg': arguments}


