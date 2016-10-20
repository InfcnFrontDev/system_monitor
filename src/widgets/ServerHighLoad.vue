<template>
    <date-widget :data-options="dataOptions">
    </date-widget>
</template>
<style>

</style>
<script>
    import DateWidget from '../components/DateWidget.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'


    export default{
        components: {
            DateWidget
        },
        data(){

            let interval = Config.dayInterval;
            let chartOption = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params, ticket, callback) {
                        return Tools.formatter(params, '%');
                    }
                },
                grid: {
                    top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
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
            };

            return {
                dataOptions: {
                    id: 'server_high_load',
                    title: '服务器高负载日分布情况',
                    chartOption,
                    timerInterval: 1000 * 60, // 间隔1分钟执行一次刷新
                    interval: Config.dayInterval,
                    dataApi(date) {
                        let date2 = date.replace(/-/g, ''),
                                monitorDate = date2 + '0000-' + date2 + '2359';
                        return Monitor.getCpuAndMemAndLoad(monitorDate, Config.dayInterval);
                    },
                    resultMap(result){
                        let len = 60 * 24 / interval, data = new Array(len);

                        for (let i = 0; i < data.length; i++) {
                            data[i] = new Array(4).fill('-');
                            data[i][0] = Tools.numberToTime(i, interval);
                        }

                        if (result) {
                            result.forEach(item => {
                                let date = item.date,
                                        cpus = item.ifcCpus,
                                        mem = item.ifcMem,
                                        jvmos = item.ifcJVMOperatingSystem;

                                let time = Tools.dateFormat(Tools.dateParse(date), Tools.HHmm_),
                                        num = Tools.timeToNumber(time, interval);

                                // CPU使用率
                                let combined = 0.00;
                                cpus.forEach(cpu => {
                                    combined += cpu.combined;
                                });
                                data[num][1] = parseInt((combined * 100).toFixed(0));

                                // 内存使用率
                                let usedPercent = mem.usedPercent;
                                data[num][2] = parseInt(usedPercent.toFixed(0));

                                // 服务器负载
                                let systemLoad = jvmos.systemLoadAverage;
                                if (systemLoad < 0) {
                                    systemLoad = 0;
                                }
                                systemLoad = systemLoad * 100;
                                data[num][3] = parseInt(systemLoad.toFixed(0));
                            });
                        }

                        data.unshift(['-', 'CPU', '内存', '负载']);

                        return data;
                    }
                }
            }
        }
    }
</script>