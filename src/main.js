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

new Vue({
    el: 'body',
    components: {App}
});
