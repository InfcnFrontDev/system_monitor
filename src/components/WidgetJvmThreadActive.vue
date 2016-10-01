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
                id: 'jvm_thread_active',
                title: '线程数(活动)'
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
                    data:['守护线程', '实时线程']
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }],
                yAxis: [{
                    name: '数量',
                    type: 'value'
                }],
                series: [{
                    name: '守护线程', type: 'line', data: []
                }, {
                    name: '实时线程', type: 'line', data: []
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
                Monitor.getJVMThread(monitorDate, interval).then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.intervalRender(result);
                });
            },
            intervalRender(result) {
                var xAxisData = [], shishiData = [], shouhuData = [];

                $(result).each(function () {
                    let obj = this.ifcJVMThread;

                    xAxisData.push(Tools.dateToHHmm(this.date));
                    shishiData.push(obj.peakThreadCount);
                    shouhuData.push(obj.threadCount);
                });

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: shishiData}, {data: shouhuData}]
                });
            },
            realtimeMonitor() {
                this.$refs.chart.showLoading();

                let xAxisData = [], shishiData = [], shouhuData = [];
                xAxisData.length = 61;
                shishiData.length = 61;
                shouhuData.length = 61;

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: shishiData}, {data: shouhuData}]
                });

                this.timer = setInterval(this.realtimeFetchData, 1000);
            },
            realtimeFetchData() {
                let $this = this;
                Monitor.getJVMThread().then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.realtimeRender(result)
                });
            },
            realtimeRender(result) {
                let option = this.$refs.chart.getOption();
                let xAxisData = option.xAxis[0].data, shishiData = option.series[0].data, shouhuData = option.series[1].data;
                let date = new Date();
                let obj = result.ifcJVMThread;

                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(date, Tools.HHmmss_));

                shishiData.shift();
                shishiData.push(obj.daemonThreadCount);

                shouhuData.shift();
                shouhuData.push(obj.threadCount);

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: shishiData}, {data: shouhuData}]
                })
            }
        }

    }
</script>