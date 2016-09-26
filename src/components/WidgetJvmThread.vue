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
                id: 'jvm_thread',
                title: '线程数',
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
                        name: '峰值', type: 'line', data: []
                    }, {
                        name: '活动', type: 'line', data: []
                    }]
                }
            }
        },
        ready() {

//            Monitor.getJVMThread()

            //ifcJVMThread:{
//            peakThreadCount: 30,
//            threadCount: 30,
    //        }
        },
        methods: {
            // 把数据转换为实时监控初始的ChartOption
            getRealtimeInitOption() {
                let xAxisData = [], uploadData = [], unloadData = [];
                xAxisData.length = 61;
                uploadData.length = 61;
                unloadData.length = 61;

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: uploadData}, {data: unloadData}]
                }
            },
            // 把数据转换为实时监控的ChartOption
            getRealtimeOption(option, result) {
                let xAxisData = option.xAxis[0].data, uploadData = option.series[0].data, unloadData = option.series[1].data;
                let date = new Date();
                let obj = result.ifcJVMThread;

                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(date, Tools.HHmmss_));

                uploadData.shift();
                uploadData.push(obj.peakThreadCount);

                unloadData.shift();
                unloadData.push(obj.threadCount);

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: uploadData}, {data: unloadData}]
                }
            },
            // 把数据转换为区间统计的ChartOption
            getIntervalOption(result) {
                var xAxisData = [], uploadData = [], unloadData = [];

                $(result).each(function () {
                    let obj = this.ifcJVMThread;

                    xAxisData.push(Tools.dateToHHmm(this.date));
                    uploadData.push(obj.peakThreadCount);
                    unloadData.push(obj.threadCount);
                });

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: uploadData}, {data: unloadData}]
                }
            }
        }
    }
</script>