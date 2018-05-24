$(function() {
	// 为tag标签设置随机颜色
	random_color($('.blogs_header_aside_li_a')); 

	//当导航bar出来后的点击事件
	$("#blogs_bars").click(function(event) { 
		$("#blogs_header_for_min_width").slideToggle("slow");
		return false;
	});
})
$(window).resize(function(){
	bar_toggle($("#blogs_header_for_min_width"));
}); 