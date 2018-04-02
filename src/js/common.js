function a_location(a, target, father) { //滑动锚点
	if(a == undefined){ //一定要输入锚点a
		new Error("必须传入a");
	}
	else if(target != undefined){ //如果被点击目标不为空
		if(father != undefined){  //如果要绑定多个元素，且该元素都在同一个father内
			father.on('click', target, function(event) {
				let clickTarget = $(event.target).attr('href') ? $(event.target) : $(event.target).find(a).eq(0);
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