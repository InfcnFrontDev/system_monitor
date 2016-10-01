<template>
    <widget :id="id" :title="title">
        <div slot="toolbar" class="widget-toolbar">
            <select-period @onchange="periodChange"></select-period>
        </div>
        <chart v-ref:chart></chart>
    </widget>
</template>
<style>
</style>
<script>
    import Widget from './Widget.vue'
    import SelectPeriod from './parts/SelectPeriod.vue'
    import Chart from './parts/Chart.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'


    export default{
        components: {
            Widget, SelectPeriod, Chart
        },
        data(){
            return {
                id: 'jvm_heap_memory',
                title: '堆内存使用情况'
            }
        },
        ready() {
            this.$refs.chart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                },
                legend: {
                    top: 14,
                    data:['已提交', '已使用']
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }],
                yAxis: [{
                    name: 'GB',
                    type: 'value'
                }],
                series: [{
                    name: '已提交', type: 'line', data: []
                }, {
                    name: '已使用', type: 'line', data: []
                }]
            });
        },
        methods: {
            periodChange(monitorDate, interval){
                if (monitorDate) {
                    this.intervalStatistics(monitorDate, interval);
                } else {
                    this.realtimeMonitor();
                }
            },
            intervalStatistics(monitorDate, interval){
                this.$refs.chart.showLoading();

                // 清除实时监控的定时器
                if (this.timer != null)
                    clearInterval(this.timer);

                this.intervalFetchData(monitorDate, interval);
            },
            intervalFetchData(monitorDate, interval){
                let $this = this;
                Monitor.getJVMMemory(monitorDate, interval).then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.intervalRender(result);
                });
            },
            intervalRender(result) {
                var xAxisData = [], commitData = [], ursdData = [];

                $(result).each(function () {
                    let obj = this.ifcJVMMemory.heapMemoryUsage;

                    xAxisData.push(Tools.dateToHHmm(this.date));
                    commitData.push(Tools.byteToGB(obj.committed).toFixed(2));
                    ursdData.push(Tools.byteToGB(obj.used).toFixed(2));
                });

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: commitData}, {data: ursdData}]
                });
            },
            realtimeMonitor() {
                this.$refs.chart.showLoading();

                let xAxisData = [], commitData = [], ursdData = [];
                xAxisData.length = 61;
                commitData.length = 61;
                ursdData.length = 61;

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: commitData}, {data: ursdData}]
                });

                this.timer = setInterval(this.realtimeFetchData, 1000);
            },
            realtimeFetchData() {
                let $this = this;
                Monitor.getJVMMemory().then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.realtimeRender(result)
                });
            },
            realtimeRender(result) {
                let option = this.$refs.chart.getOption();
                let xAxisData = option.xAxis[0].data, commitData = option.series[0].data, ursdData = option.series[1].data;
                let date = new Date();
                let obj = result.ifcJVMMemory.heapMemoryUsage;

                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(date, Tools.HHmmss_));

                commitData.shift();
                commitData.push(Tools.byteToGB(obj.committed).toFixed(1));

                ursdData.shift();
                ursdData.push(Tools.byteToGB(obj.used).toFixed(1));

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: commitData}, {data: ursdData}]
                })
            }
        }
    }
</script>