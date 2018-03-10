// Величина скорости скролла

var checkScrollSpeed = (function (settings) {
	settings = settings || {};

	var lastPos, newPos, timer, delta,
		delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

	function clear() {
		lastPos = null;
		delta = 0;
	}

	clear();

	return function () {
		newPos = window.scrollY;
		if (lastPos != null) { // && newPos < maxScroll 
			delta = newPos - lastPos;
		}
		lastPos = newPos;
		clearTimeout(timer);
		timer = setTimeout(clear, delay);
		return delta;
	};
})();

// Проверка высоты страницы

var scrollHeight = Math.max(
	document.body.scrollHeight,
	document.documentElement.scrollHeight,
	document.body.offsetHeight,
	document.documentElement.offsetHeight,
	document.body.clientHeight,
	document.documentElement.clientHeight
);

// Мой код


const MAX_SKEW = 20;

window.onscroll = function () {
	let scrollSpeed = checkScrollSpeed()
	if (scrollSpeed > MAX_SKEW) {
		scrollSpeed = MAX_SKEW
	} else if (scrollSpeed < -MAX_SKEW) {
		scrollSpeed = -MAX_SKEW
	}
	_s.setSkew(scrollSpeed / 5)
};

function Skew( selector ) {
	let items = document.querySelectorAll(selector);
	this.setSkew = function ( skew ) {
		if ((window.scrollY == 0) || (window.scrollY >= scrollHeight - 1500)) {
			this.resetSkew()
		} else {
			items.forEach(( item ) => {
				item.style.transform = `skewY(${skew}deg)`;
			});
		}
	};
	this.resetSkew = function () {
		items.forEach(( item ) => {
			item.style.transform = `skewY(0deg)`;
		});
	}
}

let _s = new Skew('p');



