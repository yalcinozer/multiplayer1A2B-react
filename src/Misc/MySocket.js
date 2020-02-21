import SocketIOClient from 'socket.io-client';

const localURL = "http://192.168.1.41:8080",
      remoteURL = null;
const urlWillBeUsed = localURL || remoteURL;
// //Socket.io connection
const socket = SocketIOClient(urlWillBeUsed, {autoConnect: false, reconnection: false});

socket.on("disconnect", function () {
    window.alert("We have taken some precautions to prevent competitors from waiting.\nPlease come back to the game before the connection timeout limit reached (1 minute)\nPlease refresh page to reconnect");
})
export default socket;
