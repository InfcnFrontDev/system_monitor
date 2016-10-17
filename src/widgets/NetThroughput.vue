<template>
    <widget-period id="net_throughput" title="吞吐量">
    </widget-period>
</template>
<style>
</style>
<script>
    import WidgetPeriod from '../components/WidgetPeriod.vue';
    import Monitor from '../common/monitor.api';
    import Tools from '../common/tools';

    export default{
        components: {
            WidgetPeriod
        },
        methods: {
            getDataApi(){
                return Monitor.getNets;
            },
            getInitOption(){
                return {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params, ticket, callback) {
                            return Tools.formatter(params, 'Kbps');
                        }
                    },
                    grid: {
                        top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                    },
                    legend: {
                        top: 14,
                        data: ['发送', '接收']
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    }],
                    yAxis: [{
                        name: '吞吐量(Kbps)',
                        type: 'value'
                    }],
                    series: [{
                        name: '发送', type: 'line', data: []
                    }, {
                        name: '接收', type: 'line', data: []
                    }]
                };
            },
            // 数据转换
            toItemData(item, interval) {
                let xAxisData = Tools.dateToHHmm(item.date), data1 = 0, data2 = 0, yAxisMax = 0;

                var rxBytes = 0, txBytes = 0;
                $(item.ifcNets).each(function () {
                    rxBytes += this.rxBytes;
                    txBytes += this.txBytes;
                });

                let d1 = 0, d2 = 0;
                if (this.rxBytes != undefined && this.txBytes != undefined) {
                    d1 = rxBytes - this.rxBytes;
                    d2 = txBytes - this.txBytes;
                }

                if (this.date == undefined || Math.abs(Tools.dateParse(item.date) - Tools.dateParse(this.date)) > 60000) {
                    d1 = 0;
                    d2 = 0;
                }
                this.date = item.date;

                if (interval) {
                    d1 /= interval * 60;
                    d2 /= interval * 60;
                }

                data1 = parseFloat(Tools.byteToKB(d1).toFixed(2));
                data2 = parseFloat(Tools.byteToKB(d2).toFixed(2));

                yAxisMax = data1 > data2 ? data1 : data2;

                this.rxBytes = rxBytes;
                this.txBytes = txBytes;

                let seriesData = Array.of(data1, data2);
                return {xAxisData, seriesData}
            }
        }
    }
</script>