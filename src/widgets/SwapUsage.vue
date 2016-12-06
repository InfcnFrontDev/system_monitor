<template>
    <widget-period id="swap_usage" title="交换空间（swap）使用率">
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
                return Monitor.getMem;
            },
            getInitOption(){
                return {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params, ticket, callback) {
                            return Tools.formatter(params, 'GB');
                        }
                    },
                    grid: {
                        top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                    },
                    legend: {
                        top: 14,
                        data: ['使用量', '剩余量']
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    }],
                    yAxis: [{
                        name: '容量（GB）',
                        type: 'value'
                    }],
                    series: [{
                        name: '使用量', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
                    }, {
                        name: '剩余量', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
                    }]
                };
            },
            // 数据转换
            toItemData(item) {
                let xAxisData = Tools.dateToHHmm(item.date), seriesData,
                        obj = item.ifcMem;

                let data1 = parseFloat(Tools.byteToGB(obj.swapUsed).toFixed(2));
                let data2 = parseFloat(Tools.byteToGB(obj.swapFree).toFixed(2));
                seriesData = Array.of(data1, data2);

                return {xAxisData, seriesData}
            }
        }
    }
</script>