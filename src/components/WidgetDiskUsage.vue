<template>
    <widget title="磁盘I/O">
        <div id="disk-io-chart" class="chart no-padding"></div>
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
            Widget,
        },
        data(){
            return {
                monitorDate: '201609221200-201609221259'
            }
        },
        ready() {
            this.chart = echarts.init(document.getElementById('disk-io-chart'), Tools.getChartTheme());

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
                    name: '速度（%）',
                    type: 'value'
                }],
                series: []
            };

            this.update();
            this.fetchData();

            $(window).bind('resize', this.chart.resize);
        },
        methods: {
            update(){
                this.chart.setOption(this.option);
            },
            fetchData() {
                let $this = this;
                Monitor.getFileSystems(this.monitorDate).then(function (value) {
                    $this.render(value)
                });
            },
            render(result) {
                this.chart.hideLoading();

                var xAxisData = [], readBytesData = [], writeBytesData = [];
                $(result).each(function () {
                    xAxisData.push(Tools.dateToHHmm(this.date));

                    var readBytes = 0, writeBytes = 0;
                    $(this.ifcFileSystems).each(function () {
                        readBytes += this.diskReadBytes;
                        writeBytes += this.diskWriteBytes;
                    });
                    readBytesData.push(Tools.bToGB(readBytes).toFixed(2));
                    writeBytesData.push(Tools.bToGB(writeBytes).toFixed(2));
                });

                this.option.xAxis[0].data = xAxisData;
                this.option.series = [{
                    name: '写入速度', type: 'line', data: writeBytesData
                }, {
                    name: '读取速度', type: 'line', data: readBytesData
                }];

                this.update();
            }
        }
    }
</script>