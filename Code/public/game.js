var socket = io();
socket.on('message', function(data) {
    console.log(data);
});

var playerName = prompt("Please Insert a name: ");
alert("Welcome: " + playerName);

function exitGame() {
    alert("Exit: Exiting the game will close the game and give the other player the glory");
}
// function on() {
//     document.getElementById("nameOverlay").style.display = "none";
// }

// function off() {
//     document.getElementById("nameOverlay").style.display = "block";
// }