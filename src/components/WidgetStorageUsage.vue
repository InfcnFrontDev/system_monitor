<template>
    <widget title="存储使用情况">
        <div id="storage-usage-chart" class="chart no-padding"></div>
    </widget>
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
        ready() {
            this.chart = echarts.init(document.getElementById('storage-usage-chart'));

            this.option = {
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
            };

            this.update();

            this.fetchData();
        },
        methods: {
            update(){
                this.chart.setOption(this.option);
            },
            fetchData() {
                let $this = this;
                Monitor.getFileSystems().then(function (value) {
                    $this.render(value)
                });
            },
            render(result) {
                this.chart.hideLoading();

                var useds = 0, frees = 0;
                $(result.ifcFileSystems).each(function () {
                    useds += this.used;
                    frees += this.free;
                });

                this.option.series[0].data = [
                    {value: useds, name: '已用存储'},
                    {value: frees, name: '可用存储', selected: true}
                ];

                this.update();
            }
        }
    }
</script>