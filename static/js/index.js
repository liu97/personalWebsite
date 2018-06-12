// function message_init(){ //从后台获取初始信息
// 	$.ajax({
// 		url: '/home',
// 		type: 'get',
// 		success: function(data){
// 			if(data.status == "success"){
// 				init_about_me( (data.about_me)[0] );
// 				init_new_blog( data.new_article )
// 			}
// 			else{
// 				console.log("get /home 404");
// 			}
// 		},
// 		err: function(err){
// 			console.log(err)
// 		}
// 	});
	
// }
// function init_about_me(data){  // 初始化关于我板块
// 	var img = $("#page_main_about_me_img");
// 	var h1 = $("#page_main_about_me_h1");
// 	var p = $("#page_main_about_me_article_p");
// 	var a = $("#page_main_about_me_article .a_more");
// 	img.attr('src', data.img_path);
// 	h1.text(data.title);
// 	p.text( filter_markdown(data.article_content).slice(0,100) +'...' );
// 	a.attr('href', "article.html?id="+data.article_id);
// }
// function init_new_blog(data){  //初始化最新博客板块
// 	console.log(data);
// 	var li = $(".page_main_blogs_article_li");
// 	li.each(function(index,item){
// 		$(item).find('.page_main_blogs_img').attr('src',data[index].img_path);
// 		$(item).find(".page_main_blogs_h2").text(data[index].title);
// 		$(item).find(".page_main_blogs_p").text( filter_markdown(data[index].article_content).slice(0,100) +'...' );
// 		$(item).find(".a_more").attr('href', "article.html?id="+data[index].article_id);
// 	})
// }
$(function () {
	a_location($("#page_header_icon")); //锚点定位
	a_location($(".page_nav_a"), $(".page_nav_li"), $("#page_nav_ul")); //锚点定位

	$("#page_nav_bars").click(function(event) { //当导航bar出来后的点击事件
		$("#page_nav_ul").slideToggle("slow");
		return false;
	});
	

	ajax_form($("#page_main_contact_form"),
		function(data){
			$("#page_main_contact_form")[0].reset();
			$(".prompt_main").eq(0).text("发送成功")
			$(".prompt_box").eq(0).addClass('action_prompt');
		},
		function(err){
			$(".prompt_main").eq(0).text("发送失败")
			$(".prompt_box").eq(0).addClass('action_prompt');
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