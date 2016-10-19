<template>
    <property-widget id="jvm_message" title="概要信息" interval="1000">
    </property-widget>
</template>
<style>
</style>
<script>
    import PropertyWidget from '../components/PropertyWidget.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            PropertyWidget
        },
        methods: {
            getDataApi(){
                return Monitor.getJVMRuntimeAndJVMCompilation();
            },
            resultMap(result){
                let runtime = {}, compilation = {};
                if (result) {
                    runtime = result.ifcJVMRuntime || {};
                    compilation = result.ifcJVMCompilation || {};
                }

                let properties = [];
                properties.push({name: 'JAVA虚拟机名称', value: runtime.vmName});
                properties.push({name: 'JAVA虚拟机厂商', value: runtime.vmVendor});
                properties.push({name: 'JAVA虚拟机版本', value: runtime.vmVersion});
                properties.push({name: 'JAVA版本', value: runtime.specVersion});
                properties.push({name: 'JAVA Home目录', value: runtime.systemProperties["java.home"]});
                properties.push({
                    name: '虚拟机启动时间',
                    value: Tools.dateFormat(new Date(runtime.startTime), Tools.yyyyMMddHHmmss_)
                });
                properties.push({name: '虚拟机运行时长', value: Tools.timeLong(runtime.uptime)});
                properties.push({name: 'JIT编译器', value: compilation.name});
                properties.push({name: '总编译时间', value: Tools.timeLong(compilation.totalCompilationTime)});
                return properties;
            }
        }
    }
</script>