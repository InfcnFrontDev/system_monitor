<template>
  <!--  <span class="ribbon-button-alignment pull-right" style="padding-top: 15px;">
        <span id="refresh" class="btn btn-ribbon" data-title="refresh"  rel="tooltip" data-placement="bottom" data-original-title="<i class='text-warning fa fa-warning'></i>
        警告! 这将重置您的所有窗口小部件的设置。" data-html="true"><i class="fa fa-refresh"></i></span>
    </span>-->
    <ul class="header-dropdown-list hidden-xs">
        <li>
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img alt="" src="../../app/img/skin1.png">
                <span>Themes</span>
                <i class="fa fa-angle-down"></i>
            </a>
            <ul id="echarts-theme" class="dropdown-menu pull-right">
                <li><a href="javascript:void(0);">Default</a></li>
                <li><a href="javascript:void(0);">Westeros</a></li>
                <li><a href="javascript:void(0);">Shine</a></li>
                <li><a href="javascript:void(0);">Essos</a></li>
                <li><a href="javascript:void(0);">Infographic</a></li>
                <li><a href="javascript:void(0);">Macarons</a></li>
                <li><a href="javascript:void(0);">Roma</a></li>
                <li><a href="javascript:void(0);">Vintage</a></li>
                <li><a href="javascript:void(0);">Walden</a></li>
            </ul>
        </li>
    </ul>

</template>
<style>

</style>
<script>

    export default{
        data(){
            return{

            }
        },
        ready(){
           /* $('#refresh')
                    .click(function (e) {
                        $.SmartMessageBox({
                            title: "<i class='fa fa-refresh' style='color:green'></i> Clear Local Storage",
                            content: "Would you like to RESET all your saved widgets and clear LocalStorage?",
                            buttons: '[No][Yes]'
                        }, function (ButtonPressed) {
                            if (ButtonPressed == "Yes" && localStorage) {
                                localStorage.clear();
                                location.reload();
                            }
                        });
                        e.preventDefault();
                    });*/
            $("#echarts-theme li").each(function(){
                $(this).click(function(){
                    localStorage.chartTheme = $(this).text().toLowerCase();
                    location.reload()
                });

                var chartTheme = localStorage.chartTheme || 'default';
                if(chartTheme == $(this).text().toLowerCase()){
                    $(this).addClass('active')
                }
            });

        }
    }
</script>
