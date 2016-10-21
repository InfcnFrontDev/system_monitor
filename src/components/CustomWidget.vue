<template>
    <widget :id="dataOptions.id" :title="dataOptions.title">
        <div slot="toolbar" class="widget-toolbar" v-if="options.toolbox">
            <date-select v-if="options.toolbox.dateSelect" @onchange="dateChange"></date-select>
        </div>
        <chart v-if="options.chart" v-ref:chart></chart>
        <property v-if="options.property" v-ref:property></property>
    </widget>
</template>
<style>
</style>
<script>
    import Widget from '../components/Widget.vue'
    import DateSelect from '../components/DateSelect.vue'
    import Chart from '../components/Chart.vue'
    import Property from '../components/Property.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'


    export default{
        components: {
            Widget, DateSelect, Chart, Property
        },
        props: {
            dataOptions: {type: Object}
        },
        data(){
            return {
                options: {
                    id: 'default_widget_id',
                    title: 'default_widget_title',
                    toolbox: {
                        dateSelect: {}
                    },
                    chart: {},
                    property: {}
                }
            }
        },
        ready(){
            // 默认
            this.options.property = false;

            // 合并
            Object.assign(this.options, this.dataOptions);

            console.log(this.options);

            // 优先使用dataOptions中的id、title
            //this.interval = this.dataOptions.interval || 5;

            // 初始状态
            //this.$refs.chart.setOption(this.dataOptions.chartOption);
        },
        methods: {
            // 选择的日期发生改变时
            dateChange(date){
                this.date = date;

                // 清除实时监控的定时器
                if (this.timer != null)
                    clearInterval(this.timer);

                this.$refs.chart.showLoading();

                let $this = this;
                setTimeout(function () {// 解决先执行一次的问题
                    $this.fecthData();
                    $this.timer = setInterval($this.fecthData, $this.dataOptions.timerInterval);
                }, 0);
            },
            fecthData(){
                let $this = this;
                this.dataOptions.dataApi(this.date).then(function (result) {
                    $this.render(result);
                }, function (error) {
                    console.error(error);
                    $this.render();
                });
            },
            // 日期统计
            render(result){
                this.$refs.chart.hideLoading();

                let data = this.dataOptions.resultMap(result),
                        seriesLen = data[0].length - 1,
                        legendData = data[0].filter(d => d != '-'),
                        xAxisData = data.map(d => d[0]).filter(d => d != '-'),
                        yAxisMax = 'auto',
                        series = new Array(seriesLen);

                for (let i = 0; i < series.length; i++) {
                    let serieData = data.map(d => d[i + 1]).filter((d, i) => i > 0);
                    series[i] = {
                        name: legendData[i],
                        type: 'line',
                        data: serieData,
                        markPoint: {
                            data: [{type: 'max', name: '最大值'}]
                        }
                    };
                }

                this.$refs.chart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params, ticket, callback) {
                            return Tools.formatter(params, '%');
                        }
                    },
                    grid: {
                        top: '15%', left: '5%', right: '5%', bottom: '5%',
                        containLabel: true
                    },
                    legend: {
                        top: 14,
                        data: legendData
                    },
                    xAxis: [{
                        type: 'category',
                        data: xAxisData
                    }],
                    yAxis: [{
                        name: '使用率（%）',
                        type: 'value',
                        max: yAxisMax
                    }],
                    series: series
                });
            }
        }
    }
</script>