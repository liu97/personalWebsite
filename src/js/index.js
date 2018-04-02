$(function () {
	a_location($("#page_header_icon")); //锚点定位
	a_location($(".page_nav_a"), $(".page_nav_li"), $("#page_nav_ul")); //锚点定位
	$("#page_nav_bars").click(function(event) { //当导航bar出来后的点击事件
		$("#page_nav_ul").slideToggle("slow");
		return false;
	});
})
$(window).scroll(function(event) {
	//导航条定位的改变
	if($(document).scrollTop() >= $(window).height()){
		$("#page_nav").css({
			position: 'fixed',
			top: "0"
		});
	}
	else{
		$("#page_nav").css({
			position: 'absolute',
			top:"100%"
		});
	}
	//导航条活动页面的选定
	for (let i = 0; i < $(".page_nav_li").length; i++) {
		if($(document).scrollTop() >= $(window).height() *i){
			$(".page_nav_li").each(function(index, el) {
				$(el).removeClass('page_nav_li_active');
			});
			$(".page_nav_li").eq(i).addClass('page_nav_li_active');

		}
	}
	
	/* Act on the event */
});
$(window).resize(function() {  
	var width = $(this).width();        
  	if(width>768){
  		$("#page_nav_ul").css({
  			display: 'flex'
   		});
  	}
  	else{
  		$("#page_nav_ul").css({
  			display: 'none'
   		});
  	}
}); 