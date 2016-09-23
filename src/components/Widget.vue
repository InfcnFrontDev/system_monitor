<template>
    <div class="jarviswidget"
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
                        实时监控&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                    </button>
                    <ul class="dropdown-menu pull-right js-status-update">
                        <li>
                            <a href="javascript:void(0);"><i class="fa fa-circle txt-color-green"></i> 实时监控</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);"><i class="fa fa-circle txt-color-red"></i> 最近一小时</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);"><i class="fa fa-circle txt-color-orange"></i> 最近一天</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);"><i class="fa fa-circle txt-color-pink"></i> 最近一周</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);"><i class="fa fa-circle txt-color-blue"></i> 最近一个月</a>
                        </li>
                    </ul>
                </div>
            </div>
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
            setup_widgets_desktop();
            $(".js-status-update a").click(function () {
                var selText = $(this).text();
                $this = $(this);
                $this.parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
                $this.parents('.dropdown-menu').find('li').removeClass('active');
                $this.parent().addClass('active');
            });
        }
    }
</script>