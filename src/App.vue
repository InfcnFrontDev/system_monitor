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
                <server-high-load></server-high-load>
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
            <!--<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">-->
                <!--服务器信息-->
                <!--<server-message></server-message>-->
            <!--</article>-->
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--存储使用情况-->
                <storage-usage></storage-usage>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--CPU使用率-->
                <cpu-usage></cpu-usage>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--内存使用率-->
                <memory-usage></memory-usage>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--交换空间（swap）使用率-->
                <swap-usage></swap-usage>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--磁盘I/O-->
                <disk-usage></disk-usage>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--系统负载-->
                <system-load></system-load>
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
                <jvm-message></jvm-message>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--堆内存使用情况-->
                <jvm-heap-memory></jvm-heap-memory>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--非堆内存使用情况-->
                <jvm-non-heap-memory></jvm-non-heap-memory>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--加载类情况-->
                <jvm-class-load></jvm-class-load>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <!--线程数情况-->
                <jvm-thread></jvm-thread>
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
                <net-message></net-message>
            </article>
            <article class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <net-throughput></net-throughput>
            </article>
        </div>

    </section>
</template>
<script>

    import ServerHighLoad from './widgets/ServerHighLoad.vue'

    import ServerMessage from './widgets/ServerMessage.vue'
    import StorageUsage from './widgets/StorageUsage.vue'
    import CpuUsage from './widgets/CpuUsage.vue'
    import MemoryUsage from './widgets/MemoryUsage.vue'
    import SwapUsage from './widgets/SwapUsage.vue'
    import DiskUsage from './widgets/DiskUsage.vue'
    import SystemLoad from './widgets/SystemLoad.vue'

    import JvmClassLoad from  './widgets/JvmClassLoad.vue'
    import JvmHeapMemory from  './widgets/JvmHeapMemory.vue'
    import JvmNonHeapMemory from  './widgets/JvmNonHeapMemory.vue'
    import JvmMessage from  './widgets/JvmMessage.vue'
    import JvmThread from  './widgets/JvmThread.vue'
    import JvmThreadActive from  './widgets/JvmThreadActive.vue'

    import NetMessage from './widgets/NetMessage.vue'
    import NetChannel from './widgets/NetChannel.vue'
    import NetThroughput from './widgets/NetThroughput.vue'

    export default{
        components: {
            ServerHighLoad,

            StorageUsage,
            CpuUsage,
            MemoryUsage,
            SwapUsage,
            DiskUsage,
            SystemLoad,
            ServerMessage,
            JvmMessage,
            JvmHeapMemory,
            JvmNonHeapMemory,
            JvmClassLoad,
            JvmThread,
            JvmThreadActive,

            NetMessage,
            NetChannel,
            NetThroughput
        },
        ready() {
            pageSetUp();
        }
    }
</script>