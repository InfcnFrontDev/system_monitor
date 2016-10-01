<template>
    <widget :id="id" :title="title">
        <div slot="toolbar" class="widget-toolbar">
            <select-drive @onchange="driveChange"></select-drive>
        </div>
        <chart v-ref:chart></chart>
    </widget>
</template>
<style>

</style>
<script>
    import Widget from './Widget.vue'
    import SelectDrive from './parts/SelectDrive.vue'
    import Chart from './parts/Chart.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            Widget, SelectDrive, Chart
        },
        data(){
            return {
                id: 'storage_usage',
                title: '存储使用情况'
            }
        },
        ready(){
            // 初始状态
            this.$refs.chart.setOption({
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
            });
        },
        methods: {
            driveChange(drive){
                let $this = this;
                Monitor.getFileSystems().then(function (result) {
                    $this.render(result);
                });
            },
            render(result) {
                var useds = 0, frees = 0, data = [];

                $(result.ifcFileSystems).each(function () {
                    useds += this.used;
                    frees += this.free;
                });
                data = [
                    {value: useds, name: '已用存储'},
                    {value: frees, name: '可用存储', selected: true}
                ];

                this.$refs.chart.setOption({
                    series: [{data: data}]
                });
            }
        }
    }
</script>