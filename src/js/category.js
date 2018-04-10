$(function() {
	// 为tag标签设置随机颜色
	random_color($('.category_header_aside_li_a')); 

	//当导航bar出来后的点击事件
	$("#category_bars").click(function(event) { 
		$("#category_header_for_min_width").slideToggle("slow");
		return false;
	});
})