angular.module('app')

.service('Settings',settingsService);

settingsService.$inject = ['$q','$localForage'];

function settingsService($q, $localForage){
    var settingsKey = 'bootcamp-chat-app-settings';

    var service = {
        getAllSettings  : getAllSettings,
        saveSettings    : saveSettings,
        getLoginData    : getLoginData,
        resetData       : resetData
    };

    return service;

    function getAllSettings(){
        var defer = $q.defer();
        $localForage.getItem(settingsKey)
        .then(function(data){
            defer.resolve(data);
        }).catch(function(error){
            defer.reject(error);
        });
        return defer.promise;
    }

    function saveSettings(settingsObject){
        var defer = $q.defer();
        $localForage.setItem(settingsKey,settingsObject)
        .then(function(){
            defer.resolve(true);
        }).catch(function(error){
            defer.reject(error);
        });
        return defer.promise;
    }

    function getLoginData(){
        var defer = $q.defer();
        getAllSettings()
        .then(function(settings){
            if(settings!==null){
                loginData = parseLoginData(settings);
                defer.resolve(loginData);
            } else {
                resetData().then(function(success){
                    getAllSettings()
                    .then(function(settings){
                        loginData = parseLoginData(settings);
                        defer.resolve(loginData);
                    });
                });
            }
        }).catch(function(error){
            defer.reject(error);
        });
        return defer.promise;
    }

    function parseLoginData(settings){
        var loginData = {
            username: settings.username,
            email: settings.email,
            defaultRoom: settings.defaultRoom
        };
        return loginData;
    }

    function resetData(){
        var defer = $q.defer();
        var resetFillData = {
            username: 'Anonymous User',
            email: 'anonymous@sogeti.com',
            defaultRoom: 'general',
            serverAddress: 'http://localhost:1704'
        };
        saveSettings(resetFillData)
        .then(function(success){
            if(success){
                defer.resolve(success);
            } else {
                defer.reject(false);
            }
        }).catch(function(error){
            defer.reject(error);
        });
        return defer.promise;
    }
}
