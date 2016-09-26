<template>
    <widget-base id="net_message" title="jvm摘要">
        <div class="chart no-padding">
            <ul id="net-msg-ul">

                <li>适配器名称:{{obj.description}}</li>
                <li>连接类型:{{obj.description}}</li>
                <li>MAC地址:{{obj.description}}</li>
                <li>IPv4地址:{{obj.description}}</li>
                <li>IPv4子网掩码:{{obj.description}}</li>
                <li>IPv4默认网关:{{obj.description}}</li>
                <li>IPv4 DNS:{{obj.description}}</li>
                <li>IPv6地址:{{obj.description}}</li>
                <li>IPv6默认网关:{{obj.description}}</li>
                <li>IPv6 DNS:{{obj.description}}</li>


            </ul>
        </div>
    </widget-base>
</template>
<style>
    #net-msg-ul {
        list-style: none;
        line-height: 29px;
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
                id: 'net_message',
                title: '概要信息',
                obj:{}
            }
        },
        ready() {
            this.fetchData()


        },
        methods: {
            fetchData() {
                let $this = this;
                Monitor. getNets().then(function (value) {
                    $this.render(value)
                });
            },
            render(result) {
                this.obj = result.ifcNets[0];


            }

        }
    }
</script>
