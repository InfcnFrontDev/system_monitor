/**
 * Created by Administrator on 2016/10/17.
 */

// 图表
var DefaultWidget = {
    id: 'cup_usage1',
    title: '服务器高负载日分布情况',
    toolbox: {
        dateselect: true,
        periodselected: true
    },
    content: {
        type: 'chart',
        option: {
            type: 'line',
            yAxisName: '使用率（%）',
            yAxisMax: 100,
            tooltipSuffix: '%'
        },
        dataMap: function (data) {
            return data;
        }
    },
    content: {
        type: 'table',
        dataMap: function (data) {
            return data;
        }
    }
};

// 布局
var MonitorConfig = [
    {
        name: '运行状态统计',
        rows: [{
            cols: [{
                width: 8,
                widgets: [{
                    id: 'cup_usage1',
                    type: 'line',
                    url: '#url1'
                }]
            }, {
                width: 4,
                widgets: [{
                    id: 'cup_usage1',
                    type: 'line',
                    url: '#url1'
                }]
            }]
        }, {
            cols: [{
                width: 12,
                widgets: []
            }]
        }]
    },
    {
        name: '操作系统',
        rows: [{
            cols: [{
                width: 12,
                widgets: []
            }]
        }]
    },
    {
        name: 'JVM',
        rows: [{
            cols: [{
                width: 12,
                widgets: []
            }]
        }]
    },
    {
        name: '网络',
        rows: [{
            cols: [{
                width: 12,
                widgets: []
            }]
        }]
    }
];