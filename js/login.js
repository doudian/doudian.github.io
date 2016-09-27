/*-------------------------------------------
		注册 界面 start
---------------------------------------------*/ 
$(function(){
	var tag = false;
	var mark = true;
	 // 判断用户名 是否注册过 遍历user.json数据

  	function  getStr1($cookie){
        var rowArr = $cookie === "" ? [] : $cookie.split("|");
        var newArr = [];
        for(var i = 0; i < rowArr.length; i++){
            var colArr = rowArr[i].split("#");
            var colObj = {};
            colObj.name = colArr[0];
            colObj.psw = colArr[1];
            newArr.push(colObj);
        }
        return newArr;
    };
	 var isUsedName = function(str,fn){
	    var $cookie1 = $.cookie("user1");
	    //console.log($cookie1);
	    // var json = getStr1($cookie1 === undefined ? "" : $cookie1);
	    // $.each(json,function(i,o){
	    //  	if(o.name == str){
	    //  		return false;
	    //  	}
	    // });
		//console.log(str + "222");
	    $.get("json/user.json").done(function(data){
	        $.each(data,function(i,o){	
	            if(o.username == str){
	            	mark=false;	
	            	return false;
	            }
	        });
	       fn();
	    });
	 };
  
	// 判断用户名是否合法
	 var isTrueUserName = $("#username1").on("blur", function(){
		var reg1 = /^[1][358][0-9]{9}$/;
		var $username1 = $(this).val();
		 mark = true;
		//console.log(reg1.test($username1));

		if(!reg1.test($username1)){
			$("#ph1").css({display:"block"});
			$("#ph1").html("请填写正确的手机号");
			flag = false;
		}else{
			isUsedName($username1,function(){
				//console.log(mark);
				if(!mark){
					$("#ph1").css({display:"block"});
					$("#ph1").html("您的手机号码已经存在，请更换手机号");
					flag = false;
				}else{
					$("#ph1").css({display:"none"});
					flag = true;
				}	
			});	
		}
	});
	 //判断密码是否合法
	var isTruePassword = $("#password1").on("blur", function(){
		var reg2 = /^[a-zA-Z\d]{6,16}$/;
		var $password1 = $(this).val();
		if(!reg2.test($password1)){
			$("#psw1").css({display:"block"});
			$("#psw1").html("密码长度为6~16个字符");
			flag = false;
		}else{
			$("#psw1").css({display:"none"});
			flag = true;
		}
	});
	//判断  图片验证码
	var isTrueTestcode = $("#testCode1").on("blur", function(){
		var $testCode1 = $(this).val();
		if(Number($("#imgTest").text()) != Number($testCode1)){
			$("#tscd1").css({display:"block"});
			$("#tscd1").html("请输入4位图片验证码");
			flag = false;
		}else{
			$("#tscd1").css({display:"none"});
			flag = true;
		}
	});
	//判断 手机验证码
	var isTruePhoneTestcode = $("#phoneTestCode1").on("blur", function(){
		// 手机验证码的值得获取
		var $phoneTestCode1 = $(this).val();
		if($(imgTest).html() != $phoneTestCode1){
			$("#phtst1").css({display:"block"});
			$("#phtst1").html("请输入4位短信验证码");
			return false;
		}else{
			$("#tscd1").css({display:"none"});
			return true;
		}
	});
	//验证码的显示
	var CreateTestCode = function(n){
		var arr = [];
		for(var i = 0; i < n; i++){
			var num = parseInt(Math.random() * 9);
			arr.push(num);
		}
		return arr.join("");
	};
	var changeCode = $("#changeCode").on("click", function(){
		$("#imgTest").html(CreateTestCode(4));
	});
	//点击注册按钮 
	var regisBtn = $(".regisBtn").on("click",function(){
		if(($("#username1").val() == "") || ($("#password1").val() == "")){
			$("#ph1").css({display:"block"});
			$("#ph1").html("手机号不能为空请填写正确的手机号");
		}
		if(flag){
			var username1 = $("#username1").val();
			var password1 = $("#password1").val();
			var str = username1 + "#" + password1;
			// 创建用户名cookie
		    var $cookie1 = $.cookie("user1");
		    if($cookie1){
		        //如果cookie文件存在
		        var newStr = strOper.addStr($cookie1,str);
		        $.cookie("user1",newStr);
		        console.log($.cookie("user1"));
		    }
		    else{
		        //cookie文件没有创建（用户第一次使用购物车）
		        $.cookie("user1",str,{
		            expires:7
		        });
		    }
			alert("注册成功");
			window.open("login.html");
		}
	});

});// 注册 界面 end
/*-------------------------------------------
		登陆 界面 start
---------------------------------------------*/ 
$(function(){
	
	var flag1 = false;
	// 判断用户名是否合法
	var isTrueUserName2 = $("#username2").on("blur", function(){
		var reg3 = /^[1][358][0-9]{9}$/;
		var $username2 = $(this).val();
		//console.log(reg1.test($username1));
		if(!reg3.test($username2)){
			$("#ph2").css({display:"block"});
			$("#ph2").html("请填写正确的手机号");
			flag1 = false;
		}else{
			$("#ph2").css({display:"none"});
			flag1 = true;	
		}
	});
	 //判断密码是否合法
	var isTruePassword2 = $("#password2").on("blur", function(){
		var reg4 = /^[a-zA-Z\d]{6,16}$/;
		var $password2 = $(this).val();
		if(!reg4.test($password2)){
			$("#psw2").css({display:"block"});
			$("#psw2").html("密码长度为6~16个字符");
			flag1 = false;
		}else{
			$("#psw2").css({display:"none"});
			flag1 = true;
		}
	});
	$(".loginBtn").on("click",function(){
		if(($("#username2").val() == "") || ($("#password2").val() == "")){
			$("#ph2").css({display:"block"});
			$("#ph2").html("用户名和密码不能为空");
		}
		if(flag1){
			var $user2 = $.cookie("user2",$("#username2").val() + "#" + $("#password2").val(),{
				expires:7
			});
			window.open("index.html");
		}
	});
	
	
//请填写正确的手机/邮箱

});// 登陆界面 end
