<template>

    <!--悬浮信息-->
    <div class="box-opa col-xs-12 col-sm-6 col-md-6 col-lg-12">eweewewe</div>
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
        ready(){
            $('.hidden-box').hover(function(){
                $('.box-opa').css({'opacity':'0.7','display':'block', 'transition': 'all .5s'})
            },function(){
                $('.box-opa').css({'opacity':'0','display':'none'})
            })
        },
        data(){
            return {
                id: 'disk_usage',
                title: '磁盘I/O',
                dataApi: Monitor.getFileSystems,
                option: {
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
                }
            }
        },
        methods: {
            // 把数据转换为区间统计的ChartOption
            getIntervalOption(result) {
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

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: data1}, {data: data2}]
                }
            },
            // 把数据转换为实时监控初始的ChartOption
            getRealtimeInitOption() {
                let xAxisData = [], data1 = [], data2 = [];
                xAxisData.length = 61;
                data1.length = 61;
                data2.length = 61;

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: data1}, {data: data2}]
                }
            },
            // 把数据转换为实时监控的ChartOption
            getRealtimeOption(option, result) {
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

                return {
                    xAxis: [{data: xAxisData}],
                    series: [{data: data1}, {data: data2}]
                }
            }
        }
    }
</script>