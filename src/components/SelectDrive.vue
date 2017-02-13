<template>
    <div class="btn-group">
        <button id="alternate1" title={{title}} class="btn dropdown-toggle btn-xs btn-success" data-toggle="dropdown" style="max-width: 120px;">
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
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'
    import Storage from '../common/storage'

    export default{
        data(){
            return {
                driveId: this.$parent.id + '_drive',
                drives: [],
                selected: null,
                title:null
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
                $this.title=$this.drives[0].name;
                let  str= $this.drives[0].name;//原始字符串
                let  s="";
                if(str.length>10){
                    s=str.substring(0,10)+"...";
                }
                $this.selected = s;
            });
        },
        watch: {
            selected: function (val, oldVal) {
                let str1=val;
                let str2=oldVal;
                let  s1="";
                if(str1.length>10){
                    this.title=str2;
                    let x= str1.substring(0,10);
                    s1=x+"...";

                }else{
                    s1=str1;
                    this.title=s1;

                }
                this.selected = s1;
                this.$dispatch('onchange', str1)
                Storage.set(this.driveId, str1);
            }
        }
    }
</script>
