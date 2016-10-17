<template>
    <div id="{{id}}" class="jarviswidget"
         data-widget-editbutton="false"
         data-widget-sortable="false"
         data-widget-togglebutton="false"
         data-widget-deletebutton="false">
        <header>
            <span class="widget-icon"> <i class="fa fa-bar-chart-o"></i> </span>
            <h2>{{ title }}</h2>
            <slot name="toolbar"></slot>
        </header>
        <div>
            <div class="jarviswidget-editbox"></div>
            <div class="widget-body no-padding">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<style>
    #jarviswidget-fullscreen-mode .widget-body, #jarviswidget-fullscreen-mode .chart {
        height: 100%;
    }
    .chart td{
        padding-left:5px !important;
        padding-right: 0 !important;
    }
</style>
<script>
    import Tools from '../common/tools'
    import Storage from '../common/storage'

    export default{
        props: {
            id: {type: String, default: 'myWidget'},
            title: {type: String, default: 'My Widget'}
        },
        ready() {
            setup_widgets_desktop();
        },
        methods: {}
    }
</script>