<template>
    <widget id="net_message" title="概要信息">
        <div class="chart no-padding">
            <table id="user" class="table table-bordered table-striped" style="clear: both">
                <tbody>
                <tr>
                    <td width="35%">适配器名称：</td>
                    <td width="65%" class="jvm-td-color">{{obj.description}}</td>
                </tr>
                <tr>
                    <td>连接类型：</td>
                    <td class="jvm-td-color">{{obj.type}}</td>
                </tr>
                <tr>
                    <td>MAC地址：</td>
                    <td class="jvm-td-color">{{obj.hwaddr}}</td>
                </tr>
                <tr>
                    <td>IPv4地址：</td>
                    <td class="jvm-td-color">{{obj.address}}</td>
                </tr>
                <tr>
                    <td>IPv4子网掩码：</td>
                    <td class="jvm-td-color">{{obj.netmask}}</td>
                </tr>

                <tr>
                    <td>IPv4默认网关：</td>
                    <td class="jvm-td-color">{{obj.broadcast}}</td>
                </tr>
                <tr>
                    <td>IPv4 DNS：</td>
                    <td class="jvm-td-color">-</td>
                </tr>
                <tr>
                    <td>IPv6地址：</td>
                    <td class="jvm-td-color">-</td>
                </tr>

                <tr>
                    <td>IPv6默认网关：</td>
                    <td class="jvm-td-color">-</td>
                </tr>

                <tr>
                    <td>IPv6 DNS：</td>
                    <td class="jvm-td-color">-</td>
                </tr>
                </tbody>
            </table>
        </div>
    </widget>
</template>
<style>
    #net-msg-ul {
        list-style: none;
        line-height: 29px;
    }
</style>
<script>
    import Widget from '../components/Widget.vue'
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        components: {
            Widget
        },
        data(){
            return {
                obj: {}
            }
        },
        ready() {
            let $this = this;
            Monitor.getNets().then(function (result) {
                for (let n in result.ifcNets) {
                    if (result.ifcNets[n].address != "0.0.0.0") {
                        $this.obj = result.ifcNets[n];
                    }
                }
            });
        }
    }
</script>
