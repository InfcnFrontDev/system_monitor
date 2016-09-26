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
                id: 'jvm_class_load',
                title: 'jvm类加载'
            }
        },
        ready() {

//            Monitor.getJVMClassLoading()

//            {
//                date: "201609261011",
//                        ifcJVMClassLoading: {
//                isVerbose: false,
//                        loadedClassCount: 3747,
//                        totalLoadedClassCount: 3747,
//                        unloadedClassCount: 0
//            }
//            }

        }
    }
</script>