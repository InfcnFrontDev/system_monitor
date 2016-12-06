<template>
    <widget id="storage_usage" title="存储使用情况">
        <div slot="toolbar" class="widget-toolbar">
            <select-drive @onchange="driveChange"></select-drive>
        </div>
        <chart v-ref:chart></chart>
    </widget>
</template>
<style>

</style>
<script>
    import Widget from '../components/Widget.vue'
    import SelectDrive from '../components/SelectDrive.vue'
    import Chart from '../components/Chart.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            Widget, SelectDrive, Chart
        },
        ready(){
            // 初始状态
            this.$refs.chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: function (params, ticket, callback) {
                        return params.name + ':' + params.value + 'GB ('+ params.percent +'%)';
                    }
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
                this.drive = drive;

                let $this = this;
                Monitor.getFileSystems().then(function (result) {
                    $this.render(result);
                });
            },
            render(result) {
                let useds = 0, frees = 0, data = [];

                let $this = this;
                $(result.ifcFileSystems).each(function () {
                    if($this.drive == this.devName){
                        useds = this.used;
                        frees = this.free;
                    }
                });
                data = [
                    {value: Tools.byteMbToGB(useds).toFixed(2), name: '已用存储'},
                    {value: Tools.byteMbToGB(frees).toFixed(2), name: '可用存储', selected: true}
                ];

                this.$refs.chart.setOption({
                    series: [{data: data}]
                });
            }
        }
    }
</script>