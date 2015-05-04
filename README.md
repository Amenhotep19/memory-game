# About

After viewing the [Memory Game](http://callmenick.com/post/memory-game) by [Nick Salloum](http://callmenick.com/) I wanted to make something similar, mainly to play with and put together some front end development techniques. So it is not a complete game but only a quick hack. And it was made to run on modern browsers, at the moment only a reduced polyfill is employed.

The game rules are simple: found matching card pairs by flipping them to reveal the underlying background image.

Some jotted down notes on the implementation:

# CSS

The 4x4 cards grid is always stretched to cover all the user agent viewport, giving each card instance a width and height of `25vw` and `25vh` respectively, and using the inline-block formatting mode.

The cards are flipped back and forth using [CSS 3D Transforms](http://www.w3.org/TR/css3-transforms/) and [CSS Transitions](http://www.w3.org/TR/css3-transitions/). The sign of their Y-axis rotation angle depends on where the user clicks to 'push' the card.
	
The full viewport background images are displayed with the `background-size: cover` property and are provided by the [Marvel Ipsum Image](http://www.marvelipsum.com/image) service.

CSS source is written in Sass and the processed code is feed to [Autoprefixer](https://www.npmjs.com/package/grunt-autoprefixer) to add vendor prefixes.
[Normalize.css](http://necolas.github.io/normalize.css/) is used to normalize default styles across browsers.

# JavaScript

The code is 100% [VanillaJS](http://vanilla-js.com/).

The distribution of the card symbols on the grid is done with the [shuffle()](http://underscorejs.org/#shuffle) [Underscore.js](http://underscorejs.org) routine based on the [Fisher-Yates algorithm](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).

To allow invocations with multiple arguments of the [Element.classList.add()](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) method also on browsers like IE 10, I extracted and adapted the relevant code fragment from the [classList.js](https://github.com/eligrey/classList.js/) polyfill.
