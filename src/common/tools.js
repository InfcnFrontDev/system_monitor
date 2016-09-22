export default {
    /**
     * yyyyMMddHHmm 转 HH:mm
     */
    dateToHHmm: date=>date.substring(8, 10) + ':' + date.substring(10, 12),

    bToKB: b=>b / 1024,
    bToMB: b=>b / 1024 / 1024,
    bToGB: b=>b / 1024 / 1024 / 1024,
    bToTB: b=>b / 1024 / 1024 / 1024 / 1024,

    getChartTheme: () => window.localStorage.chartTheme || 'vintage'
}
