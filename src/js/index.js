$(function () {
	a_location($("#page_header_icon")); //锚点定位
	a_location($(".page_nav_a"), $(".page_nav_li"), $("#page_nav_ul")); //锚点定位
	$("#page_nav_bars").click(function(event) {
		$("#page_nav_ul").slideToggle("slow");
		$("#page_nav_bars i:only-child").toggleClass("fa-close fa-bars");
		return false;
	});
})
$(window).resize(function() {  
	var width = $(this).width();    
  	if(width>768){
  		$("#page_nav_ul").css({
  			display: 'flex'
   		});
  	}
}); 