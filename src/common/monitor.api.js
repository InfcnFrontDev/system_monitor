import Storage from './storage'

let $ajax = function (url, success, error) {

    $.ajax({

        url: url,

        cache: false,
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            success && success(data, textStatus, jqXHR);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            error && error(XMLHttpRequest, textStatus, errorThrown);
        }
    });
}

let newPromise = function (type, monitorDate) {
    let server = Storage.getServer();

    let url = server.apiPath + 'IFCMonitorServlet?type=' + type;
    if (monitorDate != null) {
        url += '&monitorDate=' + monitorDate;
    }else{
        url += '&realtime=true';
    }
    return new Promise(function (resolve, reject) {
        $ajax(url, function (result) {
            resolve(result)
        }, function (error) {
            reject(error)
        });
    })
}

export default {
    /**
     * 获取全部数据
     */
    getAll(monitorDate) {
        return newPromise('all', monitorDate);
    },
    /**
     * 获取CPU信息
     */
    getCpus(monitorDate) {
        return newPromise('cpu', monitorDate);
    },
    /**
     * 获取系统物理内存信息
     */
    getMem(monitorDate) {
        return newPromise('sys', monitorDate);
    },
    /**
     * 获取操作系统信息
     */
    getOperatingSystem(monitorDate) {
        return newPromise('os', monitorDate);
    },
    /**
     * 获取系统用户信息
     */
    getUsers(monitorDate) {
        return newPromise('user', monitorDate);
    },
    /**
     * 获取文件系统信息
     */
    getFileSystems(monitorDate) {
        return newPromise('fs', monitorDate);
    },
    /**
     * 获取网络信息
     */
    getNets(monitorDate) {
        return newPromise('net', monitorDate);
    },
    /**
     * 获取目录信息
     */
    getDirectorys(monitorDate) {
        return newPromise('directory', monitorDate);
    },
    /**
     * 获取JVM类加载信息
     */
    getJVMClassLoading(monitorDate) {
        return newPromise('jvmclassloading', monitorDate);
    },
    /**
     * 获取JVM类编译信息
     */
    getJVMCompilation(monitorDate) {
        return newPromise('jvmcompilation', monitorDate);
    },
    /**
     * 获取JVM垃圾收集信息
     */
    getJVMGarbageCollectors(monitorDate) {
        return newPromise('jvmgc', monitorDate);
    },
    /**
     * 获取JVM内存信息
     */
    getJVMMemoryManagers(monitorDate) {
        return newPromise('jvmmemmgr', monitorDate);
    },
    /**
     * 获取内存管理器信息
     */
    getJVMMemoryPool(monitorDate) {
        return newPromise('jvmmempool', monitorDate);
    },
    /**
     * 获取JVM内存池信息
     */
    getJVMMemory(monitorDate) {
        return newPromise('jvmmem', monitorDate);
    },
    /**
     * 获取JVM所在操作系统信息
     */
    getJVMOperatingSystem(monitorDate) {
        return newPromise('jvmos', monitorDate);
    },
    /**
     * 获取JVM运行时参数及其它信息
     */
    getJVMRuntime(monitorDate) {
        return newPromise('jvmrt', monitorDate);
    },
    /**
     * 获取JVM线程相关信息
     */
    getJVMThread(monitorDate) {
        return newPromise('jvmthd', monitorDate);
    },
    /**
     * 获取Http Request
     */
    getHttpRequest(monitorDate) {
        return newPromise('httprequest', monitorDate);
    },
    /**
     * 获取Http Session
     */
    getHttpSession(monitorDate) {
        return newPromise('httpsession', monitorDate);
    }
}