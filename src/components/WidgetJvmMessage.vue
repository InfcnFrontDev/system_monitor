<template>
    <widget title="jvm摘要">
        <div class="jvm-msg-box">
            <ul id="jvm-msg-ul">
                <li>PID:</li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
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
