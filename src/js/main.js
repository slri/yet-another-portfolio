$(document).ready(function() {
	/**************************
	 * Global variables
	 *************************/
	/**
	 * Is there an animation already happening?
	 * @type {Boolean}
	 */
	var scrolling = false;

	var workPages = $(".skew-page");
	var numberOfWorkPages = workPages.length - 1;
	var currentWorkPage = 0;

	/**
	 * Original color that we want to transition from
	 * @type {tinycolor object}
	 */
	var originalColor = tinycolor($("#target").css("color"));
	/**
	 * New color we want to transition into.
	 * @type {HSV object}
	 */
	var transitionColor = tinycolor("#0c1822").toHsv();

	scrollicious({trigger: "#contact", viewport: 90}, function(step, target) {

		var color = originalColor.toHsv();

		color.v += (transitionColor.v - color.v) * (step/100);
		
		target.css("color", tinycolor(color).toHexString());
	});

	// Did we scroll past 30px? Make navigation sticky
	$(window).scroll(function() {
		if ($(document).scrollTop() > 30) {
			$("body").addClass("sticky");
		} else {
			$("body").removeClass("sticky");
		}
	});

  
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

	$("#work").on("mousewheel DOMMouseScroll", function(event) {
		if(scrolling) {
			event.preventDefault();
			return;
		}
		
		if(event.originalEvent.wheelDelta < 0 || event.originalEvent.detail < 0) {
			navigateDown();
		}
		else if(event.originalEvent.wheelDelta > 0 || event.originalEvent.detail > 0) {
			navigateUp();
		}
	});

	function navigateUp() {
		if(currentWorkPage - 1 >= 0) {
			scrolling = true;
			
			event.preventDefault();
			$(workPages[currentWorkPage--]).removeClass("active");
			$(workPages[currentWorkPage]).addClass("active");

			setTimeout(function() {
				scrolling = false;
			}, 500);
		}
	}

	function navigateDown() {
		if(currentWorkPage + 1 <= numberOfWorkPages) {
			scrolling = true;
			
			event.preventDefault();
			$(workPages[currentWorkPage++]).removeClass("active");
			$(workPages[currentWorkPage]).addClass("active");

			setTimeout(function() {
				scrolling = false;
			}, 500);
		}
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