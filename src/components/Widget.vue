<template>
    <div id="{{id}}" class="jarviswidget"
         data-widget-colorbutton="false"
         data-widget-editbutton="false"
         data-widget-sortable="false"
         data-widget-custombutton="true"
         data-widget-togglebutton="false"
         data-widget-deletebutton="false">
        <!-- widget options:
					usage: <div class="jarviswidget" id="wid-id-0" data-widget-editbutton="false">

					data-widget-colorbutton="false"
					data-widget-editbutton="false"
					data-widget-togglebutton="false"

					data-widget-fullscreenbutton="false"
					data-widget-custombutton="false"
					data-widget-collapsed="true"
					data-widget-sortable="false"

				-->
        <header>
            <span class="widget-icon"> <i class="fa fa-bar-chart-o"></i> </span>
            <h2>{{ title }}</h2>
            <div class="widget-toolbar">
                <!-- add: non-hidden - to disable auto hide -->

                <div class="btn-group">
                    <button class="btn dropdown-toggle btn-xs btn-success" data-toggle="dropdown">
                        {{selectedPeriod.text}}&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                    </button>
                    <ul class="dropdown-menu pull-right js-status-update">
                        <li v-for="item in periods" :class="{active: item.value == selectedPeriod.value}">
                            <a href="javascript:void(0);" @click="selectPeriod(item)">
                                <i class="fa fa-circle txt-color-{{item.color}}"></i> {{item.text}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>

        <div>
            <div class="jarviswidget-editbox"></div>
            <div class="widget-body no-padding">

                <slot>
                    <div id="{{id}}_chart" class="chart no-padding"></div>
                </slot>

            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default{
        props: {
            id: {type: String, default: 'myWidget'},
            title: {type: String, default: 'My Widget'}
        },
        data(){
            let periods = [
                {text: '实时监控', color: 'green', value: 'real_time'},
                {text: '最近一小时', color: 'red', value: 'one_hour'},
                {text: '最近一天', color: 'orange', value: 'one_day'},
                {text: '最近一周', color: 'pink', value: 'one_week'},
                {text: '最近一个月', color: 'blue', value: 'one_month'}
            ];
            return {
                periods,
                selectedPeriod: periods[0],
                monitorDate: '201609231200-201609231259'
            }
        },
        ready() {
            var $this = this;

            setup_widgets_desktop();
        },
        methods: {
            selectPeriod(period){
                this.selectedPeriod = period;
                this.$dispatch('period-changed', period);
            }
        }
    }
</script>