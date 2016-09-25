<template>
    <div id="{{id}}" class="jarviswidget"
         data-widget-editbutton="false"
         data-widget-sortable="false"
         data-widget-custombutton="false"
         data-widget-togglebutton="false"
         data-widget-deletebutton="false">
        <header>
            <span class="widget-icon"> <i class="fa fa-bar-chart-o"></i> </span>
            <h2>{{ title }}</h2>
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

</style>
<script>
    import Tools from '../common/tools'

    export default{
        props: {
            id: {type: String, default: 'myWidgetBase'},
            title: {type: String, default: 'My Widget Base'}
        },
        data(){
            return {}
        },
        ready() {
            setup_widgets_desktop();
        },
        methods: {}
    }
</script>