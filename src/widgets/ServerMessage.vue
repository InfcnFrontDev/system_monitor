<template>
    <widget :id="id" :title="title">
        <div class="chart no-padding">
            <table id="user" class="table table-bordered table-striped" style="clear: both">
                <tbody>
                <tr>
                    <td width="17.5%">操作系统类型：</td>
                    <td width="32.5%">{{obj.cpuEndian}}</td>
                    <td width="17.5%">内存厂商:</td>
                    <td width="32.5%">{{obj.dataModel}}</td>
                </tr>
                <tr>
                    <td>系统启动时间：</td>
                    <td></td>
                    <td>内存型号：</td>
                    <td></td>
                </tr>
                <tr>
                    <td>系统运行时长：</td>
                    <td></td>
                    <td>内存条数：</td>
                    <td></td>
                </tr>
                <tr>
                    <td>系统磁盘存储：</td>
                    <td></td>
                    <td>内存容量：</td>
                    <td></td>
                </tr>
                <tr>
                    <td>当前监控目录：</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

                <tr>
                    <td>CPU厂商：</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>CPU型号：</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>物理核数：</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

                <tr>
                    <td>逻辑核数：</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

                <tr>
                    <td>CPU缓存：</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>

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
    import Widget from '../components/Widget.vue'
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

