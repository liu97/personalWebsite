function a_location(a, target, father) { //滑动锚点
	if(a == undefined){ //一定要输入锚点a
		new Error("必须传入a");
	}
	else if(target != undefined){ //如果被点击目标不为空
		if(father != undefined){  //如果要绑定多个元素，且该元素都在同一个father内
			father.on('click', target, function(event) {
				var clickTarget = $(event.target).attr('href') ? $(event.target) : $(event.target).find(a).eq(0);
				$('html, body').animate({
				    scrollTop: $(clickTarget.attr('href') ).offset().top

				}, 500);
				return false;
				/* Act on the event */
			});
		}
		else{ //只传入单个点击目标和锚点a
			target.click(function(event) { 
				$('html, body').animate({
				    scrollTop: $( a.attr('href') ).offset().top

				}, 500);
				return false;
				/* Act on the event */
			});
		}
	}
	else if(father == undefined){ //只传入单个锚点
		a.click(function(){
		    $('html, body').animate({
		        scrollTop: $( a.attr('href') ).offset().top

		    }, 500);
		    return false;
		});
	}
	
}
function random_color(list){  //为集合元素添加随机颜色
	list.each(function(index, el) {
		var R = Math.floor(Math.random() * 155);
        var G = Math.floor(Math.random() * 155);
        var B = Math.floor(Math.random() * 155);
        $(el).css({
        		'background-color': 'white',
        		'color': 'rgb(' + R + ',' + G + ',' + B + ')',
        		'border':'1px solid rgb(' + R + ',' + G + ',' + B + ')'
        	});
        $(el).hover(function() {
        	$(el).css({
        		'background-color': 'rgb(' + R + ',' + G + ',' + B + ')',
        		'color': 'white',
        		'border':'1px solid #ccc'
        	});
        }, function() {
        	$(el).css({
        		'background-color': 'white',
        		'color': 'rgb(' + R + ',' + G + ',' + B + ')',
        		'border':'1px solid rgb(' + R + ',' + G + ',' + B + ')'
        	});
        });
	});
}
function bar_toggle(item,size) {  //显示隐藏导航栏
	var width = $(this).width();        
  	if(width>size){
  		item.css({
  			display: 'flex'
   		});
  	}
  	else{
  		item.css({
  			display: 'none'
   		});
  	}
}
//获取路径询问键值对
function get_request() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//去除文章的markdown语法
function filter_markdown(content){ 
	var reg = /[\\\`\*\_\[\]\#\+\-\!\>]|\([^\(\)]*\)/g;
	content = content.replace(reg,'');
	return content;
}

$(function(){ 
	//为回到顶部的标签添加滑动效果
	a_location($(".up_to"));

	//当导航bar出来后的点击事件
	$("#blogs_bars").click(function(event) { 
		$("#blogs_header_for_min_width").slideToggle("slow");
		return false;
	});
	//提示框动画结束监听
	$(".prompt_box").eq(0).on('animationend webkitAnimationEnd oAnimationEnd', function () {
		$(this).removeClass('action_prompt');
	});
	//头部导航如果点击本页，不刷新
	$("#blogs_header").on('click', '.header_nav', function(){
		if($(this).attr('href') == location.pathname && location.search == ''){
			return false;
		}
	})
})
$(window).scroll(function(event) {
	if($(document).scrollTop()>=$(window).height()){
		$(".fix_up").css('display', 'block');
	}
	else{
		$(".fix_up").css('display', 'none');
	}
})

/**
 * 
 * @param {Object} $form
 * @param {function} success 
 * @param {Function} fail 
 */
function ajax_form($form,success,fail){
	$form.submit(function (event) {
		event.preventDefault();
		var form = $(this);
		if (!form.hasClass('fupload')) {
		  //普通表单
		  $.ajax({
				type: form.attr('method'),
				url: form.attr('action'),
				data: form.serialize(),
				success: success,
				err: fail
		  });
		}
		else {
		  // mulitipart form,如文件上传类
		  var formData = new FormData(this);
		  $.ajax({
				type: form.attr('method'),
				url: form.attr('action'),
				data: formData,
				mimeType: "multipart/form-data",
				contentType: false,
				cache: false,
				processData: false,
				success: success,
				err: fail
		  });
		};
	  });
}
/**
 * 翻页函数
 * @param {Object} page_obj 分页信息对象 
 * @param {String} page 不翻页的判断页数
 * @param {String} add 翻到add页
 * @param {Function} callback 回调函数
 */
function judge(page_obj, page, add, callback){
	if(page_obj.page == page){
		return;
	}
	else{
		page_obj.page = parseInt(add);
		//改变页数按钮
		$('.turn_a').removeClass('paging_a_active');
		if(page_obj.page > page_obj.number/2 && page_obj.page < Math.ceil(page_obj.count/page_obj.pageSize)-page_obj.number/2){
			for(var i = 1; i <= page_obj.number; i++){
				var n = Math.floor(page_obj.number/2 - page_obj.number + i) + page_obj.page;
				$('.turn_a').eq(i-1).text(n);
				if(n == add){
					$('.turn_a').eq(i-1).addClass('paging_a_active');
				}
			}
		}
		else{
			for(var i = 0; i < page_obj.number; i++){
				if($('.turn_a').eq(i).text() == add){
					$('.turn_a').eq(i).addClass('paging_a_active');
				}
			}
		}
		//调用回调函数
		callback();
	}
}
/**
 * 分页初始化
 */
function paging_init(page_obj){
	$('.turn_a').eq(0).addClass('paging_a_active');

	$("#first").click(function(){
		judge(page_obj, 1, 1, page_turn);
		return false;
	});
	$("#previous").click(function(){
		judge(page_obj, 1, page_obj.page-1, page_turn);
		return false;
	});
	$("#next").click(function(){
		judge(page_obj, Math.ceil(page_obj.count/page_obj.pageSize), page_obj.page+1, page_turn);
		return false;
	});
	$("#last").click(function(){
		judge(page_obj, Math.ceil(page_obj.count/page_obj.pageSize), Math.ceil(page_obj.count/page_obj.pageSize), page_turn);
		return false;
	});
	$('.paging_main').on('click', '.turn_a' ,function(){
		judge(page_obj, $(this).text(), $(this).text(), page_turn);
		return false;
	})
	
}