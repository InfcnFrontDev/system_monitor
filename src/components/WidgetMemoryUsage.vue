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
    import Widget from './Widget.vue';
    import SelectPeriod from './parts/SelectPeriod.vue';
    import Chart from './parts/Chart.vue'
    import Monitor from '../common/monitor.api';
    import Tools from '../common/tools';

    export default{
        components: {
            Widget, SelectPeriod, Chart
        },
        data(){
            return {
                id: 'memory_usage',
                title: '内存使用率'
            }
        },
        ready() {
            this.$refs.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params, ticket, callback) {
                        return Tools.formatter(params, 'GB');
                    }

                },

                grid: {
                    top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                },
                legend: {
                    top: 14,
                    data:['已用', '可用']
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }],
                yAxis: [{
                    name: '容量（GB）',
                    type: 'value',
                    max: 100
                }],
                series: [{
                    name: '已用', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
                }, {
                    name: '可用', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
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
                Monitor.getMem(monitorDate, interval).then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.intervalRender(result);
                });
            },
            intervalRender(result) {
                let xAxisData = [], usedData = [], freeData = [], yAxisMax = 0;

                $(result).each(function () {
                    let obj = this.ifcMem;
                    xAxisData.push(Tools.dateToHHmm(this.date));

                    usedData.push(Tools.byteToGB(obj.used).toFixed(1));

                    freeData.push(Tools.byteToGB(obj.free).toFixed(1));
                    yAxisMax = Tools.byteToGB(obj.total).toFixed(1);

                });

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: [{data: usedData}, {data: freeData}]
                });
            },
            realtimeMonitor() {
                this.$refs.chart.showLoading();

                let xAxisData = [], usedData = [], freeData = [];
                xAxisData.length = 61;
                usedData.length = 61;
                freeData.length = 61;

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: usedData}, {data: freeData}]
                });

                this.timer = setInterval(this.realtimeFetchData, 1000);
            },
            realtimeFetchData() { 
                let $this = this; 
                Monitor.getMem().then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.realtimeRender(result)
                });
            },
            realtimeRender(result) {
                let option = this.$refs.chart.getOption();
                let xAxisData = option.xAxis[0].data, yAxisMax = 100,
                        usedData = option.series[0].data, freeData = option.series[1].data,
                        obj = result.ifcMem;

                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(new Date(), Tools.HHmmss_));

                usedData.shift();
                usedData.push(Tools.byteToGB(obj.used).toFixed(2));

                freeData.shift();
                freeData.push(Tools.byteToGB(obj.free).toFixed(2));

                yAxisMax = Tools.byteToGB(obj.total).toFixed(2);

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: [{data: usedData}, {data: freeData}]
                })
            }
        }
    }
</script>