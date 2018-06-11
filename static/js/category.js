var category_paging = {
	page: 1,
	lengths: 10,
	count: 0
}
$(window).resize(function(){
	bar_toggle($("#blogs_header_for_min_width"),992);
}); 
$(function() {
	//category页初始化
	category_init();
})
/**
 * category页初始化
 */
function category_init(){
	var requests = get_request();
	var url = '';
	var start = (category_paging.page - 1) * category_paging.lengths;
	if(requests['tag']){
		url = '/blogs?tag='+requests['tag']+'&start='+start+'&lengths='+category_paging.lengths
	}
	else{
		url = '/blogs?start='+start+'&lengths='+category_paging.lengths
	}
	$.ajax({
		url: url,
		method: 'get',
		success: function(data){
			if(data.status == "success"){
				tags_init(data.tags);
				articles_init(data.articles);
				category_paging.count = data.article_count;
				paging_init(category_paging);
				console.log(data);
			}
			else{
				console.log("error");
				location.href = './category.html';
			}
		},
		error: function(err){
			console.log(err);
		}
	})
}
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
			titles.eq(i).attr('href','./article.html?id='+data[i].article_id);
			times.eq(i).text(data[i].upload_time.slice(0,10).replace(/\/|\\/g,'-'));
			var tags = data[i].tags.split(',');
			var as = '';
			for( var j = 0; j < tags.length; j++){
				as += '<a href="./category.html?tag='+tags[j]+'"><i class="fa fa-tag article_tag">'+tags[j]+'</i></a>';
			}
			$('.category_main_section_article_bottom').eq(i).html(as);

			articles.eq(i).css({
				'display': 'block',
				'visibility': 'visible' 
			});
		}
	}
	random_color($(".article_tag"));
}
/**
 * 点击翻页
 */
function page_turn(start, lengths){
	var start = (category_paging.page - 1) * category_paging.lengths;
	var lengths = category_paging.lengths;
	$.ajax({
		url: '/articles?start='+start+'&lengths='+lengths,
		method: 'get',
		success: function(data){
			articles_init(data);
		},
		err: function(err){
			console.log(err)
		}
	})
}