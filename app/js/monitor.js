
/**
 * CPU使用情况
 */
Monitor.CpuUsage = function (config) {
    config = $.extend({}, Monitor.config, {
        interval: 1000
    }, config);

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(config.element));

    // 指定图表的配置项和数据
    var option = {
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
            name: '利用率（%）',
            type: 'value',
            max: 100
        }],
        series: []
    };

    myChart.setOption(option);

    function fetchData() {
        Monitor.ajax(config.apiPath + 'IFCMonitorServlet?monitorDate=', function (result) {
            myChart.hideLoading();

            var syssData = [], usersData = [];
            $(result).each(function () {
                option.xAxis[0].data.push(Monitor.toHHmm(this.date));

                var syss = 0, users = 0;
                $(this.ifcCpus).each(function () {
                    syss += this.sys;
                    users += this.user;
                });
                syssData.push((syss * 100).toFixed(2));
                usersData.push((users * 100).toFixed(2));
            });

            option.series = [{
                name: '用户', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: usersData
            }, {
                name: '系统', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: syssData
            }];

            myChart.setOption(option);
        });
    }

    myChart.showLoading();
    fetchData();
};

/**
 * 内存使用情况
 */
Monitor.MemoryUsage = function (config) {
    config = $.extend({}, Monitor.config, {
        interval: 1000
    }, config);

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(config.element));

    // 指定图表的配置项和数据
    var option = {
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
            name: '容量（GB）',
            type: 'value'
        }],
        series: []
    };

    myChart.setOption(option);

    function fetchData() {
        Monitor.ajax(config.apiPath + 'IFCMonitorServlet?monitorDate=', function (result) {
            myChart.hideLoading();

            var usedData = [], freeData = [];
            $(result).each(function () {
                option.xAxis[0].data.push(Monitor.toHHmm(this.date));
                var used = (this.ifcMem.used /1024/1024/1024).toFixed(3);
                var free = (this.ifcMem.free /1024/1024/1024).toFixed(3);
                usedData.push(used);
                freeData.push(free);
                option.yAxis[0].max = (parseFloat(used) + parseFloat(free)).toFixed(0);
            });

            option.series = [{
                name: '已用', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: usedData
            }, {
                name: '可用', type: 'line', stack: '总量', areaStyle: {normal: {}}, data: freeData
            }];

            myChart.setOption(option);
        });
    }

    myChart.showLoading();
    fetchData();
};