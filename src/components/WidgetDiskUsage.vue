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
                id: 'disk_usage',
                title: '磁盘I/O',
                dataApi: Monitor.getFileSystems,
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
                        name: '速度（KB/s）',
                        type: 'value'
                    }],
                    series: [{
                        name: '读取速度', type: 'line', data: []
                    }, {
                        name: '写入速度', type: 'line', data: []
                    }]
                }
            }
        },
        methods: {
            // 把数据转换为实时监控初始的ChartOption
            getRealtimeInitOption() {
                let xAxisData = [], readData = [], writeData = [];
                xAxisData.length = 61;
                readData.length = 61;
                writeData.length = 61;

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: readData}, {data: writeData}]
                }
            },
            // 把数据转换为实时监控的ChartOption
            getRealtimeOption(option, result) {
                var xAxisData = option.xAxis[0].data, readsData = option.series[0].data, writesData = option.series[1].data;
                let date = new Date();
                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(date, Tools.HHmmss_));

                var reads = 0, writes = 0;
                $(result.ifcFileSystems).each(function () {
                    reads += this.diskReadBytes;
                    writes += this.diskWriteBytes;
                });
                readsData.shift();
                readsData.push(Tools.byteToMB(reads).toFixed(2));
                writesData.shift();
                writesData.push(Tools.byteToMB(writes).toFixed(2));

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: readsData}, {data: writesData}]
                }
            }
        }
    }
</script>