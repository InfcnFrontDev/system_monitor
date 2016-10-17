<template>
    <widget-period id="jvm_class_load" title="JVM类加载">
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
                return Monitor.getJVMClassLoading;
            },
            getInitOption(){
                return {
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                    },
                    legend: {
                        top: 14,
                        data: ['已加载', '已卸载']
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
                        name: '已加载', type: 'line', data: []
                    }, {
                        name: '已卸载', type: 'line', data: []
                    }]
                };
            },
            // 数据转换
            toItemData(item) {
                let xAxisData = Tools.dateToHHmm(item.date), data1 = 0, data2 = 0, obj = item.ifcJVMClassLoading;

                data1 = obj.loadedClassCount;
                data2 = obj.unloadedClassCount;

                let seriesData = Array.of(data1, data2);
                return {xAxisData, seriesData}
            }
        }
    }
</script>