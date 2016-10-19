<template>
    <period-widget id="system_load" title="系统负载">
    </period-widget>
</template>
<style>
</style>
<script>
    import PeriodWidget from '../components/PeriodWidget.vue';
    import Monitor from '../common/monitor.api';
    import Tools from '../common/tools';

    export default{
        components: {
            PeriodWidget
        },
        methods: {
            getDataApi(){
                return Monitor.getJVMOperatingSystem;
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
                        data: ['系统负载']
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    }],
                    yAxis: [{
                        name: '负载率（%）',
                        type: 'value',
                        max: 100
                    }],
                    series: [{
                        name: '系统负载', type: 'line', data: []
                    }]
                };
            },
            // 数据转换
            toItemData(item) {
                let xAxisData = Tools.dateToHHmm(item.date), data1 = 0, yAxisMax = 0,
                        obj = item.ifcJVMOperatingSystem;

                if (obj.systemLoadAverage < 0) {
                    obj.systemLoadAverage = 0;
                }
                data1 = parseFloat((obj.systemLoadAverage * 100).toFixed(0));
                yAxisMax = data1;

                let seriesData = Array.of(data1);
                return {xAxisData, seriesData, yAxisMax}
            }
        }
    }
</script>