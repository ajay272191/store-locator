const Portfolio = function() {

	function typeAnimation() {
		Typed.new("#writing-text", {
			strings: [
				"I'm a Tezpur University student","love everything about coding.","passionate about coding", "solve problems.                  "
			],
			// Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
			stringsElement: null,
			// typing speed
			typeSpeed: 1,
			contentType: 'text',
			callback: function() {
				typeAnimation();
			},
		});
	}
	return {
		typeAnimation: typeAnimation
	}
}();
Portfolio.typeAnimation();
