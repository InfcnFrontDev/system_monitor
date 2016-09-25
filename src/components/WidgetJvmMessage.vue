<template>
    <widget-base id="jvm_message" title="概要信息">
        <div class="chart no-padding">
            <ul id="jvm-msg-ul">
                <li>PID:<span>"+vmname+"</span></li>
                <li>PID:<span>"+vmname+"</span></li>
                <li>JAVA虚拟机名称:<span >"+vmname+"</span></li>
                <li>JAVA虚拟机厂商:<span>"+specvendor+"</span></li>
                <li>JAVA虚拟机版本：<span>"+spacname+"</span></li>
                <li>JAVA版本：<span>"+vmversion+"</span></li>
                <li>JAVA Home目录：<span>"+bootclasspath+"</span></li>
                <li>虚拟机启动时间：<span>"+uptime+"</span></li>
                <li>虚拟机运行时长：<span>"+uptime+"</span></li>
                <li>进程CPU时间：<span>"+spacname+"</span></li>
                <li>JIT编译器：<span>"+spacname+"</span></li>
                <li>总编译时间：<span>"+spacname+"</span></li>
            </ul>
        </div>
    </widget-base>
</template>
<style>

</style>
<script>
    import WidgetBase from './WidgetBase.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            WidgetBase
        },
        data(){
          return {
              obj:{}
          }
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
                this.obj = result.ifcJVMRuntime;
            }
        }
    }
</script>
