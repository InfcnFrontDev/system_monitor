<template>
    <div class="btn-group">
        <button id="alternate1" title="{{title1}}" class="btn dropdown-toggle btn-xs btn-success" data-toggle="dropdown" style="max-width: 120px;">
            {{selected}}&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
        </button>
        <ul class="dropdown-menu pull-right js-status-update">
            <li v-for="item in drives" :class="{active: item.name == selected}">
                <a href="javascript:void(0);" @click="selected = title1 = item.name">
                    <i class="fa fa-circle txt-color-green"></i> {{item.name}}
                </a>
            </li>
        </ul>
    </div>
</template>
<style>
</style>
<script>
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'
    import Storage from '../common/storage'

    export default{
        data(){
            return {
                driveId: this.$parent.id + '_drive',
                drives: [],
                selected: null,
                title1:null
            }
        },
        ready(){
            let $this = this;

            Monitor.getFileSystems().then(function (result) {
                $(result.ifcFileSystems).each(function (i) {
                    $this.drives.push({name: this.devName});
                });

                //$this.selected = Storage.get($this.driveId) && $this.drives.includes(Storage.get($this.driveId))

                //        ? Storage.get($this.driveId) : $this.drives[0].name;
                var str= $this.drives[0].name;//原始字符串
                $this.title1 = str;
                var  s="";
                if(str.length>10){
                    s=str.substring(0,10)+"...";
                }else{
                    s=str;
                }
                $this.selected = s;
            });

        },
        watch: {
            selected: function (val, oldVal) {
                var str1=val;
                var  s1="";
                if(str1.length>10){
                    var x= str1.substring(0,10);
                    s1=x+"...";
                }else{
                    s1=str1;
                }
                this.selected = s1;

                this.$dispatch('onchange', str1)
                Storage.set(this.driveId, str1);
            }
        }
    }
</script>
