var 
	cards,
	size,
	flippedCards = [],
	delay = 2000
;

init();

function init() {
	size = 16;
	
	cards = document.querySelector('.cards');
	var card = cards.querySelector('.card');
	
	var arr = fill(size);
	card.querySelector('.symbol').innerHTML = arr[0];
	card.querySelector('.back ').innerHTML = arr[0];
	arr.slice(1).forEach(function(sym) {
		var n = card.cloneNode(true);
		
		n.querySelector('.symbol').innerHTML = sym;
		n.querySelector('.back ').innerHTML = sym;
		cards.appendChild(n);
	});
	
	cards.addEventListener('click', handleFlipping, false);
}

function fill(size) {
	var 
		arr = [],
		i,
		sym = 0
	;
	
	for (i = 0; i < size / 2; i++)
		arr.push(sym++);
	sym = 0;
	for (i = 0; i < size / 2; i++)
		arr.push(sym++);
	
	return shuffle(arr);
}
 
function handleFlipping(e) {
	e.stopPropagation();
	
	var target = e.target;
	
	if (target === cards)
		return true;
	
	while (!target.classList.contains('card'))
		target = target.parentNode;
	
	if (target.classList.contains('removed'))
		return true;
	
	if (target.classList.contains('flipped')) // User clicked on the unique flipped card
		return true;
	
	target.classList.add('flipped', rotClass(target, e.clientX, e.clientY));
	flippedCards.push(target);
	
	if (flippedCards.length === 2) {
		cards.removeEventListener('click', handleFlipping, false);
		cards.classList.add('disabled');
		setTimeout(foundPair() ? removeCards : flipBack, delay);
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
	
	cards.addEventListener('click', handleFlipping, false);
	cards.classList.remove('disabled');
}

function flipBack() {
	flippedCards[0].className = 'card';
	flippedCards[1].className = 'card';
	
	flippedCards.length = 0;
	
	cards.addEventListener('click', handleFlipping, false);
	cards.classList.remove('disabled');
}


/*
From Underscore.js.
Returns a shuffled copy of <array>.
*/
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
