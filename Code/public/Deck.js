const suits = ['red', 'blue', 'black', 'yellow'];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,];


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
console.log(deck1);
shuffle(deck1);
// console.log(deck1);
console.log(getCard('red', '2', deck1))
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
var faceVal = 0;
var faceValIndex = "";
function cardValue(faceVal, faceValIndex) {
	document.write("<div class='card'><h2 id='" + faceVal + "'> <h2 style=color:" + newdeck[faceValIndex].Suit + ">" + newdeck[faceValIndex].Value + "</h2> </h2> <h6 id=numCard" + faceValIndex + ">2</h6><a href='#' type='button'>MELD</a> <a href='#' type='button'>SET</a> </div>");
	// "<div class='card'>";
	//        " <h2 id='"+faceVal+"'>";
	//         '<h2 style="color:' + newdeck[faceValIndex].Suit + ';" >' + newdeck[faceValIndex].Value + "</h2>";
	//         "</h2>";
	//         "<h6 id='numCard"+faceValIndex+"'>2</h6>";"<a href='#' type='button'>MELD</a>";
	//         "<a href='#' type='button'>SET</a>";
	//     "</div>";

	console.log(faceVal);
	//  document.getElementById(faceVal).innerHTML +=	 
	//    '<h2 style="color:' + newdeck[faceValIndex].Suit + ';" >' + newdeck[faceValIndex].Value + "</h2>";

}