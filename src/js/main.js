$(document).ready(function() {
	// Can't help it functionality
	var original = tinycolor($("#target").css("color"));
	var transition = tinycolor("#333").toHsv();

	scrollicious({trigger: "#contact", viewport: 100}, function(step, target) {

		var color = original.toHsv();

		color.v += (transition.v - color.v) * (step/100);


		target.css("color", tinycolor(color).toHexString());
	});

	// Did we scroll past 50px? Make navigation sticky
	$(window).scroll(function() {
		if ($(document).scrollTop() > 50) {
			$("body").addClass("sticky");
		} else {
			$("body").removeClass("sticky");
		}
	});

	/**
	 * Is there an animation already happening?
	 * @type {Boolean}
	 */
	var scrolling = false;
  
	/**
	 * Checks if there's another animation that's
	 * happening. If so it'll return undefined.
	 * If not, it'll trigger the move function.
	 * @param  {Object} event Generic event object
	 * @param  {String} hash  ID we're pointing to
	 * @return void
	 */
	function determine(event, hash) {
		event.preventDefault();

		if(scrolling) {
			return;
		}
		
		move(hash);
	}
  
	/**
	 * Scroll the page to the point the navigation
	 * link points to and append the ID to the link.
	 * @param  {String} hash ID we're pointing to
	 * @return void
	 */
	function move(hash) {
		scrolling = true;

		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 1500, $.bez([0.25,-0.20,0.25,1.20]), function() {

			window.location.hash = hash;
			scrolling = false;
		});
	}
  
	// Gets triggered on navbar links
	$(".navbar-nav a").click(function(event) {
		determine(event, this.hash);
	});
	// And the fancy intro button
	$("#intro button").click(function(event) {
		determine(event, "#about");
	});

	// Attempt to make one of those fancy fade-ins
	setTimeout(function() {
		$(".background").css("opacity", "1");
	}, 200);
});