import SocketIOClient from 'socket.io-client';

const localURL      = "http://192.168.1.44:8080",
      remoteURL     = "https://numbergame1a2b.herokuapp.com",
      urlWillBeUsed = /*localURL ||*/ remoteURL;


//Socket.io connection
const MySocket = SocketIOClient(urlWillBeUsed, {autoConnect: false, reconnection: false});


MySocket.on("disconnect", function () {
    window.alert("We have taken some precautions to prevent competitors from waiting." +
        "\nPlease come back to the game before the connection timeout limit reached (1 minute)" +
        "\nPlease refresh page to reconnect");
});

export {
    MySocket
};
