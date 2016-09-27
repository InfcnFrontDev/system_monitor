<template>
    <widget-base id="jvm_message" title="概要信息">
        <div class="chart no-padding">
            <table id="user" class="table table-bordered table-striped" style="clear: both">
                <tbody>
                <tr>
                    <td width="35%">JAVA虚拟机名称:</td>
                    <td width="65%" class="jvm-td-color">{{obj.vmName}}</td>
                </tr>
                <tr>
                    <td>JAVA虚拟机厂商:</td>
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
               <!-- <tr>
                    <td>进程CPU时间：</td>
                    <td class="jvm-td-color">{{}}</td>
                </tr>-->

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
    </widget-base>
</template>
<style>
    #jvm-msg-ul{
        list-style: none;
        line-height: 27px;
    }
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
            this.fetchData();
        },
        methods: {
            fetchData() {
                let $this = this;

                Monitor. getJVMRuntime().then(function (value1) {
                    Monitor. getJVMCompilation().then(function (value2) {
                            $this.render(value1,value2)
                    });

                });

            },
            render(result1, result2) {
                // vmName: "Java HotSpot(TM) 64-Bit Server VM"//JAVA虚拟机名称
                // vmName: "Java HotSpot(TM) 64-Bit Server VM",d
                // vmVendor: "Oracle Corporation",//JAVA虚拟机厂商：
                // vmVersion: "21.0-b17"//JAVA虚拟机版本
                // specVersion: "1.7",//JAVA版本
                // systemProperties/java.home: "C:\Program Files\Java\jdk1.7.0\jre", //JAVA Home目录
                // startTime: 1474600938821,//虚拟机启动时间
                // uptime: 254212986,//虚拟机运行时长

                let runtime = result1.ifcJVMRuntime, compilation = result2.ifcJVMCompilation;

                this.obj = {
                    vmName: runtime.vmName,
                    vmVendor: runtime.vmVendor,
                    vmVersion:runtime.vmVersion,
                    specVersion:runtime.specVersion,
                    javaHome: runtime.systemProperties["java.home"],
                    uptime: runtime.uptime,
                    startTime:runtime.startTime,
                    jitName: compilation.name,
                    totalCompilationTime:compilation.totalCompilationTime,
                };



            }
        }
    }
</script>
