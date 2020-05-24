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
const gameRoom = "room" + roomVal;

//On connection to the socket, the server terminal logs a message 'a user connected. [gameRoom] initiated for all clients'
io.on('connection', function (socket) {


    console.log('a user connected. ' + gameRoom + " initiated for all clients");

    //if the clients room is the same as the servers then client can join else error message is sent
    socket.on("joinRoom", function (clientRoom) {
        console.log("Client is on"+clientRoom);
        if (clientRoom == gameRoom) {
            socket.join(gameRoom);
            return socket.emit("Success", "Player has successfully joined " + gameRoom);
        } else {
            return socket.emit("err", "ERROR, No Room Named" + gameRoom);
        }
    });


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

});


setInterval(function () {
    io.sockets.emit('message', 'hi!');
}, 1000);
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