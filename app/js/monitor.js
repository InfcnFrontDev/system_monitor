var Monitor = {};

/**
 * config
 */
Monitor.config = {
    apiPath: 'http://192.168.10.102:8080/ifcmonitor/',
    interval: 3000,
    legend: false
};

/**
 * ajax
 */
Monitor.ajax = function (url, success, error) {
    $.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            success && success(data, textStatus, jqXHR);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            error && error(XMLHttpRequest, textStatus, errorThrown);
        }
    });
};

/**
 * ajax
 */
Monitor.toHHmm = function (date) {
    return date.substring(8, 10) + ':' + date.substring(10, 12);
};

/**
 * 存储使用情况
 */
Monitor.StorageUsage = function (config) {
    config = $.extend({}, Monitor.config, {}, config);

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(config.element));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        series: [
            {
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '75%'],
                data: []
            }
        ]
    };
    myChart.setOption(option);

    function fetchData() {
        Monitor.ajax(config.apiPath + 'IFCMonitorServlet?type=fs', function (result) {
            myChart.hideLoading();
            console.log('StorageUsage', result)
            option.series[0].data = mapData(result);
            myChart.setOption(option);
        });
    }

    function mapData(result) {

        var useds = 0, frees = 0;
        $(result.ifcFileSystems).each(function () {
            useds += this.used;
            frees += this.free;
        });

        return [
            {value: useds, name: '已用存储'},
            {value: frees, name: '可用存储', selected: true}
        ];
    }

    myChart.showLoading();
    fetchData();
    //setInterval(fetchData, config.interval); //指定n秒刷新一次
};

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