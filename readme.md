# QRtender
## What is QRtender?
QRtender is a smart bartending machine which dispenses beautifully crafted cocktails using just a QR code. The QR codes are built on https://bschuang.github.io/Bartender/. (The website is built for the landscape view of a phone, so the sizes of certain objects when visited on the computer may be too large or too small)

## Features
* Preset drinks with search by ingredient or drink name
* Craftable drinks 
    * Drinks are orderable by using the custom drink's name
* New user creation 
    * Hold QR code and user's face in camera's view to save new face
* Favorite order
    * Favorite a drink by pressing the heart in the bottom corner and showing QRtender face and QR code
* Get favorite/previous
    * If QRtender sees face, favorite or previous drink can be dispensed
* Configure
    * Assign drink ingredients to specific pumps
* Clean
    * Activates pumps for 3 seconds to clean out tubes

## How does it work?
The machine itself is powered by a Raspberry Pi with a camera attachment. It reads QR codes and uses facial recognition developed by the OpenCV Python package. It is controlled and configured by scanning QR codes which are served over a React.JS web-application hosted on Github pages. Once given a drink order, the raspi uses multiprocessing to activate certain peristalic pumps for certain lengths of time, depending on the volume of liquid.

## What did I learn?
* Raspberry Pi's are NOT very powerful. Heavy optimizations were required to run QR and facial recognition at an acceptable frame rate.
* Multi-processing is useful. I used the Python multiprocessing queue package to activate the pumps individually. Yes, I could have had a timer variable running and de-activated the pumps when it exceeded the pump's quantity, but I thought this would be good practice and a more elegant solution.
* Wood is expensive. I couldn't have done this without my friend Mark. He helped me through the process of designing the chassis of the machine, buying the wood, cutting it, and glueing it together. I learned just like programming, there is a whole process that must be completed before doing anything physical. 
