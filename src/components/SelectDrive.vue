<template>
    <div class="btn-group">
        <button id="alternate1" class="btn dropdown-toggle btn-xs btn-success" data-toggle="dropdown">
            {{selectedText}}&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
        </button>
        <ul class="dropdown-menu pull-right js-status-update">
            <li v-for="item in drives" :class="{active: item.name == selected}">
                <a href="javascript:void(0);" @click="selected = item.name" title="{{item.name}}">
                    <i class="fa fa-circle txt-color-green"></i> {{item.text}}
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
                selectedText: null
            }
        },
        ready(){
            let $this = this;

            Monitor.getFileSystems().then(function (result) {
                $(result.ifcFileSystems).each(function (i) {
                    let name = this.devName, text = name;
                    if(text.length > 20){
                        text = text.substring(0,20) + '...';
                    }
                    $this.drives.push({name, text});
                });

                //$this.selected = Storage.get($this.driveId) && $this.drives.includes(Storage.get($this.driveId))
                //        ? Storage.get($this.driveId) : $this.drives[0].name;

                $this.selected = $this.drives[0].name;
                $this.selectedText = $this.drives[0].text;
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
