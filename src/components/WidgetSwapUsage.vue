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
                id: 'swap_usage',
                title: '交换空间（swap）使用率',
                dataApi: Monitor.getMem,
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
                        name: '容量（GB）',
                        type: 'value',
                        max: 100
                    }],
                    series: [{
                        name: '使用量', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
                    }, {
                        name: '剩余量', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
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
                let xAxisData = [], usedData = [], freeData = [], yAxisMax = 0;
                $(result).each(function () {
                    let obj = this.ifcMem;
                    xAxisData.push(Tools.dateToHHmm(this.date));
                    usedData.push(Tools.byteToGB(obj.swapUsed).toFixed(1));
                    freeData.push(Tools.byteToGB(obj.swapFree).toFixed(1));
                    yAxisMax = Tools.byteToGB(obj.swapTotal).toFixed(1);
                });

                return {
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: [{data: usedData}, {data: freeData}]
                }
            },
            // 把数据转换为实时监控初始的ChartOption
            getRealtimeInitOption() {
                let xAxisData = [], usedData = [], freeData = [];
                xAxisData.length = 61;
                usedData.length = 61;
                freeData.length = 61;

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: usedData}, {data: freeData}]
                }
            },
            // 把数据转换为实时监控的ChartOption
            getRealtimeOption(option, result) {
                let xAxisData = option.xAxis[0].data, yAxisMax = 100,
                        usedData = option.series[0].data, freeData = option.series[1].data,
                        obj = result.ifcMem;

                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(new Date(), Tools.HHmmss_));

                usedData.shift();
                usedData.push(Tools.byteToGB(obj.swapUsed).toFixed(1));

                freeData.shift();
                freeData.push(Tools.byteToGB(obj.swapFree).toFixed(1));

                yAxisMax = Tools.byteToGB(obj.swapTotal).toFixed(1);

                return {
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: [{data: usedData}, {data: freeData}]
                }
            }
        }
    }
</script>