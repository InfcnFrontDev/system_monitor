import Vue from 'vue'
import App from './App.vue'
import Tools from './common/tools.js'


Vue.config.debug = Config.debug;            // 只有开发版本可以使用调试模式。
Vue.config.devtools = Config.devtools;      // 配置是否允许 vue-devtools 检查代码
Vue.config.silent = Config.silent;          // 取消 Vue.js 所有的日志与警告。


Vue.filter('datetime', {
  read: function(value) {
    return Tools.dateFormat(new Date(value), Tools.yyyyMMddHHmmss_);
  }
});

Vue.filter('formatSeconds', {
	read: function(value) {
		var theTime = parseInt(value/1000);// 秒
		var theTime1 = 0;// 分
		var theTime2 = 0;// 小时
		if(theTime > 60) {
			theTime1 = parseInt(theTime/60);
			theTime = parseInt(theTime%60);
				if(theTime1 > 60) {
				theTime2 = parseInt(theTime1/60);
				theTime1 = parseInt(theTime1%60);
				}
		}
		var result = ""+parseInt(theTime)+"秒";
		if(theTime1 > 0) {
			result = ""+parseInt(theTime1)+"分"+result;
		}
		if(theTime2 > 0) {
			result = ""+parseInt(theTime2)+"小时"+result;
		}
		return result;
	}
});
if (!Array.prototype.fill) {
	Object.defineProperty(Array.prototype, 'fill', {
		value: function(value) {

			// Steps 1-2.
			if (this == null) {
				throw new TypeError('this is null or not defined');
			}

			var O = Object(this);

			// Steps 3-5.
			var len = O.length >>> 0;

			// Steps 6-7.
			var start = arguments[1];
			var relativeStart = start >> 0;

			// Step 8.
			var k = relativeStart < 0 ?
				Math.max(len + relativeStart, 0) :
				Math.min(relativeStart, len);

			// Steps 9-10.
			var end = arguments[2];
			var relativeEnd = end === undefined ?
				len : end >> 0;

			// Step 11.
			var final = relativeEnd < 0 ?
				Math.max(len + relativeEnd, 0) :
				Math.min(relativeEnd, len);

			// Step 12.
			while (k < final) {
				O[k] = value;
				k++;
			}

			// Step 13.
			return O;
		}
	});
}
new Vue({
    el: 'body',
    components: {App}
});
