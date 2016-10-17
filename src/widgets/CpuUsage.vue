<template>
    <widget-period id="cpu_usage" title="CPU使用率">
    </widget-period>
</template>
<style>
</style>
<script>
    import WidgetPeriod from '../components/WidgetPeriod.vue';
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            WidgetPeriod
        },
        methods: {
            getDataApi(){
                return Monitor.getCpus;
            },
            getInitOption(){
                return {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params, ticket, callback) {
                            return Tools.formatter(params, '%');
                        }
                    },
                    grid: {
                        top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                    },
                    legend: {
                        top: 14,
                        data: ['系统', '用户']
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    }],
                    yAxis: [{
                        name: '使用率（%）',
                        type: 'value',
                        max: 100
                    }],
                    series: [{
                        name: '系统', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
                    }, {
                        name: '用户', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: []
                    }]
                };
            },
            // 数据转换
            toItemData(item) {
                let xAxisData = Tools.dateToHHmm(item.date), data1 = 0, data2 = 0, yAxisMax = 0;

                $(item.ifcCpus).each(function () {
                    data1 += this.sys;
                    data2 += this.user;
                });

                data1 = parseInt((data1 * 100).toFixed(0));
                data2 = parseInt((data2 * 100).toFixed(0));
                yAxisMax = data1 + data2;

                let seriesData = Array.of(data1, data2);
                return {xAxisData, seriesData, yAxisMax}
            }
        }
    }
</script>