<template>
    <widget :id="id" :title="title">
        <div class="chart no-padding">
            <div class="tbd a1">
                <div>操作系统类型：</div>
                <div class="jvm-td-color">{{obj.cpuEndian}}</div>
            </div>
            <div class="tbd a2">
                <div>内存厂商：</div>
                <div class="jvm-td-color">{{obj.dataModel}}</div>
            </div>
            <div class="tbd a3">
                <div>系统启动时间：</div>
                <div class="jvm-td-color">{{}}</div>
            </div>
            <div class="tbd a4">
                <div>内存型号：</div>
                <div class="jvm-td-color">{{}}</div>
            </div>
            <div class="tbd a5">
                <div>系统运行时长：</div>
                <div class="jvm-td-color">{{}}</div>
            </div>
            <div class="tbd a6">
                <div>内存条数：</div>
                <div class="jvm-td-color">{{}}</div>
            </div>
            <div class="tbd a7">
                <div>系统磁盘存储：</div>
                <div class="jvm-td-color">{{}}</div>
            </div>
            <div class="tbd a8">
                <div>内存容量：</div>
                <div class="jvm-td-color">{{}}</div>
            </div>
            <div class="tbd a9">
                <div>当前监控目录：</div>
                <div class="jvm-td-color">{{}}</div>
            </div>
            <div class="tbd a10">
                <div>CPU厂商：</div>
                <div class="jvm-td-color">{{}}</div>
            </div>
            <div class="tbd a11">
                <div>CPU型号：</div>
                <div class="jvm-td-color">{{}}</div>
            </div>
            <div class="tbd a12">
                <div>物理核数：</div>
                <div class="jvm-td-color">{{}}</div>
            </div>
            <div class="tbd a13">
                <div>逻辑核数：</div>
                <div class="jvm-td-color">{{}}</div>
            </div>
            <div class="tbd a14">
                <div>CPU缓存：</div>
                <div class="jvm-td-color">{{}}</div>
            </div>
            <div class="tbd a15">
                <div></div>
                <div></div>
            </div>

        </div>
    </widget>
</template>
<style>
    #server-msg-ul {
        list-style: none;
        line-height: 29px;
    }
</style>
<script>
    import Widget from './Widget.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            Widget
        },
        data(){
            return {
                id: 'server_message',
                title: '概要信息',
                obj: {}
            }
        },
        ready() {
            let $this = this;
            Monitor.getOperatingSystem().then(function (result) {
                $this.obj = result.ifcOperatingSystem;
            });
        }
    }
</script>

