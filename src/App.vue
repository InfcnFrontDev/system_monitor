<template>
    <!-- widget grid -->
    <section id="widget-grid" class=" ">
        <!-- row -->
        <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 id="running1" class="page-title txt-color-blueDark">
                    <i class="fa fa-bar-chart-o fa-fw "></i>
                    运行状态统计
                </h1>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            </div>
        </div>
        <!-- row -->
        <div class="row">
            <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <!--服务器高负载日分布情况-->
                <widget-server-high-load></widget-server-high-load>
            </article>
        </div>
        <!-- row -->
        <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 id="os1" class="page-title txt-color-blueDark">
                    <i class="fa fa-desktop fa-fw "></i>
                    操作系统
                </h1>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            </div>
        </div>
        <!-- row -->
        <div class="row">
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--存储使用情况-->
                <widget-storage-usage></widget-storage-usage>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--CPU使用率-->
                <widget-cpu-usage></widget-cpu-usage>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--内存使用率-->
                <widget-memory-usage></widget-memory-usage>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--交换空间（swap）使用率-->
                <widget-swap-usage></widget-swap-usage>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--磁盘I/O-->
                <widget-disk-usage></widget-disk-usage>
            </article>
        </div>
        <!-- row -->
        <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 id="jvm1" class="page-title txt-color-blueDark">
                    <i class="fa fa-cogs fa-fw "></i>
                    JVM
                </h1>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            </div>
        </div>
        <!-- row -->
        <div class="row">
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--jvm摘要-->
                <widget-jvm-message></widget-jvm-message>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--堆内存使用情况-->
                <widget-jvm-heap-memory></widget-jvm-heap-memory>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--非堆内存使用情况-->
                <widget-jvm-non-heap-memory></widget-jvm-non-heap-memory>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--加载类情况-->
                <widget-jvm-class-load></widget-jvm-class-load>
            </article>

            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--线程数情况-->
                <widget-jvm-thread></widget-jvm-thread>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--线程数活动情况-->
                <widget-jvm-thread-active></widget-jvm-thread-active>
            </article>
        </div>
        <!-- row -->
        <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 id="network1" class="page-title txt-color-blueDark">
                    <i class="fa fa-globe fa-fw "></i>
                    网络
                </h1>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            </div>
        </div>
        <!-- row -->
        <div class="row">
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <widget-net-message></widget-net-message>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <widget-net-throughput></widget-net-throughput>
            </article>
        </div>
    </section>
</template>
<script>

    import Widget from './components/Widget.vue'
    import WidgetServerHighLoad from './components/WidgetServerHighLoad.vue'
    import WidgetStorageUsage from './components/WidgetStorageUsage.vue'
    import WidgetCpuUsage from './components/WidgetCpuUsage.vue'
    import WidgetMemoryUsage from './components/WidgetMemoryUsage.vue'
    import WidgetSwapUsage from './components/WidgetSwapUsage.vue'
    import WidgetDiskUsage from './components/WidgetDiskUsage.vue'
    import WidgetSystemLoad from './components/WidgetSystemLoad.vue'

    import WidgetJvmClassLoad from  './components/WidgetJvmClassLoad.vue'
    import WidgetJvmHeapMemory from  './components/WidgetJvmHeapMemory.vue'
    import WidgetJvmNonHeapMemory from  './components/WidgetJvmNonHeapMemory.vue'
    import WidgetJvmMessage from  './components/WidgetJvmMessage.vue'
    import WidgetJvmThread from  './components/WidgetJvmThread.vue'
    import WidgetJvmThreadActive from  './components/WidgetJvmThreadActive.vue'

    import WidgetNetMessage from './components/WidgetNetMessage.vue'
    import WidgetNetChannel from './components/WidgetNetChannel.vue'
    import WidgetNetThroughput from './components/WidgetNetThroughput.vue'

    export default{
        components: {
            Widget,

            WidgetServerHighLoad,

            WidgetStorageUsage,
            WidgetCpuUsage,
            WidgetMemoryUsage,
            WidgetSwapUsage,
            WidgetDiskUsage,
            WidgetSystemLoad,

            WidgetJvmMessage,
            WidgetJvmHeapMemory,
            WidgetJvmNonHeapMemory,
            WidgetJvmClassLoad,
            WidgetJvmThread,
            WidgetJvmThreadActive,

            WidgetNetMessage,
            WidgetNetChannel,
            WidgetNetThroughput
        },
        ready() {
            pageSetUp();

        }
    }
</script>