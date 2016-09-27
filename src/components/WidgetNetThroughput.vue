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
                id: 'net_throughput',
                title: '吞吐量',
                dataApi: Monitor.getNets,
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
                        name: '吞吐量(Mbps)',
                        type: 'value'
                    }],
                    series: [{
                        name: '发送', type: 'line', data: []
                    }, {
                        name: '接收', type: 'line', data: []
                    }]
                },
                rxBytes0: undefined,
                txBytes0: undefined
            }
        },
        ready() {
        },
        methods: {
            // 把数据转换为区间统计的ChartOption
            getIntervalOption(result) {
                let xAxisData = [], data1 = [], data2 = [];

                let data10 = [], data20 = [];
                $(result).each(function (i) {
                    xAxisData.push(Tools.dateToHHmm(this.date));

                    var rxBytes = 0, txBytes = 0;
                    $(this.ifcNets).each(function () {
                        rxBytes += this.rxBytes;
                        txBytes += this.txBytes;
                    });
                    data10.push(rxBytes);
                    data20.push(txBytes);

                    let d1 = 0, d2 = 0;
                    if (i > 0) {
                        d1 = data10[i] - data10[i - 1];
                        d2 = data20[i] - data20[i - 1];
                    }
                    data1.push(Tools.byteToMB(d1).toFixed(2));
                    data2.push(Tools.byteToMB(d2).toFixed(2));
                });

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: data1}, {data: data2}]
                }
            },
            // 把数据转换为实时监控初始的ChartOption
            getRealtimeInitOption() {
                let xAxisData = [], data1 = [], data2 = [];
                xAxisData.length = 61;
                data1.length = 61;
                data2.length = 61;

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: data1}, {data: data2}]
                }
            },
            // 把数据转换为实时监控的ChartOption
            getRealtimeOption(option, result) {
                var xAxisData = option.xAxis[0].data, data1 = option.series[0].data, data2 = option.series[1].data;
                let date = new Date();
                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(date, Tools.HHmmss_));

                var rxBytes = 0, txBytes = 0;
                $(result.ifcNets).each(function () {
                    rxBytes += this.rxBytes;
                    txBytes += this.txBytes;
                });

                let d1 = 0, d2 = 0;
                if(this.rxBytes0 != undefined && this.txBytes0 != undefined){
                    d1 =  rxBytes - this.rxBytes0;
                    d2 =  txBytes - this.txBytes0;
                }
                this.rxBytes0 = rxBytes;
                this.txBytes0 = txBytes;

                data1.shift();
                data1.push(Tools.byteToMB(d1).toFixed(2));
                data2.shift();
                data2.push(Tools.byteToMB(d2).toFixed(2));

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: data1}, {data: data2}]
                }
            }
        }
    }
</script>