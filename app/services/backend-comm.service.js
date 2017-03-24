angular.module('app')

.service('Backend',backendCommService);

backendCommService.$inject = ['ipcRenderer'];

function backendCommService(ipcRenderer){
    var service = {
        getTitle    : getTitle,
        getDefaults : getDefaults,
        notification: notification
    };

    return service;

    function getTitle(){
        return ipcRenderer.sendSync('getTitle');
    }

    function getDefaults(){
        return ipcRenderer.sendSync('getDefaults');
    }

    function notification(notificationObject){
        ipcRenderer.sendSync('notify', notificationObject);
        return null;
    }
}
