<template>
    <widget title="交换空间（swap）使用率">
        <div id="swap-usage-chart" class="chart no-padding"></div>
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
        data(){
            return {
                monitorDate: '201609221200-201609221259'
            }
        },
        ready() {
            this.chart = echarts.init(document.getElementById('swap-usage-chart'));

            this.option = {
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }],
                yAxis: [{
                    name: '容量（GB）',
                    type: 'value',
                    max: 100
                }],
                series: []
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
                Monitor.getMem(this.monitorDate).then(function (value) {
                    $this.render(value)
                });
            },
            render(result) {
                this.chart.hideLoading();

                let xAxisData = [], usedData = [], freeData = [], yAxisMax = 0;
                $(result).each(function () {
                    xAxisData.push(Tools.dateToHHmm(this.date));
                    usedData.push(Tools.bToGB(this.ifcMem.swapUsed).toFixed(1));
                    freeData.push(Tools.bToGB(this.ifcMem.swapFree).toFixed(1));
                    yAxisMax =  Tools.bToGB(this.ifcMem.swapTotal).toFixed(1);
                });

                this.option.xAxis[0].data = xAxisData;
                this.option.yAxis[0].max = yAxisMax;
                this.option.series = [{
                    name: '使用量', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: usedData
                }, {
                    name: '剩余量', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: freeData
                }];

                this.update();
            }
        }
    }
</script>