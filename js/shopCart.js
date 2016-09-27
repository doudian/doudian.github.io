// 字符串的操作 | cookie 的相应字符串操作 
var strOper = {
	// 有则改之 无则添加到最后 ，添加 | 修改 cookie 
	addStr:function(str1, str2){
		var rowArr = str1.split("|");
		var isAdd = true;
		for(var i = 0; i < rowArr.length; i++){
			var colArr = rowArr[i].split("#");
			var str2Arr = str2.split("#");
			if(colArr[0] == str2Arr[0]){
				isAdd = false;
				colArr[1] = parseInt(colArr[1]) + 1;
				rowArr[i] = colArr.join("#");
				break;
			}
		}
		if(isAdd){
			rowArr.push(str2);
		}
		return rowArr.join("|");
	},
	// 获取COOKIE 并问字符串 转成 Json文件格式
	getStr:function($cookie){
		var rowArr = $cookie === "" ? [] : $cookie.split("|");
		var newArr = [];
		for(var i = 0; i < rowArr.length; i++){
			var colArr = rowArr[i].split("#");
			var colObj = {};
			colObj.id = colArr[0];
			// 这里有问题 输出为11111
			colObj.count = Number(colArr[1]);
			colObj.img = colArr[2];
			colObj.price = colArr[3];
			colObj.pname = colArr[4];
			newArr.push(colObj);
		}
		//console.log(newArr);
		return newArr;
	},
	// 实时修改cookie数据 与 页面上 商品数量 
	counter:function($cookie,id,type){
		var rowArr = $cookie.split("|");
		for(var i = 0; i < rowArr.length; i++){
			var colArr = rowArr[i].split("#");
			if(colArr[0] == id){
				if(type == 1){
					colArr[1] = parseInt(colArr[1]) + 1;
				}else{
					colArr[1] = parseInt(colArr[1]) - 1;
				}
				rowArr[i] = colArr.join("#");
				break;
			}
		}
		return rowArr.join("|");
	},
	// 删除相应 的 cookie 文件
	remove:function($cookie,id){
		var rowArr = $cookie.split("|");
		console.log(rowArr.length);
		var newArr = [];
		for(var i = 0; i < rowArr.length; i++){
			var colArr = rowArr[i].split("#");
			if(colArr[0] != id){
				newArr.push(colArr.join("#"));
			}
		}
		return newArr.join("|");
	}
};

/*------------------------------------------
		购物车页面的渲染
--------------------------------------------*/ 
	var getCart = function(){
		var $cookie = $.cookie("shopCart");
		var json = strOper.getStr($cookie === undefined ? "" : $cookie);
		var html = "";
		$.each(json, function(i,o){
			//console.log(Number(o.count));
			html += "<tr id = \"\" height = \"120px\">"
				 + "<td >"+ o.id +"</td>"
				 + "<td>roseonly</td>" 
				 + "<td>" 
				 + "<img class = \"shop-cart-img\" src=\""+ o.img +"\" alt=\"\">" 
				 + "<div class = \"shop-cart-name\">" + o.pname + "</div>" 
				 + "</td>" 
				 + "<td class = \"Price\">"+ o.price +"</td>" 
				 + "<td>" 
				 + "<a href=\"javascript:void(0);\" class = \"cart-down\">" 
				 + "<img class = \"num-cut\" src=\"picture/cartj.png\" alt=\"\">" 
				 + "</a>" 
				 + "</td>" 
				 + "<td>" 
				 + "<input class = \"shopcart-numshow\" data-pid = \""+ o.id +"\" type=\"text\" value = \""+ parseInt(o.count) +"\">"
				 + "</td>" 
				 + "<td>" 
				 + "<a href=\"javascript:void(0);\" class = \"cart-up\">" 
				 + "<img class = \"num-up\"  src=\"picture/cartadd.png\" alt=\"\">" 
				 + "</a>" 
				 + "</td>" 
				 + "<td>" 
				 + "<a class = \"deleteShop\" data-del = \""+ o.id +"\" href=\"javascript:void(0);\">删除</a>" 
				 + "</td>" 
				 + "</tr>";
		});
		$(".shopCart-container #tableAdd tbody").html(html);
	}
	
