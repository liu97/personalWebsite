$(window).resize(function(){
	bar_toggle($("#blogs_header_for_min_width"),992);
}); 
$(function(){
	random_color($('.blogs_header_aside_li_a'));
	paging_init(article_paging);
	console.log(article_paging)
})
/**
 * 格式化文章
 * @param {Object} data 
 */
function articles_init(data){
	var articles = $(".blogs_main_article")
	var h2as = $(".blogs_main_article_article_h2_a");
	var as = $(".blogs_main_article_article_a")
	var imgs = $(".blogs_main_article_article_img");
	var ps = $(".blogs_main_article_article_p");
	var days = $(".blogs_main_article_aside_i");
	var months = $(".blogs_main_article_aside_span1");
	var years = $(".blogs_main_article_aside_span2");
	var likes = $(".blogs_main_article_aside_div_i");
	for(var i = 0; i < articles.length; i++){
		if(data[i] == undefined){
			articles.eq(i).css('display', 'none');
		}
		else{
			h2as.eq(i).text(data[i].title);
			h2as.eq(i).attr('href','./article?id='+data[i].article_id);
			as.eq(i).attr('href','./article?id='+data[i].article_id);
			imgs.eq(i).attr('src',data[i].img_path)
			ps.eq(i).text( filter_markdown(data[i].article_content).slice(0,100)+'...' );
			days.eq(i).text(data[i].upload_time.split(/\/|\\/)[2]);
			months.eq(i).text(data[i].upload_time.split(/\/|\\/)[1]);
			years.eq(i).text(data[i].upload_time.split(/\/|\\/)[0]);
			likes.eq(i).text(data[i].praise);
			likes.eq(i).css('color', '#999');
			likes.eq(i).off('click');
			articles.eq(i).css({
				'display': 'block',
			});
		}
	}
	set_like(data);
}
/**
 * 给文章点赞
 * @param {Object} obj 
 */
function like_article(obj){
	$.ajax({
		url: '/apis/articles/like',
		method: 'post',
		data: {article_id: obj.article_id},
		success: function(data){
			if(data.status = "success"){
				var praise = obj.like.text();
				obj.like.text(++praise);
				obj.like.off(obj.like.$event);
				obj.like.css({
					'color': '#fa5252'
				})
			}
			else{
				console.log("err");
			}
		},
		err: function(err){
			console.log(err);
		}
	})
}

/**
 * 点击翻页
 */
function page_turn(){
	var start = (article_paging.page - 1) * article_paging.pageSize;
	var pageSize = article_paging.pageSize;
	$.ajax({
		url: '/articles?start='+start+'&pageSize='+pageSize,
		method: 'get',
		success: function(data){
			articles_init(data.info.list);
		},
		err: function(err){
			console.log(err)
		}
	})
}