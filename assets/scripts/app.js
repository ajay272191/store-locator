const Portfolio = function() {

	function typeAnimation() {
		Typed.new("#writing-text", {
			strings: [
				"I'm a Tezpur University student","love everything about coding.","passionate about coding", "solve problems.                  "
			],
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
