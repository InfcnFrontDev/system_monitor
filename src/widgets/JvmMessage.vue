<template>
    <widget id="jvm_message" title="概要信息">
        <div class="chart no-padding">
            <table id="user" class="table table-bordered table-striped" style="clear: both">
                <tbody>
                <tr>
                    <td width="35%">JAVA虚拟机名称：</td>
                    <td width="65%" class="jvm-td-color">{{obj.vmName}}</td>
                </tr>
                <tr>
                    <td>JAVA虚拟机厂商：</td>
                    <td class="jvm-td-color">{{obj.vmVendor}}</td>
                </tr>
                <tr>
                    <td>JAVA虚拟机版本：</td>
                    <td class="jvm-td-color">{{obj.vmVersion}}</td>
                </tr>
                <tr>
                    <td>JAVA版本：</td>
                    <td class="jvm-td-color">{{obj.specVersion}}</td>
                </tr>
                <tr>
                    <td>JAVA Home目录：</td>
                    <td class="jvm-td-color">{{obj.javaHome}}</td>
                </tr>


                <tr>
                    <td>虚拟机启动时间：</td>
                    <td class="jvm-td-color">{{obj.startTime}}</td>
                </tr>
                <tr>
                    <td>虚拟机运行时长：</td>
                    <td class="jvm-td-color">{{obj.uptime}}</td>
                </tr>
                <tr>
                    <td>JIT编译器：</td>
                    <td class="jvm-td-color">{{obj.jitName}}</td>
                </tr>
                <tr>
                    <td>总编译时间：</td>
                    <td class="jvm-td-color">{{obj.totalCompilationTime}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </widget>
</template>
<style>
    #jvm-msg-ul {
        list-style: none;
        line-height: 27px;
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
                obj: {}
            }
        },
        ready() {
            let $this = this;
            setTimeout(function () {// 解决先执行一次的问题
                $this.fetchData();
                $this.timer = setInterval($this.fetchData, Config.realtimeIntervalTime); // 定时执行数据抓取
            }, 0);

        },
        methods: {
            fetchData(){
                let $this = this;
                Monitor.getJVMRuntimeAndJVMCompilation().then(function (result) {
                    $this.render(result);
                });
            },
            render(result){
                let runtime = result.ifcJVMRuntime, compilation = result.ifcJVMCompilation;
                this.obj = {
                    vmName: runtime.vmName,
                    vmVendor: runtime.vmVendor,
                    vmVersion: runtime.vmVersion,
                    specVersion: runtime.specVersion,
                    javaHome: runtime.systemProperties["java.home"],
                    uptime: Tools.timeLong(runtime.uptime),
                    startTime: Tools.dateFormat(new Date(runtime.startTime), Tools.yyyyMMddHHmmss_),
                    jitName: compilation.name,
                    totalCompilationTime: Tools.timeLong(compilation.totalCompilationTime),
            };
            }
        }
    }
</script>