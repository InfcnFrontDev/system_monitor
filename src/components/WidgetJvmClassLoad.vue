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
                id: 'jvm_class_load',
                title: 'jvm类加载'
            }
        },
        ready() {
            this.$refs.chart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true
                },
                legend: {
                    top: 14,
                    data: ['已加载', '已卸载']
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }],
                yAxis: [{
                    name: '数量',
                    type: 'value'
                }],
                series: [{
                    name: '已加载', type: 'line', data: []
                }, {
                    name: '已卸载', type: 'line', data: []
                }]
            });
        },
        methods: {
            // 时间段改变时
            periodChange(monitorDate, interval, isAllDay){
                // 清除实时监控的定时器
                if (this.timer != null)
                    clearInterval(this.timer);

                this.monitorDate = monitorDate;
                this.interval = interval;
                this.isAllDay = isAllDay;
                this.intervalTime = monitorDate ? 1000 * 60 * interval : Config.realtimeIntervalTime;

                this.$refs.chart.showLoading();

                // 实时监控初始化
                if (!this.monitorDate) {
                    this.realtimeInit();
                }

                let $this = this;
                setTimeout(function () {// 解决先执行一次的问题
                    $this.fetchData();
                    $this.timer = setInterval($this.fetchData, $this.intervalTime); // 定时执行数据抓取
                }, 0);
            },
            // 抓取数据
            fetchData(){
                let $this = this;
                Monitor.getJVMClassLoading(this.monitorDate, this.interval).then(function (result) {
                    $this.fetchSuccess(result);
                }, function (error) {
                    $this.fetchError(error);
                });
            },
            // 获取数据成功时处理
            fetchSuccess(result){
                this.$refs.chart.hideLoading();

                if (this.monitorDate) {
                    if (result instanceof Array)
                        if (this.isAllDay) {
                            this.allDayRender(result);
                        } else {
                            this.intervalRender(result);
                        }
                } else {
                    if (!(result instanceof Array))
                        this.realtimeRender(result);
                }
            },
            // 获取数据出错时处理
            fetchError(error){
                this.$refs.chart.hideLoading();

                if (this.monitorDate) {
                    if (this.isAllDay) {
                        this.allDayInit();
                    } else {
                        this.realtimeInit();
                    }
                } else {
                    this.realtimeInit();
                }
            },
            // 实时监控初始化
            realtimeInit() {
                let xAxisData = [], data1 = [], data2 = [];
                xAxisData.length = Config.realtimeLen;
                data1.length = Config.realtimeLen;
                data2.length = Config.realtimeLen;

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: this.yAxisMax}],
                    series: [{data: data1}, {data: data2}]
                });
            },
            // 实时监控数据渲染
            realtimeRender(result) {
                let option = this.$refs.chart.getOption(),
                        xAxisData = option.xAxis[0].data,
                        data1 = option.series[0].data,
                        data2 = option.series[1].data,
                        yAxisMax = option.yAxis[0].max;

                let itemData = this.toItemData(result);

                let date = new Date();
                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(date, Tools.HHmmss_));

                data1.shift();
                data1.push(itemData.data1);
                data2.shift();
                data2.push(itemData.data2);

                // y轴max值最小为100，否则自动
                if (yAxisMax != 'auto' && itemData.yAxisMax > yAxisMax) {
                    yAxisMax = 'auto';
                }

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: [{data: data1}, {data: data2}]
                })
            },
            // 区间展示数据渲染
            intervalRender(result) {
                let xAxisData = [], data1 = [], data2 = [], yAxisMax = this.yAxisMax;

                let $this = this;
                $(result).each(function () {
                    let itemData = $this.toItemData(this);

                    xAxisData.push(itemData.xAxisData);
                    data1.push(itemData.data1);
                    data2.push(itemData.data2);

                    // y轴max值最小为100，否则自动
                    if (yAxisMax != 'auto' && itemData.yAxisMax > yAxisMax) {
                        yAxisMax = 'auto';
                    }
                });

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: [{data: data1}, {data: data2}]
                });
            },
            // 全天展示初始化
            allDayInit(){
                let len = 60 * 24 / this.interval,
                        xAxisData = [], data1 = [], data2 = [];

                xAxisData.length = len;
                data1.length = len;
                data2.length = len;

                for (let i = 0; i < xAxisData.length; i++) {
                    xAxisData[i] = Tools.numberToTime(i, this.interval);
                    data1[i] = '-';
                    data2[i] = '-';
                }

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: this.yAxisMax}],
                    series: [{data: data1}, {data: data2}]
                });
            },
            // 全天展示数据渲染
            allDayRender(result) {
                this.allDayInit();

                let option = this.$refs.chart.getOption(),
                        data1 = option.series[0].data,
                        data2 = option.series[1].data,
                        yAxisMax = this.yAxisMax,
                        interval = this.interval;

                let $this = this;
                $(result).each(function () {
                    let itemData = $this.toItemData(this),
                            num = Tools.timeToNumber(itemData.xAxisData, interval);

                    data1[num] = itemData.data1;
                    data2[num] = itemData.data2;

                    // y轴max值最小为100，否则自动
                    if (yAxisMax != 'auto' && itemData.yAxisMax > yAxisMax) {
                        yAxisMax = 'auto';
                    }
                });

                this.$refs.chart.setOption({
                    yAxis: [{max: yAxisMax}],
                    series: [{data: data1}, {data: data2}]
                });
            },
            // 数据转换
            toItemData(item) {
                let xAxisData = Tools.dateToHHmm(item.date), data1 = 0, data2 = 0, yAxisMax = 0,
                        obj = item.ifcJVMClassLoading;

                if (obj) {
                    data1 = obj.loadedClassCount;
                    data2 = obj.unloadedClassCount;
                    yAxisMax = data1 > data2 ? data1 : data2;
                }
                return {xAxisData, yAxisMax, data1, data2}
            }
        }
    }
</script>