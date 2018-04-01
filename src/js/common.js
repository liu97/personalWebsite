function a_location(a) {
	a.click(function(){
	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top+document.body.scrollTop

	    }, 500);
	    return false;
	});
}