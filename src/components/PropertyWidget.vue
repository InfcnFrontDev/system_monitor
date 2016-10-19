<template>
    <widget :id="id" :title="title">
        <property v-ref:property></property>
    </widget>
</template>
<style>
</style>
<script>
    import Widget from '../components/Widget.vue'
    import Property from '../components/Property.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            Widget, Property
        },
        props: {
            id: {type: String},
            title: {type: String},
            interval: {type: String}
        },
        ready() {
            this.interval = parseInt(this.interval);

            let $this = this;
            setTimeout(function () {// 解决先执行一次的问题
                $this.fetchData();
                if ($this.interval) {
                    $this.timer = setInterval($this.fetchData, $this.interval); // 定时执行数据抓取
                }
            }, 0);
        },
        methods: {
            fetchData(){
                let $this = this;
                this.$parent.getDataApi().then(function (result) {
                    $this.render(result);
                }, function (error) {
                    $this.render(null);
                });
            },
            render(result){
                let properties = this.$parent.resultMap(result);
                this.$refs.property.setProperties(properties);
            }
        }
    }
</script>