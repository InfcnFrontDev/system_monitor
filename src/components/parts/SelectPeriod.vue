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
    <div class="btn-group">
        <label class="btn btn-xs" style="padding:0px;margin-top:-3px;">
            <i class="icon-append fa fa-calendar rili" style="right: 7px;top: 6px;"></i>
            <input id="{{periodId}}_date" type="text" class="datepicker" class="hasDatepicker valid"
                   value="{{selected}}"
                   style="margin-top: 0px;width:24px;height:22px !important;font-size:0;padding:0;">
        </label>
    </div>
</template>
<style>
</style>
<script>
    import Tools from '../../common/tools'
    import Storage from '../../common/storage'

    export default{
        data(){
            return {
                periodId: this.$parent.id + '_period',
                periods: [
                    {text: '实时监控', color: 'green', value: 'realtime'},
                    {text: '最近一小时', color: 'red', value: 'one_hour'},
                    {text: '最近一天', color: 'orange', value: 'one_day'}
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
                showOptions: {direction: "left"},
                prevText: '<i class="fa fa-chevron-left"></i>',
                nextText: '<i class="fa fa-chevron-right"></i>',
                beforeShow: function (input, inst) {
                    //inst.dpDiv.css({'font-size': '15px'});

                    $.datepicker._pos = $.datepicker._findPos(input); //this is the default position
                    $.datepicker._pos[0] = $.datepicker._pos[0] - 198; //left
                    $.datepicker._pos[1] = $.datepicker._pos[1] + 24; //top
                },
                onSelect: function (selectedDate) {
                    $this.selected = selectedDate;
                }
            });
        },
        watch: {
            selected: function (val, oldVal) {
                Storage.set(this.periodId, val);

                let date1, date2 = new Date(), monitorDate, interval;
                switch (val) {
                    case '实时监控':
                        break;
                    case '最近一小时':
                        date1 = Tools.dateAdd(date2, -60 * 60);
                        monitorDate = Tools.dateFormat(date1) + '-' + Tools.dateFormat(date2);
                        interval = 1;
                        break;
                    case '最近一天':
                        date1 = Tools.dateAdd(date2, -60 * 60 * 24);
                        monitorDate = Tools.dateFormat(date1) + '-' + Tools.dateFormat(date2);
                        interval = 5;
                        break;
                    default:
                        let date = val.replace(/-/g, '');
                        monitorDate = date + '0000-' + date + '2359';
                        interval = 5;
                        break;
                }

                this.$dispatch('onchange', monitorDate, interval)
            }
        }
    }
</script>
