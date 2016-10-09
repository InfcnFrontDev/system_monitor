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
                id: 'system_load',
                title: '系统负载'
            }
        },
        ready(){
            this.$refs.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params, ticket, callback) {
                        return Tools.formatter(params, '%');
                    }
                },
                grid: {
                    top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                },
                legend: {
                    top: 14,
                    data: ['系统负载']
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }],
                yAxis: [{
                    name: '负载率（%）',
                    type: 'value',
                    max: 100
                }],
                series: [{
                    name: '系统负载', type: 'line', data: []
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
                Monitor.getJVMOperatingSystem(monitorDate, interval).then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.intervalRender(result);
                });
            },
            intervalRender(result) {
                let xAxisData = [], data1 = [], yAxisMax = 100;

                $(result).each(function () {
                    let obj = this.ifcJVMOperatingSystem;
                    xAxisData.push(Tools.dateToHHmm(this.date));

                    data1.push((obj.systemLoadAverage * 100).toFixed(0));
                });

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: [{data: data1}]
                });
            },
            realtimeMonitor() {
                this.$refs.chart.showLoading();

                let xAxisData = [], data1 = [];
                xAxisData.length = 61;
                data1.length = 61;

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: data1}]
                });

                this.timer = setInterval(this.realtimeFetchData, 1000);
            },
            realtimeFetchData() {
                let $this = this;
                Monitor.getJVMOperatingSystem().then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.realtimeRender(result)
                });
            },
            realtimeRender(result) {
                let option = this.$refs.chart.getOption();
                let xAxisData = option.xAxis[0].data, yAxisMax = 100,
                        data1 = option.series[0].data, obj = result.ifcJVMOperatingSystem;

                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(new Date(), Tools.HHmmss_));

                data1.shift();
                data1.push((obj.systemLoadAverage * 100).toFixed(0));

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: [{data: data1}]
                })
            }
        }
    }
</script>