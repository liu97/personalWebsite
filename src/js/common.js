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

$(function(){ //为回到顶部的标签添加滑动效果
	a_location($(".up_to"))
})
$(window).scroll(function(event) {
	if($(document).scrollTop()>=$(window).height()){
		$(".fix_up").css('display', 'block');
	}
	else{
		$(".fix_up").css('display', 'none');
	}
})