<template>
    <div class="btn-group">
        <button id="alternate1" class="btn dropdown-toggle btn-xs btn-success" data-toggle="dropdown">
            {{selected}}&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
        </button>
        <ul class="dropdown-menu pull-right js-status-update">
            <li v-for="item in drives" :class="{active: item.name == selected}">
                <a href="javascript:void(0);" @click="selected = item.name">
                    <i class="fa fa-circle txt-color-green"></i> {{item.name}}
                </a>
            </li>
        </ul>
    </div>
</template>
<style>
</style>
<script>
    import Monitor from '../../common/monitor.api'
    import Tools from '../../common/tools'
    import Storage from '../../common/storage'

    export default{
        data(){
            return {
                driveId: this.$parent.id + '_drive',
                drives: [],
                selected: null
            }
        },
        ready(){
            let $this = this;

            Monitor.getFileSystems().then(function (result) {
                $(result.ifcFileSystems).each(function (i) {
                    $this.drives.push({name: this.devName});
                });
                if(Storage.get($this.driveId) == '' ){
                    $this.selected = $this.drives[0].name
                }else{
                   $($this.drives).each(function(){
                       if($(this)==Storage.get($this.driveId)){
                           $this.selected = Storage.get($this.driveId)
                       }else{
                           $this.selected = $this.drives[0].name
                       }
                   })
                }
            });
        },
        watch: {
            selected: function (val, oldVal) {
                this.$dispatch('onchange', val)
                Storage.set(this.driveId, val);
            }
        }
    }
</script>
