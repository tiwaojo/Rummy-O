// Dependencies
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

//Serve public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, "../HTML/index.html"));
});
// app.use(express.static("images"));
// Add the WebSocket handlers 


const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,];
const suits = ['red', 'blue', 'black', 'yellow'];

function getDeck() {
    var deck = new Array();

    for (var i = 0; i < suits.length; i++) {
        for (var x = 0; x < values.length; x++) {
            var card = { Value: values[x], Suit: suits[i] };
            deck.push(card);
        }
    }

    var joker = { Value: 'joker' };
    deck.push(joker);
    deck.push(joker);
    return deck;

}
function shuffle(deck) {
    // for 1000 turns
    // switch the values of two random cards
    for (var i = 0; i < 1000; i++) {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}
var deck1 = getDeck();
// console.log(deck1);
shuffle(deck1);
// console.log(deck1);
console.log(getCard('red', '2', deck1));
function getCard(suit, value, deck) {


    var Card = { Value: value, Suit: suit }

    for (i = 0; i < deck.length; i++) {
        if (Card == deck[i]) {
            return deck[i];
            deck.splice(i, 1);
        }
    }
}
var newdeck = getDeck();
shuffle(newdeck);

//On connection to the socket, the server terminal logs a message 'a user connected. [gameRoom] initiated for all clients'
io.on('connection', function (socket) {
    console.log("Connection Established " + socket.id);

    socket.on("new Player", function (data) {
        console.log('player: ' + data);
        io.emit("new player", data);
    });

    //Creates an empty array that will house the sockets cards before transmiting to the player
    //For every card pushed into tempHand the same element is poped from the newdeck array simultaneously
    var tempHand = [];
    for (let i = 13; i > 0; i--) {
        // console.log(i);
        tempHand.push(newdeck[newdeck.length - 1]);
        newdeck.pop();
    }

    //Transmits players cards to 
    socket.emit('hand', { temp: tempHand });


    
    //Notifies if the client has disconnected from the socket. i.e. closed the tab
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });

});

//Use this to syncronize the changes for thecards in hand
// setInterval(function () {
//     io.sockets.emit('message', 'hi!');
// }, 1000);
// Starts the server.
http.listen(5000, function () {
    console.log('Starting server on port 5000');
});


// var faceVal = 0;
// var faceValIndex = "";







//////////////////////////////////////////////////////////////////////////////////////////////////

// //a message is logged on the server console with the game room for the client
// console.log('a user connected. ' + gameRoom + " initiated for all clients");

// //sends roomVal to player to connect to room
// socket.emit("roomVal", roomVal);

// //if the clients room is the same as the servers then the client can join, else an error message is sent
// socket.on("joinRoom", function (clientRoom) {
//     console.log("Client is on" + clientRoom);
//     //if the clients room is the same as the servers then client can join else error message is sent
//     if (clientRoom == gameRoom) {
//         socket.join(gameRoom);
//         console.log("Player has successfully joined " + gameRoom);
//         return socket.emit("Success", "Player has successfully joined " + gameRoom);
//     } else {
//         return socket.emit("err", "ERROR, No Room Named " + gameRoom);
//     }
// });

// //if uniqueRoom (the clients intended room) != the auto generated room, the gameRoom is refactored to clients uniqueRoom.
// //the server reconnects to the clients intended room else return error
// socket.on("uniqueRoom", function (uniqueRoom) {
//     if (uniqueRoom != roomVal) {

//         gameRoom = "room" + uniqueRoom;
//         socket.join(gameRoom);
//         return socket.emit("Success", "Player has successfully joined " + gameRoom);
//     }
//     else {
//         return socket.emit("err", "ERROR, No Room Named " + gameRoom);
//     }

// });



// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

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

// io.of("/room").in("name", function (socket) {
//     socket.on("new player", function (name) {
//         console.log(name);
//     })
// });

// io.of('/room').on('name', function (res) {
//     io.in('game').emit('playerNames', res);
//     // console.log(res);
// });

// io.sockets.on('connection', function (client)
// socket.on("player",function(playerName){
//     console.log(playerName);
// });


//io.on('connection', function(socket) {
// socket.on('new player', function() {
//  player[socket.id] = {

//  }
// };