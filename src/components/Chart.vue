<template>
    <div id="{{chartId}}" class="chart no-padding"></div>
</template>
<style>
</style>
<script>
    import Tools from '../common/tools'
    import Storage from '../common/storage'

    export default{
        data(){
            return {
                chartId: this.$parent.id + '_chart',
            }
        },
        ready(){
            this.chart = echarts.init(document.getElementById(this.chartId), Storage.getChartTheme());
            $(window).bind('resize', this.chart.resize);
        },
        methods: {
            getOption(){
                return this.chart.getOption();
            },
            setOption(option){
                this.chart.setOption(option);
            },
            showLoading(){
                this.chart.showLoading();
            },
            hideLoading(){
                this.chart.hideLoading();
            }
        }
    }
</script>
