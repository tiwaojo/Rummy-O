//'Emit' to send data, 'on' to receive data

//Client side connection to tell Socket.IO client to connect to namespace room
var socket = io();
socket.on('message', function (data) {
    console.log(data);
});

// Copied and pasted same random num generator. Couldn't figure out how to create global variables
var roomVal=Math.floor(Math.random()*103);

//emits room message to the server indicating the player intends to join the room specified
socket.emit("joinRoom","room"+roomVal);
// game.emit("name",playerName);

// Logs a message if the player fails to enter the room
socket.on("err",function(err){
console.log(err);
});
// Logs a success message if the player connects to the right room
socket.on("Success",function(res){
console.log(res);
});
console.log("This player is on room"+roomVal);
//This code is intended to send clients name to server
socket.on("playerNames",function(res){
console.log(res);
});


var playerName;
function name() {
    playerName = prompt("Please Insert a name: ");
    if (playerName == null || playerName=="" || playerName.startsWith(" ") || playerName.endsWith(" ") || playerName=="null") {
        name();       
    }
     console.log(playerName);
    //  return playerName;
}
alert("Welcome: " + playerName);

function displayName(){
    // playerName;
    document.write("<th>"+playerName+"</th>")
}

// game.emit("player",playerName);
// sending to all clients in 'game1' and/or in 'game2' room, except sender
game.on('room').emit('name', playerName);


function exitGame() {
    alert("Exit: Exiting the game will close the game and give the other player the glory");
}



// function on() {
//     document.getElementById("nameOverlay").style.display = "none";
// }

// function off() {
//     document.getElementById("nameOverlay").style.display = "block";
// }