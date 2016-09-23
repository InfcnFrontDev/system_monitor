<template>
    <widget title="jvm摘要">
        <div class="jvm-msg-box">
            <ul id="jvm-msg-ul">

            </ul>
        </div>
    </widget>
</template>
<style>

</style>
<script>
    import Widget from './Widget.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            Widget
        },
        ready() {
            this.fetchData()
        },
        methods: {

            fetchData() {
                let $this = this;
                Monitor. getJVMRuntime().then(function (value) {
                    $this.render(value)
                });
            },
            render(result) {
                var spacname=0;
                var vmname=0;
                var specvendor=0;
                var vmversion=0;
                var bootclasspath=0;
                var uptime=0;
                $(result.ifcJVMRuntime).each(function () {
                    vmname = this.vmName;
                    spacname=this.specName
                    specvendor = this.specVendor;
                    vmversion = this.vmVersion;
                    bootclasspath=this.bootClassPath;
                    uptime=this.uptime
                   var html="<li>PID:<span>"+vmname+"</span></li><li>JAVA虚拟机名称:<span >"+vmname+"</span></li><li>JAVA虚拟机厂商:<span>"+specvendor+"</span></li><li>JAVA虚拟机版本：<span>"+spacname+"</span></li><li>JAVA版本：<span>"+vmversion+"</span></li><li>JAVA Home目录：<span>"+bootclasspath+"</span></li><li>虚拟机启动时间：<span>"+uptime+"</span></li><li>虚拟机运行时长：<span>"+uptime+"</span></li><li>进程CPU时间：<span>"+spacname+"</span></li><li>JIT编译器：<span>"+spacname+"</span></li><li>总编译时间：<span>"+spacname+"</span></li>"
                    $('#jvm-msg-ul').append(html)

                })
            },

        },


    }
</script>
