<template>
    <widget id="sql_info" class="sql_info" title="SQL执行信息">
        <div class="chart no-padding heightauto">
            <table id="user" class="table table-bordered table-striped" style="clear: both">
                <tbody>
                <tr>
                    <td width="3%">序号</td>
                    <td width="52%">SQL</td>
					<td width="5%">执行数</td>
					<td width="5%">执行时间</td>
					<td width="5%">最慢</td>
					<td width="5%">事务中</td>
					<td width="5%">错误数</td>
					<td width="5%">更新行数</td>
					<td width="5%">读取行数</td>
					<td width="5%">执行中</td>
					<td width="5%">最大并发</td>
                </tr>
													
				<tr v-for="(index, item) in obj">
                    <td class="jvm-td-color">{{index+1}}</td>
                    <td class="jvm-td-color">{{item.SQL}}</td>
					<td class="jvm-td-color">{{item.ExecuteCount}}</td>
					<td class="jvm-td-color">{{item.TotalTime}}</td>
					<td class="jvm-td-color">{{item.MaxTimespan}}</td>
					<td class="jvm-td-color">{{item.InTransactionCount}}</td>
					<td class="jvm-td-color">{{item.ErrorCount}}</td>
					<td class="jvm-td-color">{{item.EffectedRowCount}}</td>
					<td class="jvm-td-color">{{item.FetchRowCount}}</td>
					<td class="jvm-td-color">{{item.RunningCount}}</td>
					<td class="jvm-td-color">{{item.ConcurrentMax}}</td>
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
	#sql_info .heightauto{
		min-height: 300px;
		height:auto;
	}
	.hidden{
		display:none;
	}

	#sql_info .widget-body{
		height:auto;
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
                Monitor.getSql().then(function (result) {
						/*console.log(result)*/
					if(result.ifcSql){

						$('#nav-sql').removeClass('hidden');

						$this.render(result);
					}else{
						$('#sql-info').addClass('hidden');
					}

                });

            },
            render(result){
                this.obj = result.ifcSql;
            }
        }
    }
</script>