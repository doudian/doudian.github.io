/*------------------------------------------------------
				首页轮播图的特效
---------------------------------------------------*/
$(function(){
	var $imgWidth = $(".main-container .banner-imgs > li").width();
	//console.log($imgWidth);
	$(".main-container .banner-imgs > li:eq(0)").clone(true).appendTo('.main-container .banner-imgs');
	$(".main-container .banner-imgs").width($imgWidth * $(".main-container .banner-imgs > li").size()).css({
		position:"absolute"
	});
	//console.log($(".main-container .banner-imgs").width());
	/*---------------左右按钮的出现与消失-----------------*/
	$(".main-container > .banner").mouseover(function(){
		//console.log("ok");
		$(".main-container > .banner > a").stop().animate({
			opacity:1,
		}, 600);
	});
	$(".main-container > .banner").mouseout(function(){
		//console.log("ok");
		$(".main-container > .banner > a").stop().animate({
			opacity:0,
		}, 600);
	});//左右按钮的出现与消失endding
	
	$(".main-container .banner-imgs > li").css({float:"left"});
	var currIndex = 0;
	var timer = null;
	
	/*-----------autoPlay start-------------*/
	var autoPlay = function(){
		clearInterval(timer);
		timer = setInterval(function(){
			$(".nextBtn").trigger("click");
		}, 3000);
	}
	autoPlay();//autoPlay endding	
	
	/*----nextBtn----*/
	$(".nextBtn").click(function(){
		clearInterval(timer);
		//console.log(currIndex + "currIndex1");
		currIndex++;
		//console.log(currIndex + "currIndex2");
		if(currIndex == 6){
			currIndex = 1;
			$(".main-container .banner-imgs").css({left:0});
		};	
		$(".main-container .banner-imgs").animate({
			left:($imgWidth * currIndex)* -1	
		}, 400);
		$(".main-container .pageing > span").removeClass('on');
		$(".main-container .pageing > span:eq("+ (currIndex > 4 ? 0 : currIndex) +")").addClass("on");
		autoPlay();
	});//nextBtn endding
	
	//prevBtn start
	$(".prevBtn").click(function(){
		clearInterval(timer);
		currIndex--;
		if(currIndex == -1){
			currIndex = 4;
			$(".main-container .banner-imgs").css({
				left: $imgWidth * (currIndex + 1) * -1
			});
		}
		$(".main-container .banner-imgs").stop().animate({
			left: $imgWidth * currIndex * -1
		}, 400);
		$(".main-container .pageing > span").removeClass('on');
		$(".main-container .pageing > span:eq("+ currIndex +")").addClass("on");
		autoPlay();
	});//prevBtn endding
	
	/*点击span对应图片的显示*/
	var clickSpan = function(){
		$(".main-container .pageing > span").click(function(){
			//console.log($(this).text());
			currIndex = $(this).text();
			$(".main-container .banner-imgs").stop().animate({
				left: $imgWidth * currIndex * -1
			}, 400);
			$(".main-container .pageing > span").removeClass('on');
		$(".main-container .pageing > span:eq("+ currIndex +")").addClass("on");
			autoPlay();
		});
	}
	clickSpan();
	//点击span的结束
});//首页自动轮播特效 endding/
/*--------------------------------------------------
			鼠标移动图片上的效果
-----------------------------------------------------*/
$(function(){
	//console.log($(".main-container .new-xp .xp"));
	$(".xp").mouseover(function(){
		//console.log("ok");
		//console.log($(this).find(".coverBg"));
		$(this).find(".coverBg").stop().animate({
			opacity:0.4,
			display: "block"
		}, 400);
	}).mouseout(function(){
		$(this).find(".coverBg").stop().animate({
			opacity:0,
			display:"none"
		}, 400);
	});
});//鼠标移动图片上的效果 endding
/*=--------------------------------------------------------
		tab鼠标移上去的显示效果
----------------------------------------------------------*/  
$(function(){
	var tabCurrIndex = 0;
	var timerTab = null; 
	var tabAutoPlay = function(){
		clearInterval(timerTab);
		timerTab = setInterval(function(){
			tabCurrIndex++;
			if(tabCurrIndex == 4){
				tabCurrIndex = 0;
			}
			$(".main-container .category > li").removeClass("on");
			$(".main-container .category > li:eq("+ (tabCurrIndex) +")").addClass("on");
			$(".main-container .detail > li").css({display: "none"});
			$(".main-container .detail > li:eq("+ (tabCurrIndex) +")").css({display: "block"});
			
		}, 2000);
	};
	tabAutoPlay();

	var tabMouseover = function(){
		$(".main-container .category > li").mouseover(function(){
			clearInterval(timerTab);
			//console.log($(this).index());
			var tabCurrIndex = $(this).index();
			$(".main-container .category > li").removeClass("on");
			$(this).addClass("on"); 
			$(".main-container .detail > li").css({display: "none"});
			$(".main-container .detail > li:eq("+ (tabCurrIndex) +")").css({display: "block"});
		}).mouseout(function(){
			tabAutoPlay();	
		});
	};
	tabMouseover();
});//tab 自动轮播 endding 

