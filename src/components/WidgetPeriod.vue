<template>
    <widget :id="id" :title="title">
        <div slot="toolbar" class="widget-toolbar">
            <select-period @onrealtime="realtime" @onlast="last" @onallday="allday"></select-period>
        </div>
        <chart v-ref:chart></chart>
    </widget>
</template>
<style>
</style>
<script>
    import Widget from '../components/Widget.vue';
    import SelectPeriod from '../components/SelectPeriod.vue'
    import Chart from '../components/Chart.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            Widget, SelectPeriod, Chart
        },
        props: {
            id: {type: String},
            title: {type: String}
        },
        ready() {
            let option = this.$parent.getInitOption();
            this.$refs.chart.setOption(option);

            // yAxis max
            this.yAxisMax = option.yAxis[0].max;

            // series length
            this.seriesLen = option.series.length;
        },
        methods: {
            // 实时监控
            realtime(){
                // 清除实时监控的定时器
                if (this.timer != null)
                    clearInterval(this.timer);

                this.$refs.chart.showLoading();

                this.realtimeInit();

                let $this = this;
                setTimeout(function () {// 解决先执行一次的问题
                    $this.fetchRealtimeData();
                    $this.timer = setInterval($this.fetchRealtimeData, Config.realtimeIntervalTime); // 定时执行数据抓取
                }, 0);
            },
            // 最近一段时间
            last(time, interval){
                // 清除实时监控的定时器
                if (this.timer != null)
                    clearInterval(this.timer);

                this.time = time;
                this.interval = interval;

                this.$refs.chart.showLoading();

                let $this = this;
                setTimeout(function () {// 解决先执行一次的问题
                    $this.fetchLastData();
                    $this.timer = setInterval($this.fetchLastData, 1000 * 60 * interval); // 定时执行数据抓取
                }, 0);

            },
            // 指定日期
            allday(date, interval){
                // 清除实时监控的定时器
                if (this.timer != null)
                    clearInterval(this.timer);

                this.date = date;
                this.interval = interval;

                this.$refs.chart.showLoading();

                let $this = this;
                setTimeout(function () {// 解决先执行一次的问题
                    $this.fetchAlldayData();
                    $this.timer = setInterval($this.fetchAlldayData, 1000 * 60 * interval); // 定时执行数据抓取
                }, 0);

            },
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
            fetchRealtimeData(){
                let $this = this;
                this.$parent.getDataApi()().then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.realtimeRender(result);
                }, function (error) {
                    $this.$refs.chart.hideLoading();
                    $this.realtimeInit();
                });
            },
            // 抓取数据
            fetchLastData(){
                let date2 = new Date(),
                        date1 = Tools.dateAdd(date2, -(this.time)),
                        monitorDate = Tools.dateFormat(date1) + '-' + Tools.dateFormat(date2);

                let $this = this;
                this.$parent.getDataApi()(monitorDate, this.interval).then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.intervalRender(result);
                }, function (error) {
                    $this.$refs.chart.hideLoading();
                    $this.realtimeInit();
                });
            },
            // 抓取数据
            fetchAlldayData(){
                let date = this.date.replace(/-/g, ''),
                        monitorDate = date + '0000-' + date + '2359';

                let $this = this;
                this.$parent.getDataApi()(monitorDate, this.interval).then(function (result) {
                    $this.$refs.chart.hideLoading();
                    $this.allDayRender(result);
                }, function (error) {
                    $this.$refs.chart.hideLoading();
                    $this.allDayInit();
                });
            },
            // 实时监控初始化
            realtimeInit() {
                let xAxisData = new Array(Config.realtimeLen), yAxisMax = this.yAxisMax,
                        series = new Array(this.seriesLen);

                series.fill({data: new Array(Config.realtimeLen)});

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: series
                });
            },
            // 实时监控数据渲染
            realtimeRender(result) {
                let option = this.$refs.chart.getOption(),
                        xAxisData = option.xAxis[0].data,
                        series = option.series,
                        yAxisMax = option.yAxis[0].max;

                let itemData = this.toItemData(result);

                xAxisData.shift();
                xAxisData.push(Tools.dateFormat(new Date(), Tools.HHmmss_));

                for (let i in itemData.seriesData) {
                    series[i].data.shift();
                    series[i].data.push(itemData.seriesData[i]);
                }

                // y轴max值最小为100，否则自动
                if (yAxisMax != undefined && yAxisMax != 'auto' && itemData.yAxisMax > yAxisMax) {
                    yAxisMax = 'auto';
                }

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: series
                })
            },
            // 区间展示数据渲染
            intervalRender(result) {
                let xAxisData = [], yAxisMax = this.yAxisMax, series = new Array(this.seriesLen);

                for (let i = 0; i < series.length; i++) {
                    series[i] = {data: []};
                }

                let $this = this;
                result.forEach((item, i) => {
                    let itemData = $this.toItemData(item);

                    xAxisData[i] = itemData.xAxisData;
                    itemData.seriesData.forEach((data, j) => {
                        series[j].data[i] = data;
                    });

                    // y轴max值最小为100，否则自动
                    if (yAxisMax != undefined && yAxisMax != 'auto' && itemData.yAxisMax > yAxisMax) {
                        yAxisMax = 'auto';
                    }
                });

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: series
                });
            },
            // 全天展示初始化
            allDayInit(){
                let len = 60 * 24 / this.interval,
                        xAxisData = new Array(len), yAxisMax = this.yAxisMax,
                        series = new Array(this.seriesLen);

                for (let i = 0; i < series.length; i++) {
                    series[i] = {data: []};
                }

                for (let i = 0; i < xAxisData.length; i++) {
                    xAxisData[i] = Tools.numberToTime(i, this.interval);
                    for (let j = 0; j < series.length; j++) {
                        series[j].data[i] = '-';
                    }
                }

                this.$refs.chart.setOption({
                    xAxis: [{data: xAxisData}],
                    yAxis: [{max: yAxisMax}],
                    series: series
                });
            },
            // 全天展示数据渲染
            allDayRender(result) {
                this.allDayInit();

                let option = this.$refs.chart.getOption(),
                        yAxisMax = this.yAxisMax,
                        series = option.series,
                        interval = this.interval;

                let $this = this;
                result.forEach((item) => {
                    let itemData = $this.toItemData(item),
                            num = Tools.timeToNumber(itemData.xAxisData, interval);

                    itemData.seriesData.forEach((data, j) => {
                        series[j].data[num] = data;
                    });

                    // y轴max值最小为100，否则自动
                    if (yAxisMax != undefined && yAxisMax != 'auto' && itemData.yAxisMax > yAxisMax) {
                        yAxisMax = 'auto';
                    }
                });

                this.$refs.chart.setOption({
                    yAxis: [{max: yAxisMax}],
                    series: series
                });
            },
            // 数据转换
            toItemData(item) {
                let itemData = this.$parent.toItemData(item, this.interval);
                return itemData;
            }
        }
    }
</script>