var ECharts = {};

ECharts.ajax = function (url, success, error) {
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

ECharts.baseConfig = {
    element: 'id',
    dataUrl: '/api/bardata',
    dataMap: function (data) {
        return data;
    },
    interval: 3000,
    legend: false
};

// Line
ECharts.Line = function (config) {

    config = $.extend({}, ECharts.baseConfig, {}, config);

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(config.element));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {},
        legend: {
            show: config.legend,
            data: []
        },
        grid: {top: (config.legend ? '15%' : '3%'), left: '3%', right: '3%', bottom: '3%', containLabel: true},
        xAxis: {
            data: []
        },
        yAxis: {},
        series: []
    };


    myChart.setOption(option);

    function fetchData() {
        ECharts.ajax('/api/bardata', function (data) {
            myChart.hideLoading();
            render(config.dataMap(data));
        });
    }

    function render(data) {
        option.xAxis.data = data.category;
        option.series = data.series;
        for (var i in option.series) {
            option.series[i].type = 'line';
            option.legend.data.push(option.series[i].name);
        }
        myChart.setOption(option);
    }

    myChart.showLoading();
    fetchData();
    setInterval(fetchData, config.interval); //指定n秒刷新一次

    return myChart;
}

// Bar
ECharts.Bar = function (config) {

    config = $.extend({}, ECharts.baseConfig, {}, config);

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(config.element));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {},
        legend: {
            show: config.legend,
            data: []
        },
        grid: {top: (config.legend ? '15%' : '3%'), left: '3%', right: '3%', bottom: '3%', containLabel: true},
        xAxis: {
            data: []
        },
        yAxis: {},
        series: []
    };

    myChart.setOption(option);

    function fetchData() {
        ECharts.ajax('/api/bardata', function (data) {
            myChart.hideLoading();
            render(config.dataMap(data));
        });
    }

    function render(data) {
        option.xAxis.data = data.category;
        option.series = data.series;
        for (var i in option.series) {
            option.series[i].type = 'bar';
            option.legend.data.push(option.series[i].name);
        }
        myChart.setOption(option);
    }

    myChart.showLoading();
    fetchData();
    setInterval(fetchData, config.interval); //指定n秒刷新一次

    return myChart;
}