/*--------------------------------------------------
		购物车的 主要 执行函数
-------------------------------------------------*/ 

$(function(){

	// 点击 加入购物车 时 将产品数据 存到 cookie并且 跳转到 购物车页面

	//有cookie 就进行渲染s
	getCart();
	$(".xq-contain #addCart").on("click" ,function(){
		// 创建出  格式
		var id = $(this).data("pid");
		var img = $(".xq-contain .con-cent > img").attr("src");
		var price = $(".xq-contain .con-right .pay").text();
		var pname = $(".xq-contain .con-right .tit-de").text();
		var count = parseInt($(".xq-contain .con-right #icon_num").val());
		//console.log("ok");
		var str = id + "#" + count + "#" + img + "#" + price + "#" + pname;
		//console.log(str);
		//1#1#picture/14719460348945560.png#￥1999.0#永生玫瑰 中型心形盒 

		// 创建cookie文件 有则创建 无则修改 
		var addShopCart = function(Str){
			var $cookie = $.cookie("shopCart");
			if($cookie){
				// 如果cookie文件存在 修改
				var newStr = strOper.addStr($cookie, str);
				$.cookie("shopCart", newStr,{
					expires:7
				});
				//console.log(123);
			}else{
				// 第一次使用购物车 创建cookie
				$.cookie("shopCart", str, {
					expires:7
					// path:"/"
				});
			}
			//console.log("ok");
			getCart();
		}
		addShopCart();
	});
	
	//减少数量
	$(".shopCart-container .num-cut").on("click", function(){
		var num = parseInt($(".shopCart-container .shopcart-numshow").val());
		//console.log(num);
		if(num > 1){
			num--;
			$(".shopCart-container .shopcart-numshow").val(num);
			//修改总价￥1900
			var danjia = ($(".shopCart-container .Price").text()).substring(1);
			//console.log(danjia);
			var newPrice = parseFloat(danjia) * parseFloat(num);
			//console.log(newPrice);
			$(".shopCart-container .cartTotal font").html(newPrice);
			//实时更新cookie中的内容
			var id = $(".shopcart-numshow").data("pid");
			var result = strOper.counter($.cookie("shopCart"),id,0);
			$.cookie("shopCart",result);
			// 页面头部 购物车 (0)
			$("#cartNum").html("("+ num +")");
		}
	});
	//增加数量
	$(".shopCart-container .num-up").on("click", function(){
		var num = parseInt($(".shopCart-container .shopcart-numshow").val()) + 1;
		$(".shopCart-container .shopcart-numshow").val(num);
		//修改总价
		var danjia = ($(".shopCart-container .Price").text()).substring(1);
		var newPrice = parseFloat(danjia) * parseFloat(num);
		$(".shopCart-container .cartTotal font").html(newPrice);
		//实时更新cookie中的内容
		var id = $(".shopcart-numshow").data("pid");
		var result = strOper.counter($.cookie("shopCart"),id,1);
		$.cookie("shopCart",result);
		// 页面头部 购物车 (0)
		$("#cartNum").html("("+ num +")");

	});
	//删除 
	$(".shopCart-container .deleteShop").on("click", function(){
		//cookie中删除商品信息
		var id = $(".deleteShop").data("del");
		console.log(id);
		var result = strOper.remove($.cookie("shopCart"),id);
		$.cookie("shopCart",result);
		$(".shopCart-container .cartTotal font").html("0.0");
		$("#cartNum").html(0);
		// 页面中的渲染效果
		getCart();
	});

	// 继续购买
	$(".img-in2").on("click",function(){
		window.open("liebiao.html");
	});

	//立即结算
	$(".img-in1").on("click",function(){
		window.open("login.html");
	});
	//清空购物车
	$(".shopright").on("click",function(){
		// $.cookie("shopCart",null); 删不掉
		$.cookie("shopCart","",{expires:-1});
		$(".shopCart-container .cartTotal font").html("0.0");
		$("#cartNum").html(0);
	});



});
	