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
	if($(document).scrollTop() >= $(".over_mask").eq(0).height()){
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
	
	for (var i = 0; i < $(".page_nav_li").length-1; i++) {
		if($(document).scrollTop() >= $(".over_mask").eq(0).height() * i -80){
			//导航条活动页面的选定
			$(".page_nav_li").each(function(index, el) {
				$(el).removeClass('page_nav_li_active');
			});
			$(".page_nav_li").eq(i).addClass('page_nav_li_active');
			//页面翻转
			if(i>0){ 
				$(".page_turn_mask").eq(i-1).addClass('page_turn');
			}
		}
	}
	
	/* Act on the event */
});
//判断桌面宽度大小是否大于768px
$(window).resize(function(){
	bar_toggle($("#page_nav_ul"),768)
}); 