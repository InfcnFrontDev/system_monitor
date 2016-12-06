<template>
    <widget :id="id" :title="title">
        <chart v-ref:chart></chart>
    </widget>
</template>
<style>
</style>
<script>
    import Widget from '../components/Widget.vue'
    import SelectPeriod from '../components/SelectPeriod.vue'
    import Chart from '../components/Chart.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'


    export default{
        components: {
            Widget, SelectPeriod, Chart
        },
        data(){
            return {
                id: 'jvm_thread',
                title: '线程数'
            }
        },
        ready() {
            this.$refs.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params, ticket, callback) {
                        if (params instanceof Array) {
                            return params[0].name + ': ' + params[0].value;
                        } else {
                            return params.name + ': ' + params.value;
                        }
                    }
                },
                grid: {
                    top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['守护线程', '实时线程'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    name: '数量',
                    type: 'value',
                    max: 70
                }],
                series: [{
                    name: '数量', type: 'bar', barWidth: '60%', data: [10, 52],
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    markLine: {
                        data: [{
                            name: '峰值',
                            yAxis: 60
                        }],
                        lineStyle: {
                            normal: {
                                color: '#f00'
                            }
                        }
                    }
                }]
            });

            this.$refs.chart.showLoading();

            let $this = this;
            setTimeout(function () {// 解决先执行一次的问题
                $this.fetchData();
                $this.timer = setInterval($this.fetchData, 1000 * 60 * Config.hourInterval); // 定时执行数据抓取
            }, 0);
        },
        methods: {
            // 抓取数据
            fetchData(){
                let $this = this;
                Monitor.getJVMThread(this.monitorDate, this.interval).then(function (result) {
                    $this.fetchSuccess(result);
                }, function (error) {
                    $this.fetchError(error);
                });
            },
            // 获取数据成功时处理
            fetchSuccess(result){
                this.$refs.chart.hideLoading();

                // 守护线程// 实时线程// 峰值
                let {daemonThreadCount, threadCount, peakThreadCount} = result.ifcJVMThread,
                        yAxisMax = parseInt(peakThreadCount / 10) * 10 + 20;

                this.$refs.chart.setOption({
                    yAxis: [{max: yAxisMax}],
                    series: [{
                        data: [daemonThreadCount, threadCount],
                        markLine: {
                            data: [{
                                name: '峰值',
                                yAxis: peakThreadCount
                            }]
                        }
                    }]
                });
            },
            // 获取数据出错时处理
            fetchError(error){
                this.$refs.chart.hideLoading();

                this.$refs.chart.setOption({
                    yAxis: [{max: 'auto'}],
                    series: [{data: [0, 0]}]
                });
            }
        }
    }
</script>