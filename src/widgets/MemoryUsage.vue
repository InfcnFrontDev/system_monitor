<template>
    <widget-period id="memory_usage" title="内存使用率">
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
                        data: ['已用', '可用']
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
                        name: '已用', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
                    }, {
                        name: '可用', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
                    }]
                };
            },
            // 数据转换
            toItemData(item) {
                let obj = item.ifcMem, xAxisData = Tools.dateToHHmm(item.date), data1 = 0, data2 = 0;

                data1 = parseFloat(Tools.byteToGB(obj.used).toFixed(2));
                data2 = parseFloat(Tools.byteToGB(obj.free).toFixed(2));

                let seriesData = Array.of(data1, data2);
                return {xAxisData, seriesData}
            }
        }
    }
</script>