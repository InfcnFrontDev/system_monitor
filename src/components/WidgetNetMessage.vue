<template>
    <widget title="概要信息">
        <div id="storage-usage-chart" class="chart no-padding">
            <ul id="net-msg-ul">
                <!--<li>适配器名称:</li>-->
                <!--<li>连接类型:</li>-->
                <!--<li>MAC地址:</li>-->
                <!--<li>IPv4地址:</li>-->
                <!--<li>IPv4子网掩码:</li>-->
                <!--<li>IPv4默认网关:</li>-->
                <!--<li>IPv4 DNS:</li>-->
                <!--<li>IPv6地址:</li>-->
                <!--<li>IPv6默认网关:</li>-->
                <!--<li>IPv6 DNS:</li>-->

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

        },
        methods: {

            fetchData() {
                let $this = this;
                Monitor.getNets().then(function (value) {
                    $this.render(value)
                });
            },
            render(result) {
//                name	String	网络设备名称
//                hwaddr	String	网卡的物理地址
//                type	String	网卡类型
//                description	String	网卡描述信息
//                address	String	IP地址
//                destination	String
//                broadcast	String	网关广播地址
//                netmask	String	子网掩码
//                flags	long
//                mtu	long	设置网卡的最大传输单元
//                metric	long
//                rxBytes	long	接收到的总字节数
//                rxPackets	long	接收的总包裹数
//                rxErrors	long	接收到的错误包数
//                rxDropped	long	接收时丢弃的包数
//                rxOverruns	long
//                rxFrame	long
//                txBytes	long	发送的总字节数
//                txPackets	long	发送的总包裹数
//                txErrors	long	发送数据包时的错误数
//                txDropped	long	发送时丢弃的包数
//                txOverruns	long
//                txCollisions	long
//                txCarrier	long
//                speed	long
                var html='',names = '', types = '',hwaddrs='',addresss='',broadcasts='', netmasks='',descriptions='';
                names = $(result.ifcNets)[0].name;
                types = $(result.ifcNets)[0].type;
                hwaddrs = $(result.ifcNets)[0].hwaddr;
                netmasks = $(result.ifcNets)[0].netmask;
                broadcasts = $(result.ifcNets)[0].broadcast;
                addresss = $(result.ifcNets)[0].address;
                descriptions = $(result.ifcNets)[0].description;
                addresss = $(result.ifcNets)[0].address;
                addresss = $(result.ifcNets)[0].address;
                addresss = $(result.ifcNets)[0].address;
                html ='<li>适配器名称:'+descriptions+'</li>'+
                        '<li>连接类型:'+types+'</li>'+
                        '<li>MAC地址:'+hwaddrs+'</li>'+
                        '<li>IPv4地址:'+addresss+'</li>'+
                        '<li>IPv4子网掩码:'+netmasks+'</li>'+
                        '<li>IPv4默认网关:'+names+'</li>'+
                        '<li>IPv4 DNS:'+names+'</li>'+
                        '<li>IPv6地址:'+broadcasts+'</li>'+
                        '<li>IPv6默认网关:'+names+'</li>'+
                        '<li>IPv6 DNS:'+names+'</li>';
                $('#net-msg-ul').append(html);

            }
        }
    }
</script>