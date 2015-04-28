var 
	delay = {
		flipBack: 2000,
		removeCards: 1000
	},
	numCards,
	cardsEl,
	flippedCards = []
;

init();

function init() {
	numCards = 16;
	
	var cards = generateCards(numCards);
	
	cardsEl = document.querySelector('.cards');
	var cardEl = cardsEl.querySelector('.card');
	cardEl.querySelector('.symbol').innerHTML = cards[0];
	//cardEl.querySelector('.back ').innerHTML = cards[0]; // For debugging
	cards.slice(1).forEach(function(sym) {
		var n = cardEl.cloneNode(true);
		n.querySelector('.symbol').innerHTML = sym;
		//n.querySelector('.back ').innerHTML = sym; // For debugging
		cardsEl.appendChild(n);
	});
	
	cardsEl.addEventListener('click', handleFlipping, false);
}

function generateCards(numCards) {
	var arr = [], i, h = numCards / 2, sym = 0;
	
	for (i = 0; i < h; i++)
		arr.push(sym++);
	sym = 0;
	for (i = 0; i < h; i++)
		arr.push(sym++);
	
	return shuffle(arr);
}
 
function handleFlipping(e) {
	e.stopPropagation();
	
	var target = e.target;
	
	if (target === cardsEl) 
		return true; // It should never gets here because we are using opacity: 0 to hide cards
	
	while (!target.classList.contains('card'))
		target = target.parentNode;
	
	if (target.classList.contains('removed'))
		return true;
	
	if (target.classList.contains('flipped')) // User clicked on the unique flipped card
		return true;
	
	target.classList.add('flipped', rotClass(target, e.clientX, e.clientY));
	flippedCards.push(target);
	
	if (flippedCards.length === 2) {
		cardsEl.removeEventListener('click', handleFlipping, false);
		cardsEl.classList.add('disabled');
		
		if (foundPair())
			setTimeout(removeCards, delay.removeCards);
		else
			setTimeout(flipBack, delay.flipBack);
	}
}

function rotClass(n, x, y) {
	var // card client-space/doc space(no scrolling on page) extent
		xmin = n.offsetLeft,
		xmax = n.offsetLeft + n.offsetWidth
	;
	
	return x - xmin <= xmax - x ? 'rot-y-ccw' : 'rot-y-cw'
}

function foundPair() {
	return flippedCards[0].querySelector('.symbol').innerHTML == flippedCards[1].querySelector('.symbol').innerHTML;
}

function removeCards() {
	flippedCards[0].classList.add('removed');
	flippedCards[1].classList.add('removed');
	
	flippedCards.length = 0;
	
	cardsEl.addEventListener('click', handleFlipping, false);
	cardsEl.classList.remove('disabled');
}

function flipBack() {
	flippedCards[0].className = 'card';
	flippedCards[1].className = 'card';
	
	flippedCards.length = 0;
	
	cardsEl.addEventListener('click', handleFlipping, false);
	cardsEl.classList.remove('disabled');
}

/*
 * Following function are from Underscore.js.
 */
 
// Returns a shuffled copy of <array>.
function shuffle(array) {
	var 
		l = array.length,
		shuffled = new Array(l),
		i,
		rand
	;
	
	for (i = 0; i < l; i++) {
		rand = random(0, i);
		if (rand !== i) 
			shuffled[i] = shuffled[rand];
		shuffled[rand] = array[i];
	}
	
	return shuffled;
}

// Return a random integer between min and max (inclusive).
 function random(min, max) {
	if (max == null) {
	  max = min;
	  min = 0;
	}
	return min + Math.floor(Math.random() * (max - min + 1));
 }
