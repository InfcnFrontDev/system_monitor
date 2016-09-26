<template>
    <widget :id="id" :title="title" @realtime-monitor="realtimeMonitor" @interval-statistics="intervalStatistics">
    </widget>
</template>
<style>

</style>
<script>
    import Widget from './Widget.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            Widget,
        },
        data(){
            return {
                id: 'cpu_usage',
                title: 'CPU使用率'
            }
        },
        ready() {
            this.widget = this.$children[0];

            this.chart = echarts.init(document.getElementById(this.id + "_chart"), Tools.getChartTheme());

            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
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
            };

            this.chart.setOption(option);
            $(window).bind('resize', this.chart.resize);

            // 初始状态
            this.widget.doChart();
        },
        methods: {
            intervalStatistics(monitorDate){
                this.chart.showLoading();

                // 清除实时监控的定时器
                if(this.timer != null)
                    clearInterval(this.timer);

                this.intervalFetchData(monitorDate);
            },
            intervalFetchData(monitorDate){
                let $this = this;
                Monitor.getCpus(monitorDate).then(function (value) {
                    $this.intervalRender(value)
                });
            },
            intervalRender(result) {
                this.chart.hideLoading();

                var xAxisData = [], syssData = [], usersData = [];
                $(result).each(function () {
                    xAxisData.push(Tools.dateToHHmm(this.date));

                    var syss = 0, users = 0;
                    $(this.ifcCpus).each(function () {
                        syss += this.sys;
                        users += this.user;
                    });
                    syssData.push((syss * 100).toFixed(2));
                    usersData.push((users * 100).toFixed(2));
                });

                this.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: syssData}, {data: usersData}]
                });
            },
            realtimeMonitor() {
                this.chart.showLoading();

                let xAxisData = [], syssData = [], usersData = [];
                xAxisData.length = 61;
                syssData.length = 61;
                usersData.length = 61;

                this.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: syssData}, {data: usersData}]
                });
                this.timer = setInterval(this.realtimeFetchData, 1000);
            },
            realtimeFetchData() {
                let $this = this;
                Monitor.getCpus().then(function (value) {
                    $this.realtimeRender(value)
                });
            },
            realtimeRender(result) {
                this.chart.hideLoading();

                let option = this.chart.getOption();

                var xAxisData = option.xAxis[0].data, syssData = option.series[0].data, usersData = option.series[1].data;
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

                this.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: syssData}, {data: usersData}]
                });
            }
        }
    }
</script>