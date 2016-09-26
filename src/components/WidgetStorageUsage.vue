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
                id: 'storage_usage',
                title: '存储使用情况',
                dataApi: Monitor.getFileSystems,
                option: {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    series: [{
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '75%'],
                        data: []
                    }]
                }
            }
        },
        methods: {
            // 把数据转换为实时监控的ChartOption
            getRealtimeOption(option, result) {
                var useds = 0, frees = 0, data = [];

                $(result.ifcFileSystems).each(function () {
                    useds += this.used;
                    frees += this.free;
                });
                data = [
                    {value: useds, name: '已用存储'},
                    {value: frees, name: '可用存储', selected: true}
                ];

                return {
                    series: [{data: data}]
                }
            }
        }
    }
</script>