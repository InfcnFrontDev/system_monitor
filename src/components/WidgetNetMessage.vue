<template>
    <widget title="概要信息">
        <div class="jvm-msg-box">
            <ul id="jvm-msg-ul">
                <li>适配器名称:</li>
                <li>连接类型:</li>
                <li>MAC地址:</li>
                <li>IPv4地址:</li>
                <li>IPv4子网掩码:</li>
                <li>IPv4默认网关:</li>
                <li>IPv4 DNS:</li>
                <li>IPv6地址:</li>
                <li>IPv6默认网关:</li>
                <li>IPv6 DNS:</li>
                <li></li>
            </ul>
        </div>
    </widget>
</template>
<style>

</style>
<script>
    import Widget from './Widget.vue'

    export default{
        components: {
            Widget
        },
        ready() {
        }
    }
</script>