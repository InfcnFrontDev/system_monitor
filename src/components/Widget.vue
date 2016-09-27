<template>
    <div id="{{id}}" class="jarviswidget"
         data-widget-editbutton="false"
         data-widget-sortable="false"
         data-widget-custombutton="true"
         data-widget-togglebutton="false"
         data-widget-deletebutton="false">
        <!-- widget options:
					usage: <div class="jarviswidget" id="wid-id-0" data-widget-editbutton="false">

					data-widget-colorbutton="false"
					data-widget-editbutton="false"
					data-widget-togglebutton="false"

					data-widget-fullscreenbutton="false"
					data-widget-custombutton="false"
					data-widget-collapsed="true"
					data-widget-sortable="false"

				-->
        <header>
            <span class="widget-icon"> <i class="fa fa-bar-chart-o"></i> </span>
            <h2>{{ title }}</h2>
            <div class="widget-toolbar">
                <!-- add: non-hidden - to disable auto hide -->
                <div class="btn-group">
                    <button class="btn dropdown-toggle btn-xs btn-success" data-toggle="dropdown">
                        {{selectedPeriod.text}}&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                    </button>
                    <ul class="dropdown-menu pull-right js-status-update">
                        <li v-for="item in periods" :class="{active: item.value == selected}">
                            <a href="javascript:void(0);" @click="selected = item.value">
                                <i class="fa fa-circle txt-color-{{item.color}}"></i> {{item.text}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <div>
            <div class="jarviswidget-editbox"></div>
            <div class="widget-body no-padding">
                <slot>
                    <div id="{{id}}_chart" class="chart no-padding"></div>
                </slot>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import Tools from '../common/tools'
    import Storage from '../common/storage'

    export default{
        props: {
            id: {type: String, default: 'myWidget'},
            title: {type: String, default: 'My Widget'},
            defaultPeriod: {type: String, default: 'realtime'}
        },
        data(){
            return {
                periods: [
                    {text: '实时监控', color: 'green', value: 'realtime'},
                    {text: '最近一小时', color: 'red', value: 'one_hour'},
                    {text: '最近一天', color: 'orange', value: 'one_day'},
                    {text: '最近一周', color: 'pink', value: 'one_week'},
                    {text: '最近一个月', color: 'blue', value: 'one_month'}
                ],
                selected: Storage.get(this.id + '_period') || this.defaultPeriod,
                option: {
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
                        type: 'value',
                        max: 100
                    }],
                    series: []
                }
            }
        },
        computed: {
            selectedPeriod: function () {
                let selected = this.selected;
                return this.periods.filter(p => p.value == selected)[0];
            }
        },
        watch: {
            selected: function (val, oldVal) {
                Storage.set(this.id + '_period', val);
                this.doChart();
            }
        },
        ready() {
            this.chart = echarts.init(document.getElementById(this.id + "_chart"), Storage.getChartTheme());
            $(window).bind('resize', this.chart.resize);

            if (this.$parent.option)
                this.option = this.$parent.option;

            this.chart.setOption(this.option);

            this.doChart();
        },
        methods: {
            doChart(){
                let period = this.selectedPeriod;
                if (period.value == 'realtime') {
                    this.realtimeMonitor();
                } else {
                    this.intervalStatistics(this.monitorDate(period.value));
                }
            },
            monitorDate: function (type) {
                switch (type) {
                    case 'one_hour':
                        break;
                    case 'one_day':
                        break;
                    case 'one_week':
                        break;
                    case 'one_month':
                        break;
                }
                let date1, date2 = new Date();
                date1 = Tools.dateAdd(date2, -60 * 60);
                return Tools.dateFormat(date1) + '-' + Tools.dateFormat(date2);
            },
            intervalStatistics(monitorDate){
                this.chart.showLoading();

                // 清除实时监控的定时器
                if (this.timer != null)
                    clearInterval(this.timer);

                this.intervalFetchData(monitorDate);
            },
            intervalFetchData(monitorDate){
                if (this.$parent.dataApi) {
                    let $this = this;
                    this.$parent.dataApi(monitorDate).then(function (value) {
                        $this.intervalRender(value)
                    });
                } else {
                    this.chart.hideLoading();
                }
            },
            intervalRender(result) {
                this.chart.hideLoading();

                if (this.$parent.getIntervalOption)
                    this.chart.setOption(this.$parent.getIntervalOption(result));
            },
            realtimeMonitor() {
                this.chart.showLoading();

                if (this.$parent.getRealtimeInitOption)
                    this.chart.setOption(this.$parent.getRealtimeInitOption());

                this.timer = setInterval(this.realtimeFetchData, 1000);
            },
            realtimeFetchData() {
                if (this.$parent.dataApi) {
                    let $this = this;
                    this.$parent.dataApi().then(function (value) {
                        $this.realtimeRender(value)
                    });
                } else {
                    this.chart.hideLoading();
                }
            },
            realtimeRender(result) {
                this.chart.hideLoading();

                if (this.$parent.getRealtimeOption)
                    this.chart.setOption(this.$parent.getRealtimeOption(this.chart.getOption(), result));
            }
        }
    }
</script>