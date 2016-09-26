<template>
    <widget :id="id" :title="title"></widget>
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
        data(){
            return {
                id: 'jvm_non_heap_memory',
                title: '非堆内存使用情况'
            }
        },
        ready() {

            // Monitor.getJVMMemory()

//            ifcJVMMemory: {
//                nonHeapMemoryUsage: {
//                    committed: 569507840,
//                            init: 536870912,
//                            max: 1886519296,
//                            used: 410953568
//                },
        }
    }
</script>