<template>
    <widget id="http_request" class="http_request" title="HttpRequest信息">
        <div class="chart no-padding heightauto">
            <table id="user" class="table table-bordered table-striped" style="clear: both">
                <tbody>
                <tr>
                    <td width="10%">URL</td>
                    <td width="10%">访问次数</td>
					<td width="10%">响应最长时间(毫秒)</td>
					<td width="10%">CPU平均执行时间(毫秒)</td>
					<td width="10%">平均响应时间(毫秒)</td>
					<td width="10%">响应时间偏差(毫秒)</td>
					<td width="10%">错误率</td>
                </tr>
				
				<tr v-for="item in obj.requestCounterList">
                    <td class="jvm-td-color">{{item.name}}</td>
                    <td class="jvm-td-color">{{item.hits}}</td>
					<td class="jvm-td-color">{{item.maximum}}</td>
					<td class="jvm-td-color">{{item.cpuTimeMean}}</td>
					<td class="jvm-td-color">{{item.mean}}</td>
					<td class="jvm-td-color">{{item.standardDeviation}}</td>
					<td class="jvm-td-color">{{item.systemErrorPercentage}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </widget>
</template>
<style>
    #jvm-msg-ul {
        list-style: none;
        line-height: 27px;
    }
   #http_request .heightauto{
        height:auto;
    }
    .hidden{
        display: none;
    }
</style>
<script>
    import Widget from '../components/Widget.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            Widget
        },
        data(){
            return {
                obj: {}
            }
        },
        ready() {
            let $this = this;
            setTimeout(function () {// 解决先执行一次的问题
                $this.fetchData();
                $this.timer = setInterval($this.fetchData, Config.realtimeIntervalTime); // 定时执行数据抓取
            }, 0);

        },
        methods: {
            fetchData(){
                let $this = this;
                Monitor.getHttpRequest().then(function (result) {
                    if(result.ifcHttpRequest){

                        $('#nav-http').removeClass('hidden');

                        $this.render(result);
                    }else{
                        $('#http-request-info').addClass('hidden');
                    }

                });
            },
            render(result){
                this.obj = result.ifcHttpRequest;
            }
        }
    }
</script>