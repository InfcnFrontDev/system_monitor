<template>
    <div class="btn-group smart-form">
        <label class="input"><span class="rili-line">|</span> <i class="icon-append fa fa-calendar rili"></i>
            <input id="{{dateId}}" type="text" value="{{selected}}" style="margin-top: 2px;width:178px;">
        </label>
    </div>
</template>
<style>
</style>
<script>
    import Tools from '../common/tools'

    export default{
        data(){
            return {
                dateId: this.$parent.id + '_date',
                selected: null
            }
        },
        watch: {
            selected: function (val, oldVal) {
                this.$dispatch('onchange', val)
                //Storage.set(this.id + '_period', val);
            }
        },
        ready(){
            let $this = this;

            this.selected = Tools.dateFormat(new Date(), 'yyyy-MM-dd');

            $('#' + this.dateId).datepicker({
                dateFormat: 'yy-mm-dd',
                prevText: '<i class="fa fa-chevron-left"></i>',
                nextText: '<i class="fa fa-chevron-right"></i>',
                maxDate: "+0D",
                onSelect: function (selectedDate) {
                    $this.selected = selectedDate;
                }
            });
        }
    }
</script>