/*--------------------------------------
			回到顶部
--------------------------------------*/ 
$(function(){
	$(window).scroll(function(){
	   if($(window).scrollTop() > $(window).height()){
	    	$(".backTo-top").css("display","block");
	   }else{
	   		$(".backTo-top").css("display","none");
	   }
	 });
	 $(".backTo-top").click(function(){
	    $('html,body').animate({
			'scrollTop': 0
		}, 600);
	 });
});
/*--------------------------------
		导航菜单置顶 start
-------------------------------------*/ 
$(function(){
	$(window).scroll(function(){
		//console.log($(".nav-container").offset().top);
		//console.log($(window).scrollTop());
	   if($(window).scrollTop() >= 115){
	   		$("#roseonly-logo").prependTo($(".nav-bar")).addClass("roseonlyLogo-on");
	    	$(".loginBox").appendTo($(".nav-bar")).addClass("loginBox");
	    	$(".nav-container").css({
	    		"position":"fixed",
	    		top:0,
	    		left:0,
	    		// zIndex:999,
	    	});
	    	$("#nav > li").css({
	    		margin: "0 6px"
	    	});
	    	$(".loginBox").css({
	    		lineHeight: "35px",
	    	});
	    	$(".loginBox  span").css({
	    		color:"#fff"
	    	});
	    	$(".head .loginBox .iconfont").css({
	    		color:"#fff"
	    	});
	    	// $("#nav .sub-nav").css({zIndex:-1000});  
	   }else{
	   		$("#roseonly-logo").prependTo($(".nav-bar")).removeClass("roseonlyLogo-on");
	   		$(".nav-container").css({
	   			"position":"relative"
	   		});
	   		$("#roseonly-logo").prependTo($(".header > .head"));
	    	$(".loginBox").appendTo($(".header > .head"));
	    	$("#nav > li").css({
	    		margin: "0 32px"
	    	});
	    	$("#nav > li:eq(0)").css({
	    		margin: "0"
	    	});
	    	$(".loginBox").css({
	    		lineHeight: "35px",
	    	});
	    	$(".loginBox  span").css({
	    		color:"#000"
	    	});
	    	$(".head .loginBox .iconfont").css({
	    		color:"#000"
	    	});
	   }
	 });

});// 导航条置顶 endding

