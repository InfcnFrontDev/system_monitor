# system_monitor

---
##### Introduction

> 系统监控
---
##### Build Setup

``` bash
# clone repo
git clone http://192.168.10.158/InfcnFrontDev/system_monitor.git

# install dependencies
npm install

# clean for production
npm run clean

# run for production
npm run dev

# build for production
npm run build
```
---
##### 访问地址
``` bash
http://[host]:[port]/[path]?servers=[server1,server2, ... ]&topnav=[1|0]
servers: 可监控的服务器列表

servers = {name1}+{url1},{name2}+{url2},{name3}+{url3},[...]
servers = 服务器一+http://192.168.10.106:8080/ifcmonitor/,服务器二+http://192.168.10.106:8080/ifcmonitor/,[...]

例：
http://192.168.10.106:8080/system_monitor/
http://192.168.10.106:8080/system_monitor/?servers=192.168.10.106+http://192.168.10.106:8080/ifcmonitor/
http://192.168.10.106:8080/system_monitor/?topnav=0
```
