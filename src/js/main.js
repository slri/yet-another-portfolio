

$(document).ready(function() {
  var scrolling = false;
  
  function determineScroll(event, hash) {
    event.preventDefault();
    
    if(scrolling) {
      return;
    } else {
      moveMe(hash);
    }
  }
  
  function moveMe(hash) {
    scrolling = true;
    
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1500, $.bez([0.25,-0.20,0.25,1.20]), function() {
     
      window.location.hash = hash;
      scrolling = false;
    });
  }
  
  $(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
      $("body").addClass("sticky");
    } else {
      $("body").removeClass("sticky");
    }
  });
  
  $(".navbar-nav a").click(function(event) {
    determineScroll(event, this.hash);
  });
  
  $("#intro button").click(function(event) {
    determineScroll(event, "#about");
  });
  
  setTimeout(function() {
    $(".background").css("opacity", "1");
  }, 200);
});