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
                id: 'cpu_usage',
                title: 'CPU使用率'
            }
        },
        ready() {
            this.$refs.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                },
                grid: {
                    top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                },
                legend: {
                    top: 14,
                    data: ['系统', '用户']
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }],
                yAxis: [{
                    name: '使用率（%）',
                    type: 'value',
                    max: 100
                }],
                series: [{
                    name: '系统', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
                }, {
                    name: '用户', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
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
                Monitor.getCpus(monitorDate, interval).then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.intervalRender(result);
                });
            },
            intervalRender(result) {
                var xAxisData = [], yAxisMax = 100, syssData = [], usersData = [];

                $(result).each(function () {
                    xAxisData.push(Tools.dateToHHmm(this.date));

                    var syss = 0, users = 0;
                    $(this.ifcCpus).each(function () {
                        syss += this.sys;
                        users += this.user;
                    });
                    syss *= 100;
                    users *= 100;
                    syssData.push(syss.toFixed(0));
                    usersData.push(users.toFixed(0));

                    let total = syss + users;
                    if (total > 100) {
                        yAxisMax = parseInt(total) + 30;
                    }
                });

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: [{data: syssData}, {data: usersData}]
                });
            },
            realtimeMonitor() {
                this.$refs.chart.showLoading();

                let xAxisData = [], syssData = [], usersData = [];
                xAxisData.length = 61;
                syssData.length = 61;
                usersData.length = 61;

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: syssData}, {data: usersData}]
                });

                this.timer = setInterval(this.realtimeFetchData, 1000);
            },
            realtimeFetchData() {
                let $this = this;
                Monitor.getCpus().then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.realtimeRender(result)
                });
            },
            realtimeRender(result) {
                let option = this.$refs.chart.getOption();
                let xAxisData = option.xAxis[0].data, syssData = option.series[0].data, usersData = option.series[1].data, yAxisMax = 100, total = 0;

                let date = new Date();
                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(date, Tools.HHmmss_));

                var syss = 0, users = 0;
                $(result.ifcCpus).each(function () {
                    syss += this.sys;
                    users += this.user;
                });
                syssData.shift();
                syssData.push((syss * 100).toFixed(2));
                usersData.shift();
                usersData.push((users * 100).toFixed(2));
                total = syss + users;
                if (total > 100) {
                    yAxisMax = total
                }

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: [{data: syssData}, {data: usersData}]
                })
            }
        }
    }
</script>