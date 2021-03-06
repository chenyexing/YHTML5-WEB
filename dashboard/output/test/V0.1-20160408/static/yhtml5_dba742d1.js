;/*!/components/public/jq-index.js*/
/*=========================================================================================
 * Author:Kyle|张大漾
 * Author Website:http://yhtml5.com
 * Author Gihub:https://github.com/yhtml5
 * Description: A Website disgned by boostrap and Jquery.Do something awesome and have fun !
 *==========================================================================================*/

/*
 *@require static/lib/bootstrap/bootstrap.js
 *@require static/lib/jquery/jquery.min.js
 *
 */

/* General
 * ======= */
var y = $.noConflict()
y(function() {
	//点击切换active
	y('.list-group a').click(function() {
		y('.list-group a').removeClass('active')
		y(this).addClass('active')
	})
	y('.nav .y-active').click(function() {
		y('.nav .y-active').removeClass('active')
		y(this).addClass('active')
	})
	y('.pagination li').click(function() {
			y('.pagination li').removeClass('active')
			y(this).addClass('active')
		})
		//点击更新文字
	y('.j-dashboard-header-function .dropdown-menu a').click(function() {
		var a = y(this).text()
		y('.j-dashboard-header-function span').text(a)
	})
	y('.j-dashboard-header-app .dropdown-menu a').click(function() {
		var a = y(this).text()
		y('.j-dashboard-header-app span').text(a)
	})
	y('.y-dashboard-payment-filter .j-menu-date a').click(function() {
		var a = y(this).text()
		y('.y-dashboard-payment-filter .j-date').text(a)
	})
	y('.y-dashboard-payment-filter .j-menu-pay a').click(function() {
		var a = y(this).text()
		y('.y-dashboard-payment-filter .j-pay').text(a)
	})
	y('.y-dashboard-payment-filter .j-menu-settlement a').click(function() {
		var a = y(this).text()
		y('.y-dashboard-payment-filter .j-settlement').text(a)
	})
	y('.y-dashboard-payment-filter .j-menu-channel a').click(function() {
			var a = y(this).text()
			y('.y-dashboard-payment-filter .j-channel').text(a)
		})
		//按钮点击等待逻辑
	y(".y-app-add-create").on('click', function() {
		var btn = y(this).button('loading')
			//business logic
		setTimeout(function() {
			btn.button('reset')
		}, 1000)
	})
	y(".y-member-add-create").on('click', function() {
		var btn = y(this).button('loading')
			//business logic
		setTimeout(function() {
			btn.button('reset')
		}, 1000)
	})
	y("[data-js='send-message']").on('click', function() {
		var btn = y(this).button('loading')
			//business logic
		setTimeout(function() {
			btn.button('reset')
		}, 1000)
	})
	y(".y-dashboard-set-update").on('click', function() {
			var btn = y(this).button('loading')
				//business logic
			setTimeout(function() {
				btn.button('reset')
			}, 1000)
		})
		//弹窗显示删除中 display

	function btnLoadingReset() {
		setInterval(function() {
			a = y("[data-modal='dashboard-delete']").css("display")
			if (a == "none") {
				y("[data-js='dashboard-delete']").button('loading').button('reset')
			}
		}, 500)
	}
	btnLoadingReset()
	y("[data-js='dashboard-delete']").on('click', function() {
		var btn = y(this).button('loading')
			//business logic
	})

	function yDashboardPaymentFilter() {
		var a = y('.y-template-panel').width()
		var b = 450

		function small() {
			y('.y-dashboard-payment-filter .j-date').text("日期")
			y('.y-dashboard-payment-filter .j-pay').text("支付")
			y('.y-dashboard-payment-filter .j-settlement').text("结算")
			y('.y-dashboard-payment-filter .j-channel').text("渠道")
		}

		function big() {
			y('.y-dashboard-payment-filter .j-date').html("选择日期")
			y('.y-dashboard-payment-filter .j-pay').html("支付状态")
			y('.y-dashboard-payment-filter .j-settlement').html("结算状态")
			y('.y-dashboard-payment-filter .j-channel').html("全部渠道")
		}
		if (a < b) {
			small()
		}
		y(window).resize(function() {
			var c = y('.y-template-panel').width()
			if (c < b) {
				small()
			} else {
				big()
			}
		})
	}
	//	yDashboardPaymentFilter()
	//	y(window).resize(function() {
	//			console.log("不要调皮地频繁调节窗口")
	//		})
	//增加表格内容
	function yExpandTable() {
		for (var j = 1; j < 5; j++) {
			var tbody = y('[data-js="repeat' + j + '"]').html()
			for (var i = 0; i < 9; i++) {
				y('[data-js="repeat' + j + '"]').append(tbody)
			}
		}
	}
	yExpandTable();
	y('[data-toggle="y-hover-show"]').hover(function() {
		y(this).fadeOut()
			//loading date logic
		setTimeout(function() {
			y('[data-toggle="y-hover-shown"]').fadeIn()
		}, 400)
	})
	y("[data-toggle='popover']").popover()
	console.log("%c YHTML5 %c Copyright \xa9 2014-%s", 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:44px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;', "font-size:12px;color:#999999;margin-top:10px;", (new Date).getFullYear())

	function urlIdActive() {
		var urlId = window.location.hash.replace(/^(.*[n])*.*(.|n)$/g, "$2") - 1;
		console.log("温馨提示：请不要调皮地在此粘贴执行任何内容，这可能会导致您的账户受到攻击，给您带来损失 ！^_^")
		if (urlId >= 0) {
			y('.y-template-dashboard .tab-pane').removeClass('active in');
			y('.y-template-dashboard .tab-pane:eq(' + urlId + ')').addClass('active in').tab('show');
		}
	}
	urlIdActive();

})
;/*!/components/public/ng-app.js*/
/*
 *@require components/public/jq-index.js
 *@require static/lib/angular/angular.min.js
 *
 */
angular.module('app', [])
	.controller('ctrl', function($scope, $http) {
		$http.get("../server/init.json")
			.success(function(response) {
				$scope.userApps = response.userApps //$scope.names 为一个数组
			})
	})
;/*!/components/help-center/help-center.js*/
/* help-center script
 * ================== */