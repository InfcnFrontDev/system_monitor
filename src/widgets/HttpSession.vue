<template>
    <widget id="http_session" class="http_session" title="HttpSession信息">
        <div class="chart no-padding heightauto">
            <table id="httpsession" class="table table-bordered table-striped" style="clear: both">
                <tbody>
                <tr>
                    <td width="10%">sessionId</td>
                    <td width="10%">最后访问时间</td>
					<td width="10%">存活时间</td>
					<td width="10%">过期时间</td>
					<td width="10%">访问者所在国家</td>
					<td width="10%">远程地址</td>
                </tr>
				<tr v-for="item in obj.sessionDetailList">
                    <td class="jvm-td-color">{{item.id}}</td>
                    <td class="jvm-td-color">{{item.lastAccess | formatSeconds}}</td>
					<td class="jvm-td-color">{{item.age | formatSeconds}}</td>
					<td class="jvm-td-color">{{item.expirationDate | datetime}}</td>
					<td class="jvm-td-color">{{item.countryDisplay}}</td>
					<td class="jvm-td-color">{{item.remoteAddr}}</td>
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
    #http_session .heightauto{
        height:auto;
    }
    .hidden{
        display:none;
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
                Monitor.getHttpSession().then(function (result) {
                     if(result.ifcHttpSession){

                         $('#nav-http').removeClass('hidden');

                         $this.render(result);
                     }else{
                         $('#http-session-info').addClass('hidden');
                     }
                })
            },
            render(result){
                this.obj = result.ifcHttpSession
            }
        }
    }
</script>