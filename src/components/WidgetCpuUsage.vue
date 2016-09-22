<template>
    <widget title="CPU使用率">
        <div id="cpu-usage-chart" class="chart no-padding"></div>
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
            this.chart = echarts.init(document.getElementById('cpu-usage-chart'));

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
                    name: '使用率（%）',
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
                Monitor.getCpus(this.monitorDate).then(function (value) {
                    $this.render(value)
                });
            },
            render(result) {
                this.chart.hideLoading();

                var xAxisData = [], syssData = [], usersData = [];
                $(result).each(function () {
                    xAxisData.push(Tools.dateToHHmm(this.date));

                    var syss = 0, users = 0;
                    $(this.ifcCpus).each(function () {
                        syss += this.sys;
                        users += this.user;
                    });
                    syssData.push((syss * 100).toFixed(2));
                    usersData.push((users * 100).toFixed(2));
                });

                this.option.xAxis[0].data = xAxisData;
                this.option.series = [{
                    name: '用户', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: usersData
                }, {
                    name: '系统', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: syssData
                }];

                this.update();
            }
        }
    }
</script>