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
                id: 'jvm_class_load',
                title: 'jvm类加载',
                dataApi: Monitor.getJVMClassLoading,
                option: {
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                    },
                    legend: {
                        top: 14,
                        data:['已加载', '已卸载']
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
                }

            }
        },
        ready() {

//            Monitor.getJVMClassLoading()

//            {
//                date: "201609261011",
//                        ifcJVMClassLoading: {
//                isVerbose: false,
//                        已装载loadedClassCount: 3747,
//                        总计totalLoadedClassCount: 3747,
//                        已卸载unloadedClassCount: 0
//            }
//            }

        },
        methods: {
            // 把数据转换为实时监控初始的ChartOption
            getRealtimeInitOption() {
                let xAxisData = [], uploadData = [], unloadData = [];
                xAxisData.length = 61;
                uploadData.length = 61;
                unloadData.length = 61;

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: uploadData}, {data: unloadData}]
                }
            },
            // 把数据转换为实时监控的ChartOption
            getRealtimeOption(option, result) {
                let xAxisData = option.xAxis[0].data, uploadData = option.series[0].data, unloadData = option.series[1].data;
                let date = new Date();
                let obj = result.ifcJVMClassLoading;

                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(date, Tools.HHmmss_));

                uploadData.shift();
                uploadData.push(obj.loadedClassCount);

                unloadData.shift();
                unloadData.push(obj.unloadedClassCount);

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: uploadData}, {data: unloadData}]
                }
            },
            // 把数据转换为区间统计的ChartOption
            getIntervalOption(result) {
                var xAxisData = [], uploadData = [], unloadData = [];

                $(result).each(function () {
                    let obj = this.ifcJVMClassLoading;

                    xAxisData.push(Tools.dateToHHmm(this.date));
                    uploadData.push(obj.loadedClassCount);
                    unloadData.push(obj.unloadedClassCount);
                });

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: uploadData}, {data: unloadData}]
                }
            }
        }
    }
</script>