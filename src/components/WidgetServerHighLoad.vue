<template>
    <widget :id="id" :title="title">
        <div slot="toolbar" class="widget-toolbar">
            <select-date @onchange="dateChange"></select-date>
        </div>
        <chart v-ref:chart></chart>
    </widget>
</template>
<style>

</style>
<script>
    import Widget from './Widget.vue'
    import SelectDate from './parts/SelectDate.vue'
    import Chart from './parts/Chart.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'


    export default{
        components: {
            Widget, SelectDate, Chart
        },
        data(){
            return {
                id: 'server_high_load',
                title: '服务器高负载日分布情况'
            }
        },
        ready(){
            // 初始状态
            this.$refs.chart.setOption({
                tooltip: {
                    trigger: 'axis'
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
                    boundaryGap: false,
                    data: []
                }],
                yAxis: [{
                    name: '使用率（%）',
                    type: 'value',
                    max:100
                }],
                series: [
                    {name: 'CPU', type: 'line', data: []},
                    {name: '内存', type: 'line', data: []},
                    {name: '负载', type: 'line', data: []}
                ]
            });
        },
        methods: {
            dateChange(date){
                let $this = this;
                this.$refs.chart.showLoading();

                date = date.replace(/-/g, '');
                Monitor.getCpuAndMemAndLoad(date + '0000-' + date + '2359').then(function (result) {
                    $this.render(result);
                });
            },
            // 日期统计
            render(result){
                this.$refs.chart.hideLoading();

                let xAxisData = [], yAxisMax = 100, data1 = [], data2 = [], data3 = [];

                $(result).each(function (i) {
                    let date = this.date, cpus = this.ifcCpus, mem = this.ifcMem, jvmos = this.ifcJVMOperatingSystem;

                    let date2 = Tools.dateParse(date);
                    xAxisData.push(Tools.dateFormat(date2, Tools.HHmm_));

                    // CPU使用率
                    var combined = 0.00;
                    $(cpus).each(function () {
                        combined += this.combined;
                    });
                    combined = combined * 100;
                    data1.push(combined.toFixed(2));
                    if(combined > 100){
                        yAxisMax = combined
                    }
                    // 内存使用率
                    let usedPercent = mem.usedPercent;
                    data2.push(usedPercent.toFixed(2));

                    // 服务器负载
                    let serverLoad = jvmos.systemLoadAverage * 100;
                    data3.push(serverLoad.toFixed(2));
                });

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis:  [{max:yAxisMax}],
                    series: [{data: data1}, {data: data2}, {data: data3}]
                });
            }
        }
    }
</script>