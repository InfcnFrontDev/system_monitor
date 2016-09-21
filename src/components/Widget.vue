<template>
    <div class="jarviswidget"
         data-widget-editbutton="false"
         data-widget-sortable="false"
         data-widget-custombutton="true">
        <!-- widget options:
					usage: <div class="jarviswidget" id="wid-id-0" data-widget-editbutton="false">

					data-widget-colorbutton="false"
					data-widget-editbutton="false"
					data-widget-togglebutton="false"
					data-widget-deletebutton="false"
					data-widget-fullscreenbutton="false"
					data-widget-custombutton="false"
					data-widget-collapsed="true"
					data-widget-sortable="false"

				-->
        <header>
            <span class="widget-icon"> <i class="fa fa-bar-chart-o"></i> </span>
            <h2>{{ title }}</h2>
        </header>

        <div>
            <div class="jarviswidget-editbox"></div>
            <div class="widget-body no-padding">

                <slot>
                    <div id="area-graph" class="chart no-padding"></div>
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
            title: {type: String, default: 'My Widget'}
        },
        ready() {
        }
    }
</script>