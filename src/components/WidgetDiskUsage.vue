<template>
    <widget :id="id" :title="title">
        <div slot="toolbar" class="widget-toolbar">
            <select-period @onchange="periodChange"></select-period>
        </div>
        <chart v-ref:chart></chart>
    </widget>
</template>
<style>
</style>
<script>
    import Widget from './Widget.vue'
    import SelectPeriod from './parts/SelectPeriod.vue'
    import Chart from './parts/Chart.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            Widget, SelectPeriod, Chart
        },
        data(){
            return {
                id: 'disk_usage',
                title: '磁盘I/O'
            }
        },
        ready(){
            this.$refs.chart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                },
                legend: {
                    top: 14,
                    data:['写入速度', '读取速度']
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }],
                yAxis: [{
                    name: '速度（KB/s）',
                    type: 'value'
                }],
                series: [{
                    name: '写入速度', type: 'line', data: []
                }, {
                    name: '读取速度', type: 'line', data: []
                }]
            });
        },
        methods: {
            periodChange(monitorDate, interval){
                if (monitorDate) {
                    this.intervalStatistics(monitorDate, interval);
                } else {
                    this.realtimeMonitor();
                }
            },
            intervalStatistics(monitorDate, interval){
                this.$refs.chart.showLoading();

                // 清除实时监控的定时器
                if (this.timer != null)
                    clearInterval(this.timer);

                this.intervalFetchData(monitorDate, interval);
            },
            intervalFetchData(monitorDate, interval){
                let $this = this;
                Monitor.getFileSystems(monitorDate, interval).then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.intervalRender(result);
                });
            },
            intervalRender(result) {
                let xAxisData = [], data1 = [], data2 = [], temp1 = [], temp2 = [];

                $(result).each(function (i) {
                    xAxisData.push(Tools.dateToHHmm(this.date));

                    var diskReadBytes = 0, diskWriteBytes = 0;
                    $(this.ifcFileSystems).each(function () {
                        diskReadBytes += this.diskReadBytes;
                        diskWriteBytes += this.diskWriteBytes;
                    });
                    temp1.push(diskReadBytes);
                    temp2.push(diskWriteBytes);

                    let d1 = 0, d2 = 0;
                    if (i > 0) {
                        d1 = temp1[i] - temp1[i - 1];
                        d2 = temp2[i] - temp2[i - 1];
                    }
                    data1.push(Tools.byteToKB(d1).toFixed(2));
                    data2.push(Tools.byteToKB(d2).toFixed(2));
                });

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: data1}, {data: data2}]
                });
            },
            realtimeMonitor() {
                this.$refs.chart.showLoading();

                let xAxisData = [], data1 = [], data2 = [];
                xAxisData.length = 61;
                data1.length = 61;
                data2.length = 61;

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: data1}, {data: data2}]
                });

                this.timer = setInterval(this.realtimeFetchData, 1000);
            },
            realtimeFetchData() {
                let $this = this;
                Monitor.getFileSystems().then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.realtimeRender(result)
                });
            },
            realtimeRender(result) {
                let option = this.$refs.chart.getOption();
                var xAxisData = option.xAxis[0].data, data1 = option.series[0].data, data2 = option.series[1].data;

                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(new Date(), Tools.HHmmss_));

                var diskReadBytes = 0, diskWriteBytes = 0;
                $(result.ifcFileSystems).each(function () {
                    diskReadBytes += this.diskReadBytes;
                    diskWriteBytes += this.diskWriteBytes;
                });

                let d1 = 0, d2 = 0;
                if(this.diskReadBytes != undefined && this.diskWriteBytes != undefined){
                    d1 =  diskReadBytes - this.diskReadBytes;
                    d2 =  diskWriteBytes - this.diskWriteBytes;
                }
                this.diskReadBytes = diskReadBytes;
                this.diskWriteBytes = diskWriteBytes;

                data1.shift();
                data1.push(Tools.byteToKB(d1).toFixed(2));
                data2.shift();
                data2.push(Tools.byteToKB(d2).toFixed(2));

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    series: [{data: data1}, {data: data2}]
                })
            }
        }
    }
</script>