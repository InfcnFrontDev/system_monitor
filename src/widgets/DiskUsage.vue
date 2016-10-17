<template>
    <widget-period id="disk_usage" title="磁盘I/O">
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
        data(){
            return {
                id: 'disk_usage',
                title: '磁盘I/O'
            }
        },
        methods: {
            getDataApi(){
                return Monitor.getFileSystems;
            },
            getInitOption(){
                return {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params, ticket, callback) {
                            return Tools.formatter(params, 'KB/s');

                        }
                    },
                    grid: {
                        top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                    },
                    legend: {
                        top: 14,
                        data: ['写入速度', '读取速度']
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    }],
                    yAxis: [{
                        name: '速度(KB/s)',
                        type: 'value'
                    }],
                    series: [{
                        name: '写入速度', type: 'line', data: []
                    }, {
                        name: '读取速度', type: 'line', data: []
                    }]
                };
            },
            // 数据转换
            toItemData(item, interval) {
                let $this = this;
                let xAxisData = Tools.dateToHHmm(item.date), data1 = 0, data2 = 0;

                if ($this.diskReadBytes == undefined && $this.diskWriteBytes == undefined) {
                    $this.diskReadBytes = new Array(item.ifcFileSystems.length);
                    $this.diskWriteBytes = new Array(item.ifcFileSystems.length);
                }

                var diskReadBytes = 0, diskWriteBytes = 0;

                $(item.ifcFileSystems).each(function (i) {
                    if ($this.diskReadBytes[i]) {
                        let dr = this.diskReadBytes - $this.diskReadBytes[i];
                        if (dr < 0) {
                            dr += 1024 * 1024 * 1024 * 4;
                        }
                        diskReadBytes += dr;
                    }
                    $this.diskReadBytes[i] = this.diskReadBytes;

                    if ($this.diskWriteBytes[i]) {
                        let dw = this.diskWriteBytes - $this.diskWriteBytes[i];
                        if (dw < 0) {
                            dw += 1024 * 1024 * 1024 * 4;
                        }
                        diskWriteBytes += dw;
                    }
                    $this.diskWriteBytes[i] = this.diskWriteBytes;
                });

                if ($this.date == undefined || Math.abs(Tools.dateParse(item.date) - Tools.dateParse($this.date)) > 60000) {
                    diskWriteBytes = 0;
                    diskReadBytes = 0;
                }
                $this.date = item.date;

                if (interval) {
                    diskWriteBytes /= interval * 60;
                    diskReadBytes /= interval * 60;
                }

                data1 = parseFloat(Tools.byteToKB(diskWriteBytes).toFixed(2));
                data2 = parseFloat(Tools.byteToKB(diskReadBytes).toFixed(2));

                let seriesData = Array.of(data1, data2);

                return {xAxisData, seriesData}
            }
        }
    }
</script>