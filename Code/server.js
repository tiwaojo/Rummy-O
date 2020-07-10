// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 5000);
app.use('/static', express.static(__dirname + 'public'));
app.use(express.static('public')); // Routing
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, "../HTML/index.html"));
});
// app.use(express.static("images"));
// Add the WebSocket handlers 

//Random number is generated for the unique room. Game room is generated
var roomVal = Math.floor(Math.random() * 103);

var gameRoom = "room" + roomVal;
// io.in("roomVal"+roomVal).emit("roomVal",roomVal);

//On connection to the socket, the server terminal logs a message 'a user connected. [gameRoom] initiated for all clients'
io.on('connection', function (socket) {

    //a message is logged on the server console with the game room for the client
    console.log('a user connected. ' + gameRoom + " initiated for all clients");
    
    //sends roomVal to player to connect to room
socket.emit("roomVal",roomVal);
    
    //if the clients room is the same as the servers then the client can join, else an error message is sent
    socket.on("joinRoom", function (clientRoom) {
        console.log("Client is on" + clientRoom);
        //if the clients room is the same as the servers then client can join else error message is sent
        if (clientRoom == gameRoom) {
            socket.join(gameRoom);
console.log("Player has successfully joined " + gameRoom);
            return socket.emit("Success", "Player has successfully joined " + gameRoom);
        } else {
            return socket.emit("err", "ERROR, No Room Named " + gameRoom);
        }
    });

    //if uniqueRoom (the clients intended room) != the auto generated room, the gameRoom is refactored to clients uniqueRoom.
    //the server reconnects to the clients intended room else return error
    socket.on("uniqueRoom", function (uniqueRoom) {
        if (uniqueRoom != roomVal) {

            gameRoom = "room" + uniqueRoom;
            socket.join(gameRoom);
            return socket.emit("Success", "Player has successfully joined " + gameRoom);
        }
        else {
            return socket.emit("err", "ERROR, No Room Named " + gameRoom);
        }

    });

    //Notifies if the client has disconnected from the socket. i.e. closed the tab
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });

    // io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

});


// setInterval(function () {
//     io.sockets.emit('message', 'hi!');
// }, 1000);
// Starts the server.
server.listen(5000, function () {
    console.log('Starting server on port 5000');
});











/////////////////////////////////////////////////////////////////////////////////////////////////////





//Initializing game room and namespace. 
// const gameNamespace = io.of("/rummyNamespace");




//generating game room namespace. 
// gameNamespace.on('connection', function (socket) {


//     //Logs on the terminal that the clients have joined both the namespace and the room
//     console.log("Someone has joined Namespace");

//     gameNamespace.emit("message", "hi everyone");

//     //checks if the room exists join the room. Else return an error message the room doesn't exist
//     if (gameRoom.includes(gameRoom)) {
//         socket.join(gameRoom);
//         return socket.emit("Success", "Player should be in this room" + gameRoom);
//     } else {
//         return socket.emit("err", "ERROR, No Room Named" + gameRoom);
//     }



//     // game.disconnect();
// });
// socket.disconnect();

io.of("/room").in("name", function (socket) {
    socket.on("new player", function (name) {
        console.log(name);
    })
})

io.of('/room').on('name', function (res) {
    io.in('game').emit('playerNames', res);
    // console.log(res);
});

// io.sockets.on('connection', function (client)
// socket.on("player",function(playerName){
//     console.log(playerName);
// });


//io.on('connection', function(socket) {
// socket.on('new player', function() {
//  player[socket.id] = {

//  }
// };