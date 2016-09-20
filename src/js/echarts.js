var ECharts = {};

var $ajax = function (url, success, error) {

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

// Line
ECharts.Line = function (options) {

    options = $.extend({
        element: 'id'
    }, options);

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(options.element));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
            top: '15%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {normal: {}},
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    return myChart;
}

// Bar
ECharts.Bar = function (options) {

    options = $.extend({
        element: 'id',
        dataUrl: '/api/bardata',
        legend: false
    }, options);

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(options.element));

    // 指定图表的配置项和数据
    var op = {
        tooltip: {},
        legend: {
            show: options.legend,
            data: []
        },
        grid: {top: options.legend?'15%':'3%', left: '3%', right: '3%', bottom: '3%', containLabel: true},
        xAxis: {
            data: []
        },
        yAxis: {},
        series: []
    };

    myChart.setOption(op);

    function fetchData(cb) {
        $ajax('/api/bardata', function (data) {
            cb(data);
        });
    }
    function render(data) {
        op.xAxis.data = data.category;
        op.series = data.series;
        for(var i in op.series){
            op.series[i].type = 'bar';
            op.legend.data.push(op.series[i].name);
        }
        myChart.setOption(op);
    }

    myChart.showLoading();

    fetchData(function (data) {
        myChart.hideLoading();
        render(data);
    });

    return myChart;
}