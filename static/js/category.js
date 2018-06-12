$(window).resize(function(){
	bar_toggle($("#blogs_header_for_min_width"),992);
}); 
$(function() {
	random_color($('.blogs_header_aside_li_a'));
	random_color($('.article_tag'));
	paging_init(article_paging);
})
/**
 * 格式化文章
 * @param {Object} data 
 */
function articles_init(data){
	var articles = $(".category_main_section_article_article");
	var titles = $('.article_title');
	var times = $('.article_time_i');
	var tags = $('.category_main_section_article_bottom');
	for(var i = 0; i < articles.length; i++){
		if(data[i] == undefined){
			articles.eq(i).css('display', 'none');
		}
		else{
			titles.eq(i).text(data[i].title);
			titles.eq(i).attr('href','./article?id='+data[i].article_id);
			times.eq(i).text(' '+data[i].upload_time.slice(0,10).replace(/\/|\\/g,'-'));
			var tags = data[i].tags.split(',');
			var as = '';
			for( var j = 0; j < tags.length; j++){
				as += '<a href="./category.html?tag='+tags[j]+'"><i class="fa fa-tag article_tag">'+tags[j]+'</i></a>';
			}
			$('.category_main_section_article_bottom').eq(i).html(as);

			articles.eq(i).css({
				'display': 'block',
			});
		}
	}
	random_color($('.article_tag'));
}
/**
 * 点击翻页
 */
function page_turn(){
	var start = (article_paging.page - 1) * article_paging.lengths;
	var lengths = article_paging.lengths;
	$.ajax({
		url: '/articles?start='+start+'&lengths='+lengths,
		method: 'get',
		success: function(data){
			console.log(data)
			articles_init(data);
		},
		err: function(err){
			console.log(err)
		}
	})
}