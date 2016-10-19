<template>
    <div class="chart no-padding">
        <table id="user" class="table table-bordered table-striped" style="clear: both">
            <tbody>
            <tr v-for="prop in properties">
                <td width="35%">{{prop.name}}</td>
                <td width="65%" class="jvm-td-color">{{prop.value}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<style>
</style>
<script>
    import Monitor from '../common/monitor.api'
    import Tools from '../common/tools'

    export default{
        data(){
            return {
                properties: []
            }
        },
        methods: {
            setProperties(properties){
                this.properties = properties;
            }
        }
    }
</script>