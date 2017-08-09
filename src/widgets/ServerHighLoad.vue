<template>
    <widget id="server_high_load" title="服务器高负载日分布情况">
        <div slot="toolbar" class="widget-toolbar">
            <select-date @onchange="dateChange"></select-date>
        </div>
        <chart v-ref:chart></chart>
    </widget>
</template>
<style>

</style>
<script>
    import Widget from '../components/Widget.vue'
    import SelectDate from '../components/SelectDate.vue'
    import Chart from '../components/Chart.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'


    export default{
        components: {
            Widget, SelectDate, Chart
        },
        data(){
            return {
                interval: Config.dayInterval
            }
        },
        ready(){
            // 初始状态
            this.$refs.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params, ticket, callback) {
                        return Tools.formatter(params, '%');
                    }
                },
                grid: {
                    top: '27%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                },
                legend: {
                    top: 14,
                    data: ['CPU', '内存', '负载']
                },
                xAxis: [{
                    type: 'category',
                    data: []
                }],
                yAxis: [{
                    name: '使用率（%）',
                    type: 'value',
                    max: 100
                }],
                series: [
                    {
                        name: 'CPU', type: 'line', data: [],
                        markPoint: {
                            data: [{type: 'max', name: '最大值'}]
                        }
                    },
                    {
                        name: '内存', type: 'line', data: [],
                        markPoint: {
                            data: [{type: 'max', name: '最大值'}]
                        }
                    },
                    {
                        name: '负载', type: 'line', data: [],
                        markPoint: {
                            data: [{type: 'max', name: '最大值'}]
                        },
                        markLine: {
                            data: [{
                                name: '高负载标线',
                                yAxis: 60
                            }],
                            lineStyle: {
                                normal: {
                                    color: '#f00'
                                }
                            }
                        }
                    }
                ]
            });

            this.init();
        },
        methods: {
            // 初始化图表，清空所有点
            init(){
                let len = 60 * 24 / this.interval,
                        xAxisData = [], data1 = [], data2 = [], data3 = [];

                xAxisData.length = len;
                data1.length = len;
                data2.length = len;
                data3.length = len;

                for (let i = 0; i < xAxisData.length; i++) {
                    xAxisData[i] = Tools.numberToTime(i, this.interval);
                    data1[i] = '-';
                    data2[i] = '-';
                    data3[i] = '-';
                }

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: 100}],
                    series: [{data: data1}, {data: data2}, {data: data3}]
                });
            },
            // 选择的日期发生改变时
            dateChange(date){
                date = date.replace(/-/g, '');
                this.monitorDate = date + '0000-' + date + '2359';

                // 清除实时监控的定时器
                if (this.timer != null)
                    clearInterval(this.timer);

                this.$refs.chart.showLoading();

                let $this = this;
                setTimeout(function () {// 解决先执行一次的问题
                    $this.fecthData();
                    $this.timer = setInterval($this.fecthData, 1000 * 60 * $this.interval);
                }, 0);
            },
            fecthData(){
                let $this = this;
                Monitor.getCpuAndMemAndLoad(this.monitorDate, this.interval).then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.init();
                    $this.render(result);
                }, function (error) {
                    $this.init();
                    $this.$refs.chart.hideLoading();
                });
            },
            // 日期统计
            render(result){
                let option = this.$refs.chart.getOption(),
                        data1 = option.series[0].data,
                        data2 = option.series[1].data,
                        data3 = option.series[2].data,
                        yAxisMax = 100,
                        interval = this.interval;

                $(result).each(function (i) {
                    let date = this.date,
                            cpus = this.ifcCpus,
                            mem = this.ifcMem,
                            jvmos = this.ifcJVMOperatingSystem;

                    let time = Tools.dateFormat(Tools.dateParse(date), Tools.HHmm_),
                            num = Tools.timeToNumber(time, interval);

                    // CPU使用率
                    var combined = 0.00;
                    $(cpus).each(function () {
                        combined += this.combined;
                    });
                    combined = combined * 100;
                    data1[num] = combined.toFixed(0);

                    // 内存使用率
                    let usedPercent = mem.usedPercent;
                    data2[num] = usedPercent.toFixed(0);

                    // 服务器负载
                    if (jvmos.systemLoadAverage < 0) {
                        jvmos.systemLoadAverage = 0;
                    }
                    let serverLoad = jvmos.systemLoadAverage * 100;
                    data3[num] = serverLoad.toFixed(0);

                    Array.from([data1[num], data2[num], data3[num]]).forEach(d => {
                        d = parseInt(d);
                        if (d > yAxisMax) {
                            yAxisMax = d;
                        }
                    });
                });

                //yAxisMax = (parseInt( yAxisMax / 10)) * 10;

                this.$refs.chart.setOption({
                    yAxis: [{max: yAxisMax}],
                    series: [{data: data1}, {data: data2}, {data: data3}]
                });
            }
        }
    }
</script>