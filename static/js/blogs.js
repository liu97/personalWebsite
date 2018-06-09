var article_paging = {
	page: 1,
	lengths: 5,
	count: 0
}
$(window).resize(function(){
	bar_toggle($("#blogs_header_for_min_width"),992);
}); 
$(function(){
	//blogs页信息初始化
	blogs_init();  
})
/**
 * 初始化blogs页面
 */
function blogs_init(){
	start = (article_paging.page - 1) * article_paging.lengths;
	$.ajax({
		url: '/blogs?start='+start+'&lengths='+article_paging.lengths,
		method: 'get',
		success: function(data){
			if(data.status == "success"){
				tags_init(data.tags);
				articles_init(data.articles);
				article_paging.count = data.article_count;
				paging_init();
			}
			else{
				console.log("error");
			}
		},
		error: function(err){
			console.log(err);
		}
	})
}
/**
 * 初始化标签
 * @param {Object} data 
 */
function tags_init(data){
	var lis = '';
	for(var i = 0; i < data.length; i++){
		lis += '<li class="blogs_header_aside_li"><a href="./category.html?id='+data[i].tag_id+'" class="blogs_header_aside_li_a"><i class="fa fa-tag"></i> '+data[i].tag_name+'</a></li>'
	}
	$("#blogs_header_aside_ul").html(lis);
	// 为tag标签设置随机颜色
	random_color($('.blogs_header_aside_li_a'));
}
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
	var likes = $(".blogs_main_article_aside_div_i")
	for(var i = 0; i < articles.length; i++){
		if(data[i] == undefined){
			articles.eq(i).css('display', 'none');
		}
		else{
			h2as.eq(i).text(data[i].title);
			h2as.eq(i).attr('href','./article.html?id='+data[i].article_id);
			as.eq(i).attr('href','./article.html?id='+data[i].article_id);
			imgs.eq(i).attr('src',data[i].img_path)
			ps.eq(i).text(filter_markdown(data[i].article_content).slice(0,200) +'...');
			days.eq(i).text(data[i].upload_time.split('/')[2]);
			months.eq(i).text(data[i].upload_time.split('/')[1]);
			years.eq(i).text(data[i].upload_time.split('/')[0]);
			likes.eq(i).text(data[i].praise);
			likes.eq(i).css('color', '#999');
			likes.eq(i).off('click');
			(function(index){
				likes.eq(index).click(function(e){
					like_article({
						article_id:data[index].article_id,
						like: $(this),
						$event: e
					});
				})
			})(i);
			articles.eq(i).css({
				'display': 'block',
				'visibility': 'visible' 
			});
		}
	}
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
 * 分页初始化
 */
function paging_init(){
	//添加页数按钮
	var number = article_paging.count >= 3 ? 3 : article_paging.count;
	var as = '';
	for(var i = 1; i <= number; i++){
		as += '<a href="#" class="paging_a turn_a">'+i+'</a>';
	}
	$('.paging_main').eq(0).html(as);
	$('.turn_a').eq(0).addClass('paging_a_active');

	$("#first").click(function(){
		judge(article_paging, 1, 1, number, page_turn)
		return false;
	});
	$("#previous").click(function(){
		judge(article_paging, 1, article_paging.page-1, number, page_turn);
		return false;
	});
	$("#next").click(function(){
		judge(article_paging, Math.ceil(article_paging.count/article_paging.lengths), article_paging.page+1, number, page_turn);
		return false;
	});
	$("#last").click(function(){
		judge(article_paging, Math.ceil(article_paging.count/article_paging.lengths), Math.ceil(article_paging.count/article_paging.lengths), number, page_turn);
		return false;
	});
	$('.paging_main').on('click', '.turn_a' ,function(){
		judge(article_paging, $(this).text(), $(this).text(), number, page_turn);
		return false;
	})
	
}
/**
 * 点击翻页
 */
function page_turn(start, lengths){
	var start = (article_paging.page - 1) * article_paging.lengths;
	var lengths = article_paging.lengths;
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