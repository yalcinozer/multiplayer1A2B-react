# 1A2B Multiplayer-React Web App

This app is ported from the original "1A2B Multiplayer" game, taht its target platform is Android.

"1A2B Multiplayer" is a simple number guessing game known and played in many different countries.

### Rules Of the game
It can be seen in "How To Play" screen of the app.



# Setup
(in respective root paths)

#### Server:
- run "npm install"
- run "npm start"

#### Web Application:
- Get Wifi IPv4 address of development device. (run ipconfig for Windows)
- Assign that address to variable "localURL", which is in /src/Assets/MySocket.js
- Run npm install
- Run npm start

#### If the configuration is correct:

When you click on "Done" button in the App, server should print a "xxxxxxxxx connected" and Web App should navigate to Players Screen.


Warning:
You can test the application by opening two browsers. When you invite other browser to game, passive browser will not be able to display Alert(). This means game invitations will not be displayed.

To get over this issue, you shoud keep Developer Tools open.

Dipnot:

React Native kodlarımı doğrudan kopyala yapıştır yapıp taşıyabilmek için, RN benzeri componentler oluşturup onları kullanmayı düşünmüştüm ama sonradan tam olarak hatırlamıyorum bu fikrimden vazgeçtim. RN'yi hatırlatan komponentler onun izi.