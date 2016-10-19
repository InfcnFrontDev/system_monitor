<template>
    <property-widget id="net_message" title="概要信息">
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
                return Monitor.getNets();
            },
            resultMap(result){
                let net = {};
                if (result) {
                    net = result.ifcNets.find(d => d.address != "0.0.0.0") || {};
                }

                let properties = [];

                properties.push({name: '适配器名称', value: net.description});
                properties.push({name: '连接类型', value: net.type});
                properties.push({name: 'MAC地址', value: net.hwaddr});
                properties.push({name: 'IPv4地址', value: net.address});
                properties.push({name: 'IPv4子网掩码', value: net.netmask});
                properties.push({name: 'IPv4默认网关', value: net.broadcast});

                properties.push({name: 'IPv4 DNS', value: net.ipv4dns});
                properties.push({name: 'IPv6地址', value: net.ipv6address});
                properties.push({name: 'IPv6默认网关', value: net.ipv6broadcast});
                properties.push({name: 'IPv6 DNS', value: net.ipv6dns});

                return properties;
            }
        }
    }
</script>
