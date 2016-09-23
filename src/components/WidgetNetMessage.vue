<template>
    <widget title="概要信息">
        <div id="storage-usage-chart" class="chart no-padding">
            <ul id="net-msg-ul">
                <li>适配器名称:{{ifcnets.description}}</li>
                <li>连接类型:{{ifcnets.description}}</li>
                <li>MAC地址:{{ifcnets.description}}</li>
                <li>IPv4地址:{{ifcnets.description}}</li>
                <li>IPv4子网掩码:{{ifcnets.description}}</li>
                <li>IPv4默认网关:{{ifcnets.description}}</li>
                <li>IPv4 DNS:{{ifcnets.description}}</li>
                <li>IPv6地址:{{ifcnets.description}}</li>
                <li>IPv6默认网关:{{ifcnets.description}}</li>
                <li>IPv6 DNS:{{ifcnets.description}}</li>

            </ul>
        </div>
    </widget>
</template>
<style>
#net-msg-ul{
    list-style:none;
    line-height:29px;
}
</style>
<script>
    import Widget from './Widget.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            Widget
        },
        ready() {

            this.fetchData();
        },
        data(){
            return{
                ifcnets:null
            }
        },
        methods: {

            fetchData() {
                let $this = this;
                Monitor.getNets().then(function (value) {

                    $this.ifcnets=$(value.ifcNets)[0];
                });
            },
//            render(result) {
//
//                var html='',names = '', types = '',hwaddrs='',addresss='',broadcasts='', netmasks='',descriptions='';
//                names = $(result.ifcNets)[0].name;
//                types = $(result.ifcNets)[0].type;
//                hwaddrs = $(result.ifcNets)[0].hwaddr;
//                netmasks = $(result.ifcNets)[0].netmask;
//                broadcasts = $(result.ifcNets)[0].broadcast;
//                addresss = $(result.ifcNets)[0].address;
//                descriptions = $(result.ifcNets)[0].description;
//                addresss = $(result.ifcNets)[0].address;
//                addresss = $(result.ifcNets)[0].address;
//                addresss = $(result.ifcNets)[0].address;
//                html ='<li>适配器名称:'+descriptions+'</li>'+
//                        '<li>连接类型:'+types+'</li>'+
//                        '<li>MAC地址:'+hwaddrs+'</li>'+
//                        '<li>IPv4地址:'+addresss+'</li>'+
//                        '<li>IPv4子网掩码:'+netmasks+'</li>'+
//                        '<li>IPv4默认网关:'+names+'</li>'+
//                        '<li>IPv4 DNS:'+names+'</li>'+
//                        '<li>IPv6地址:'+broadcasts+'</li>'+
//                        '<li>IPv6默认网关:'+names+'</li>'+
//                        '<li>IPv6 DNS:'+names+'</li>';
//                $('#net-msg-ul').append(html);
//
//            }
        }
    }
</script>