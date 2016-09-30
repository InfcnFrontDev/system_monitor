<template>
    <widget :id="id" :title="title"></widget>
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
                title: 'CPU使用率',
                dataApi: Monitor.getCpus,
                option: {
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                    },
                    legend: {
                        top: 14,
                        data:['系统', '用户']
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    }],
                    yAxis: [{
                        name: '使用率（%）',
                        type: 'value',
                    }],
                    series: [{
                        name: '系统', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
                    }, {
                        name: '用户', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
                    }]
                }
            }
        },
        ready() {
            this.widget = this.$children[0];
        },
        methods: {
            // 把数据转换为区间统计的ChartOption
            getIntervalOption(result) {
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

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: syssData}, {data: usersData}]
                }
            },
            // 把数据转换为实时监控初始的ChartOption
            getRealtimeInitOption() {
                let xAxisData = [], syssData = [], usersData = [];
                xAxisData.length = 61;
                syssData.length = 61;
                usersData.length = 61;

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: syssData}, {data: usersData}]
                }
            },
            // 把数据转换为实时监控的ChartOption
            getRealtimeOption(option, result) {
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

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: syssData}, {data: usersData}]
                }
            }
        }
    }
</script>