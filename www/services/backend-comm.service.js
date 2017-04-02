angular.module('app')

.service('Backend',backendCommService);

backendCommService.$inject = ['$q','$http'];

function backendCommService($q, $http){
    var service = {
        getTitle    : getTitle,
        getDefaults : getDefaults,
        notification: notification
    };

    return service;

    function getTitle(){
        var defer = $q.defer();
        defer.resolve(getSetting('title'));
        return defer.promise;
    }

    function getDefaults(){
        var defer = $q.defer();
        defer.resolve(getSetting('defaults'));
        return defer.promise;
    }

    function getSetting(requestedKey){
        var defer = $q.defer();
        $http.get('app-settings.json').then(function(settingsObject){
            console.log(settingsObject);
            defer.resolve(settingsObject.data[requestedKey]);
        });
        return defer.promise;
    }

    function notification(notificationObject){
        // TODO: use cordova plugin to achieve the same functionality
        // ipcRenderer.sendSync('notify', notificationObject);
        return null;
    }
}