/*-------------------------------------------
		登陆 界面 start
---------------------------------------------*/ 
$(function(){
	$user2 = $.cookie("user2");
	if($user2){
		var arr2 = $user2.split("#");
		//console.log(arr2);
		 $(".head .change1").replaceWith("<a class = 'change1' href= '#'><span id='ischan' class = 'span1'>"+
			 arr2[0] +"</span><span>|</span></a>");
		$(".head .change2").replaceWith("<a class = 'change2' id = 'tuichu' href='index.html'><span class = 'span1'>退出</span><span>|</span></a>");
		$("#tuichu").on("click",function(){
			$.cookie("user2","",{expires:-1});
			$(".head .change1").replaceWith("<a class = 'change1' href= 'login.html'><span id='ischan' class = 'span1'>登录</span><span>|</span></a>");
			$(".head .change2").replaceWith("<a class = 'change2' href='signup.html'><span class = 'span1'>注册</span><span>|</span></a>");
		});
	}else{		
		$(".head .change1").replaceWith("<a class = 'change1' href= 'login.html'><span id='ischan' class = 'span1'>登录</span><span>|</span></a>");
		$(".head .change2").replaceWith("<a class = 'change2' href='signup.html'><span class = 'span1'>注册</span><span>|</span></a>");
	}
});



/*
$(function(){
	var tag1 = false;
	var user = $.cookie("user");
	var newArr = [];
	var rowArr = user.split(";");
	for(var i = 0; i < rowArr.length; i++){
		var colArr = rowArr[i].split(":");
		newArr.push(colArr[1]);
	}
	$(".loginBtn").on("click",function(){

		//console.log(tag1 + "CC");
		if(($("#username2").val() == newArr[0]) && ($("#password2").val() == newArr[1])){
			tag1 = true;
			window.open("index.html");	
		}else if(($("#username2").val() == newArr[0]) && ($("#password2").val() != newArr[1])){			
			$("#login-remider").css({display:"block"});
			$("#login-remider").html("密码输入有误");
		}else{
			var regdl =/^[1][358][0-9]{9}$/;
			if(!regdl.test($("#username2").val())){
				$("#login-remider").css({display:"block"});
				$("#login-remider").html("用户名输入有误");
			}else{
				$("#login-remider").css({display:"block"});
				$("#login-remider").html("用户名不存在");
			}	
		}
	});
	//console.log(tag1 + "bb");
	// $(".head .change2:contains(退出)").on("click", function(){
	// 	tag1 = false;
	// });
	if(tag1){
		console.log(tag1);
		 $(".head .change1").replaceWith("<a class = 'change1' href= '#'><span id='ischan' class = 'span1'>"+
			 newArr[0] +"</span><span>|</span></a>");
		$(".head .change2").replaceWith("<a class = 'change2' href='index.html'><span class = 'span1'>退出</span><span>|</span></a>");
	}else{
		console.log(tag1 + "AA");
		$(".head .change1").replaceWith("<a class = 'change1' href= 'login.html'><span id='ischan' class = 'span1'>登录</span><span>|</span></a>");
		$(".head .change2").replaceWith("<a class = 'change2' href='signup.html'><span class = 'span1'>注册</span><span>|</span></a>");
	}


*/
//请填写正确的手机/邮箱
//});// 登陆界面 end
// 购物车的显示
$(function(){
	// if(tag1){
	// 	tag1 = false;
	// 	var user = $.cookie("user");
	// 	var newArr = [];
	// 	//$("#cartNum").html($("#tableAdd > tbody > tr").length);
	// 	if($.cookie("user")){	
	// 		var rowArr = user.split(";");
	// 		for(var i = 0; i < rowArr.length; i++){
	// 			var colArr = rowArr[i].split(":");
	// 			newArr.push(colArr[1]);
	// 		}
	// 		//console.log(newArr[0]);
	// 		//console.log($(".head .change1"));
	// 		$(".head .change1").html(newArr[0]);
	// 		$(".head .change2").html("退出");
	// 		//$("#tuichu").attr("href","index.html");
	// 	}else{
	// 		$(".head .change1").html("登录");
	// 		$(".head .change2").html("注册");
	// 		//$("#tuichu").attr("href","signup.html");
	// 	}

	// 	//console.log($(".head .change2:contains(退出)"));
	// 	$(".head .change2:contains(退出)").on("click",function(){
	// 		$("#tuichu").attr("href","index.html");
	// 		$(".head .change1").html("登录");
	// 		$(".head .change2").html("注册");
	// 	});		
	// }

});


