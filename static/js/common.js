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

$(function(){ 
	//为回到顶部的标签添加滑动效果
	a_location($(".up_to"));
	// 为tag标签设置随机颜色
	random_color($('.blogs_header_aside_li_a')); 

	//当导航bar出来后的点击事件
	$("#blogs_bars").click(function(event) { 
		$("#blogs_header_for_min_width").slideToggle("slow");
		return false;
	});
})
$(window).scroll(function(event) {
	if($(document).scrollTop()>=$(window).height()){
		$(".fix_up").css('display', 'block');
	}
	else{
		$(".fix_up").css('display', 'none');
	}
})
//获取路径询问键值对
function get_request() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
// 过滤markdown标识符
function filter_markdown(content){ 
	var reg = /[\\\`\*\_\[\]\#\+\-\!\>]|\([^\(\)]*\)/g;
	content = content.replace(reg,'');
	return content;
}

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