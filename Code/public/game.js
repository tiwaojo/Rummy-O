//'Emit' to send data, 'on' to receive data
// (function () {
// just drag your whole code from your script.js and drop it here

// var playerName;
class Player {

    constructor(name, handCards) {
        // var playerName;
        this.playerName = name;
        this.playerCards = handCards;
    }

    // get playerName() {
    //     return this.playerName;
    // }
    // set playerName(x) {
    //     this.playerName = x;
    // }

}
newPlayer = new Player();

function name() {
    var x;
    newPlayer.playerName = x;
    x = prompt("Please Insert a name: ");
    if (x == null || x == "" || x.startsWith(" ") || x.endsWith(" ") || x == "null") {
        name();
    }

    //Logs the players name and creates an object with for the player
    console.log(newPlayer);


    alert("Welcome: " + x);
    //  return playerName;
}
function displayName() {
    // newPlayer.playerName=playerName;
    document.write("<th>" + playerName + "</th>")
}

//This code is intended to send clients name to server
socket.on("playerNames", function (res) {
    console.log(res);
});


//Client side connection to tell Socket.IO client to connect to namespace room
var socket = io.connect();
socket.on('message', function (data) {
    console.log(data);
});


var randRoom = Math.floor(Math.random() * 103);


// game.emit("name",playerName);

// Logs a message if the player fails to enter the room
socket.on("err", function (err) {
    console.log(err);
});
// Logs a success message if the player connects to the right room
socket.on("Success", function (res) {
    console.log(res);
    window.location.href = "../HTML/game.html";
    newPlayer.card
});





// game.emit("player",playerName);
// sending to all clients in 'game1' and/or in 'game2' room, except sender
game.on('room').emit('name', newPlayer.playerName);


function exitGame() {
    alert("Exit: Exiting the game will close the game and give the other player the glory");
}

// // if the player clicks the button "Join a Game" a random room is created and the player joins that room

// var enterRoom =0; 
//     // socket.emit("confirmRoom",enterRoom);

socket.on("roomVal", function (roomVal) {
    //  enterRoom=roomVal;
    //    randRoom(enterRoom);
    joinGame(roomVal);

});

//     function randRoom(roomVal) {
//         joinGame("room"+roomVal);
//         console.log("This player is on room" + roomVal); 
// }

function joinGame(roomVal) {
    //emits room message to the server indicating the player intends to join the room specified
    socket.emit("joinRoom", "room" + roomVal);
}


// The player can create a unique room and join that room 
var uniqueRoom;
function createRoom() {
    alert("Enter this num '" + randRoom + "' below");
    //Replaces the create room button with a form.
    //Upon the forms submittion, the roomChoice() function will determine the
    document.getElementById("createRoom").innerHTML = "<form onSubmit='roomChoice()' > <input type='number' name='clientRoom' id='clientRoom' placeholder='Input room number' max='1000000' min='1' onSubmit='roomChoice()'> <input type='submit' value='submit' onClick='roomChoice()'> </form>";

    //Checks if the room number inputed is within acceptable range
    if (uniqueRoom.validity.rangeOverflow) {
        alert("Invalid. Room number should not exceed " + uniqueRoom);
    }
    else if (uniqueRoom.validity.rangeUnderflow) {
        alert("Invalid. Room number should not exceed " + uniqueRoom);
    }
}

//Replaces the quick game button with a 2 or 4 player option. 
//The player can select their choice and will be directed to a room with that # of players
function quickGame() {
    document.getElementById("quickGame").innerHTML = "<button id='joinGame2'  type='button' class='btn btn-lg btn-outline-warning waves-effect' value='2' onclick='twoPlayers()' >2 Players</button>  <button id='joinGame4' type='button' class='btn btn-lg btn-outline-warning waves-effect' value='4' onclick='fourPlayers()'>4 Players</button>     ";
}

//If 2 players is selected
function twoPlayers() {
    if (document.getElementById("joinGame2").value = 2) {
        alert("2");
        return window.location.href = "../HTML/chat.html";
    }
}

//If 4 players are selected
function fourPlayers() {
    if (document.getElementById("joinGame4").value = 4) {
        alert("4"); return window.location.href = "../HTML/game.html";
    }
}

// //takes the value inputed by the user in the number form and determines whether the room is taken or not.
// function roomChoice() {
//     uniqueRoom = document.getElementById("clientRoom").value;

//     if (uniqueRoom == randRoom) {
//         socket.emit("uniqueRoom", uniqueRoom);

//         console.log("Player successfully joined " + uniqueRoom);
//     }


// }
// function why(){$('form').submit(function(e){
//     e.preventDefault(); // prevents page reloading
//     socket.emit('chat message', $('#m').val());
//     $('#m').val('');
//     return false;
//   });
//   socket.on('chat message', function(msg){
//     $('#messages').append($('<li>').text(msg));
//   });}
// TODO Attempting to establish a syncronous connection among the players. This is example code from socket.io website


// })();
