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
            Widget
        },
        data(){
            return {
                id: 'jvm_thread_active',
                title: '线程数(活动)',
                dataApi: Monitor.getJVMThread,
                option: {
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
                        name: '数量',
                        type: 'value'
                    }],
                    series: [{
                        name: '实时线程', type: 'line', data: []
                    }, {
                        name: '守护线程', type: 'line', data: []
                    }]
                }
            }
        },
        ready() {

            // Monitor.getJVMThread()

            // daemonThreadCount : 守护线程
            // threadCount :实时线程



        },
        methods: {
            // 把数据转换为实时监控初始的ChartOption
            getRealtimeInitOption() {
                let xAxisData = [], shishiData = [], shouhuData = [];
                xAxisData.length = 61;
                shishiData.length = 61;
                shouhuData.length = 61;

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: shishiData}, {data: shouhuData}]
                }
            },
            // 把数据转换为实时监控的ChartOption
            getRealtimeOption(option, result) {
                let xAxisData = option.xAxis[0].data, shishiData = option.series[0].data, shouhuData = option.series[1].data;
                let date = new Date();
                let obj = result.ifcJVMThread;

                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(date, Tools.HHmmss_));

                shishiData.shift();
                shishiData.push(obj.daemonThreadCount);

                shouhuData.shift();
                shouhuData.push(obj.threadCount);

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: shishiData}, {data: shouhuData}]
                }
            },
            // 把数据转换为区间统计的ChartOption
            getIntervalOption(result) {
                var xAxisData = [], shishiData = [], shouhuData = [];

                $(result).each(function () {
                    let obj = this.ifcJVMThread;

                    xAxisData.push(Tools.dateToHHmm(this.date));
                    shishiData.push(obj.peakThreadCount);
                    shouhuData.push(obj.threadCount);
                });

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: shishiData}, {data: shouhuData}]
                }
            }
        }

    }
</script>