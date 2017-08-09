<template>
    <div id="serverbox" style=" display:inline-block;padding-top:4px; float:right">
        <div id="server" class="btn-group" style="float:right;">
            <a class="btn btn-warning" href="javascript:void(0);" style="padding:6px 16px;" >&nbsp;</a>
            <a class="btn btn-warning dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);"><span class="caret"></span></a>
            <ul class="dropdown-menu" >
                <!--<li v-for="item in itemArr" @click="queryClick(item)"><a href="javascript:;">{{item.name}}</a></li>-->
            </ul>
        </div>
        <div class="sys-top" style="float:right; line-height:40px; margin-right:20px;">
            <span>
                <img src="../../app/img/fuwuqi1.png" alt="me" class="online" style="width:34px; height:28px; margin-top:-6px;"/>
                <a style="font-size:14px; color:#999;">监控服务器:</a>
            </span>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        ready(){
            var params =this.parseQueryString();
            Config.params = params;

            if($('#server').length) {
                var $server = $('#server');


                for (var j in params.servers) {
                    var $li = $('<li><a href="javascript:;">' + params.servers[j].name + '</a></li>');

                    if( j == params.s){
                        $li.addClass('active');
                        $server.find('a:first').text(params.servers[j].name);
                        Config.apiPath = params.servers[j].value;
                        // 加载图表页面

                    }

                    $li.click(function () {
                        var queryString = '';

                        if(params._servers)
                            queryString += '&servers=' + params._servers;
                        if($(this).attr('s') != '0')
                            queryString += '&s=' + $(this).attr('s');
                        if(params.topnav == 0)
                            queryString += '&topnav=0';

                        queryString = queryString.replace(/^&/, '?');
                        location.href = location.pathname + queryString;
                    });

                    $li.attr('s', j);
                    $server.find('ul').append($li);
                }

            }

        },
        methods: {
            parseQueryString() {
                var search = location.search.replace(/^\?/, '');
                var searchs = search.split('&');

                var params = {};
                for (var i in searchs) {
                    var item = searchs[i].split('=');
                    params[item[0]] = item[1];
                }

                // servers: 可监控的服务器列表
                // 解析servers = {name1}+{url1},{name2}+{url2},{name3}+{url3},[...]
                // 例如servers = 服务器一+http://192.168.10.106:8080/ifcmonitor/,服务器二+http://192.168.10.106:8080/ifcmonitor/,[...]

                if (params.servers) {
                    $('#serverbox').show();
                    params._servers = params.servers;  // 保存一下原始串

                    var serArr = params.servers.split(','), serArr2 = [];
                    for (var i in serArr) {
                        var serItemArr = serArr[i].split('+');

                        var serName = serItemArr[0], serUrl = serItemArr[0];
                        if (serItemArr.length > 1) {
                            serName = serItemArr[0], serUrl = serItemArr[1];
                        }

                        serArr2.push({name: serName, value: serUrl});
                    }
                    params.servers = serArr2;
                } else {
                    $('#serverbox').hide();
                    params.servers = [];

                    var loc = location.protocol + '//' + location.host + location.pathname;


                    loc = loc.replace(/index\.html$/, '').replace(/ifcmonitor\/$/, '');
                    params.servers.push({name: loc, value: loc});
                }

                // s：当前选中的服务器索引， 默认显示第1个，索引为0
                if (params.s) {
                    params.s = parseInt(params.s);
                    if (params.s >= params.servers.length) {
                        params.s = 0;
                    }
                } else {
                    params.s = 0;
                }

                // topnav：是否显示顶部和左侧框架， 默认为1，显示
                if (params.topnav) {
                    params.topnav = parseInt(params.topnav);
                } else {
                    params.topnav = 1;
                }
                return params;
            }

        }

    }

</script>
