<template>
    <widget-base id="jvm_message" title="概要信息">
        <div class="chart no-padding">
            <ul id="jvm-msg-ul">

                <li>PID:<span>""</span></li>
                <li>JAVA虚拟机名称:<span >{{obj.vmName}}</span></li>
                <li>JAVA虚拟机厂商:<span>{{obj.vmVendor}}</span></li>
                <li>JAVA虚拟机版本：<span>{{obj.vmVersion}}</span></li>
                <li>JAVA版本：<span>{{obj.specVersion}}</span></li>
                <li>JAVA Home目录：<span>{{obj.systemProperties["java.home"]}}</span></li>
                <li>虚拟机启动时间：<span>{{c}}</span></li>
                <li>虚拟机运行时长：<span>{{obj.uptime}}</span></li>
                <li>进程CPU时间：<span>{{odd.stolen}}</span></li>
                <li>JIT编译器：<span>{{obt.name}}</span></li>
                <li>总编译时间：<span>{{obt.totalCompilationTime}}</span></li>

            </ul>
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
              obj:{},
              obt:{},
              odd:{}
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
                this.obj = result1.ifcJVMRuntime;
                this.obt = result2.ifcJVMCompilation;
                var sta=this.obj.startTime;
                var c=Tools.dateFormat(new Date(sta));



            }
        }
    }
</script>
