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
                id: 'jvm_non_heap_memory',
                title: '非堆内存使用情况',
                dataApi: Monitor.getJVMMemory,
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
                        name: 'GB',
                        type: 'value'
                    }],
                    series: [{
                        name: '已提交', type: 'line', data: []
                    }, {
                        name: '已使用', type: 'line', data: []
                    }]
                }
            }
        },
        ready() {


            // Monitor.getJVMMemory()

//            ifcJVMMemory: {
//                // nonHeapMemoryUsage: {
            /*committed: 137953280,
             init: 136773632,
             max: 184549376,
             used: 31738024
             },*/



        },
        methods: {
            // 把数据转换为实时监控初始的ChartOption
            getRealtimeInitOption() {
                let xAxisData = [], commitData = [], ursdData = [];
                xAxisData.length = 61;
                commitData.length = 61;
                ursdData.length = 61;

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: commitData}, {data: ursdData}]
                }
            },
            // 把数据转换为实时监控的ChartOption
            getRealtimeOption(option, result) {
                let xAxisData = option.xAxis[0].data, commitData = option.series[0].data, ursdData = option.series[1].data;
                let date = new Date();
                let obj = result.ifcJVMMemory.nonHeapMemoryUsage;

                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(date, Tools.HHmmss_));

                commitData.shift();
                commitData.push(Tools.byteToMB(obj.committed).toFixed(1));

                ursdData.shift();
                ursdData.push(Tools.byteToMB(obj.used).toFixed(1));

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: commitData}, {data: ursdData}]
                }
            },
            // 把数据转换为区间统计的ChartOption
            getIntervalOption(result) {
                var xAxisData = [], commitData = [], ursdData = [];

                $(result).each(function () {
                    let obj = this.ifcJVMThread;

                    xAxisData.push(Tools.dateToHHmm(this.date));
                    commitData.push(obj.committed);
                    ursdData.push(obj.used);
                });

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: commitData}, {data: ursdData}]
                }
            }
        }

    }
</script>