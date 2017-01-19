<template>
    <!-- widget grid -->
    <section id="widget-grid" class=" ">
        <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">

            </div>
        </div>

        <!-- row -->
        <div class="model">
            <div class="row">
                <div class="col-xs-4  col-md-4 col-lg-6">
                    <h1 id="running1" class="page-title txt-color-blueDark">
                        <i class="fa fa-bar-chart-o fa-fw "></i>
                        运行状态统计
                    </h1>
                </div>
                <div class="col-xs-8  col-md-8 col-lg-6">
                    <system-control></system-control>
                    <system-top></system-top>
                </div>



            </div>
            <!-- row -->
            <div class="row">
                <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <!--服务器高负载日分布情况-->
                    <server-high-load></server-high-load>
                </article>
            </div>
        </div>

        <!-- row -->
        <div class="model">
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
        </div>

        <!-- row -->
        <div class="model">
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
        </div>

        <!-- row -->
        <div class="model">
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
        </div>


		<!-- row -->
        <div id="sql-info">
            <div class="row">
                <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                    <h1 id="sql1" class="page-title txt-color-blueDark">
                        <i class="fa fa-globe fa-fw "></i>
                        SQL
                    </h1>
                </div>
                <div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                </div>
            </div>
            <!-- row -->
            <div class="row">
                <article class="col-xs-12">
                    <sql-info></sql-info>
                </article>
            </div>
        </div>
		<div id="http-info">
            <div class="row row-title" >
                <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                    <h1 id="http1" class="page-title txt-color-blueDark">
                        <i class="fa fa-globe fa-fw "></i>
                        HTTP
                    </h1>
                </div>
                <div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                </div>
            </div>
            <!-- row -->
            <div class="row ">
                <article id="http-session-info" class="col-xs-12">
                    <http-session></http-session>
                </article>
                <article id="http-request-info" class="col-xs-12">
                    <http-request></http-request>
                </article>
            </div>
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

    import NetMessage from './widgets/NetMessage.vue'
    import NetThroughput from './widgets/NetThroughput.vue'
    import SystemTop from './widgets/SystemTop.vue'
    import SystemControl from './widgets/SystemControl.vue'

    import SqlInfo from './widgets/SqlInfo.vue'
	import HttpRequest from './widgets/HttpRequest.vue'
	import HttpSession from './widgets/HttpSession.vue'

    export default{
        components: {
            ServerHighLoad,
            SystemTop,
            SystemControl,


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

            NetMessage,
            NetThroughput,
			
			SqlInfo,
			HttpRequest,
			HttpSession
        },
        ready() {

            pageSetUp();
        },

    }
</script>