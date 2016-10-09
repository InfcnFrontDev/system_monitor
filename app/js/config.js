/**
 * Configuration
 */

var Config = {
    servers: [
        {name: '192.168.10.101', apiPath: 'http://192.168.10.106:8080/ifcmonitor/'},
        {name: '192.168.10.102', apiPath: 'http://192.168.10.102:8080/ifcmonitor/'},
        {name: '192.168.10.103', apiPath: 'http://192.168.10.102:8080/ifcmonitor/'},
        {name: '192.168.10.104', apiPath: 'http://192.168.10.102:8080/ifcmonitor/'},
        {name: '192.168.10.105', apiPath: 'http://192.168.10.102:8080/ifcmonitor/'}
    ],

    realtimeLen: 60,

    realtimeIntervalTime: 1000, // 实时刷新间隔时间（ms）
    hourInterval: 1, // 一小时区间中每几分钟一个点
    dayInterval: 5   // 一天区间中每几分钟一个点

};
