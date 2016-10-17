<template>
    <div class="btn-group">
        <button id="alternate1" class="btn dropdown-toggle btn-xs btn-success" data-toggle="dropdown">
            {{selected}}&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
        </button>
        <ul class="dropdown-menu pull-right js-status-update">
            <li v-for="item in periods" :class="{active: item.text == selected}">
                <a href="javascript:void(0);" @click="selected = item.text">
                    <i class="fa fa-circle txt-color-{{item.color}}"></i> {{item.text}}
                </a>
            </li>
        </ul>
    </div>

    <div class="btn-group smart-form">
        <label class="input"><span class="rili-line"></span> <i class="icon-append fa fa-calendar rili" style="top:0px !important;right: 1px;"></i>
            <input id="{{periodId}}_date" type="text" value="{{selected}}" style="margin-top: 0px;width:24px;height:22px !important;font-size:0;padding:0;">
        </label>
    </div>

</template>
<style>
</style>
<script>
    import Tools from '../common/tools'
    import Storage from '../common/storage'

    export default{
        data(){
            return {
                periodId: this.$parent.id + '_period',
                periods: [
                    {text: '实时监控', color: 'green' },
                    {text: '最近一小时', color: 'red' },
                    {text: '最近一天', color: 'orange' }
                ],
                selected: null
            }
        },
        computed: {
            selectedPeriod: function () {
                let selected = this.selected;
                return this.periods.filter(p => p.value == selected)[0];
            }
        },
        ready(){
            let $this = this;

            this.selected = Storage.get(this.periodId) || '实时监控';

            $('#' + this.periodId + '_date').datepicker({
                dateFormat: 'yy-mm-dd',
                prevText: '<i class="fa fa-chevron-left"></i>',
                nextText: '<i class="fa fa-chevron-right"></i>',
                maxDate: "+0D",
                beforeShow: function (input, inst) {
                    $.datepicker._pos = $.datepicker._findPos(input); //this is the default position
                    $.datepicker._pos[0] = $.datepicker._pos[0] - 198; //left
                    $.datepicker._pos[1] = $.datepicker._pos[1] + 24; //top
                },
                onSelect: function (selectedDate) {
                    $this.selected = selectedDate;
                }
            });

            // 隐藏底部日历边框
            $('#ui-datepicker-div').hide();
        },
        watch: {
            selected: function (val, oldVal) {
                Storage.set(this.periodId, val);

                switch (val) {
                    case '实时监控':
                        this.$dispatch('onrealtime');
                        break;
                    case '最近一小时':
                        this.$dispatch('onlast', 60 * 60, Config.hourInterval);
                        break;
                    case '最近一天':
                        this.$dispatch('onlast', 60 * 60 * 24, Config.hourInterval);
                        break;
                    default:
                        this.$dispatch('onallday', val, Config.hourInterval);
                        break;
                }
            }
        }
    }
</script>
