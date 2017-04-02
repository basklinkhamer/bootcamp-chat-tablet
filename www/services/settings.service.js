angular.module('app')

.service('Settings',settingsService);

settingsService.$inject = ['$q','Backend'];

function settingsService($q, Backend){
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
        localforage.getItem(settingsKey)
        .then(function(data){
            if(data!==null){
                defer.resolve(data);
            } else {
                resetData().then(function(success){
                    getAllSettings()
                    .then(function(settings){
                        defer.resolve(settings);
                    });
                });
            }
        }).catch(function(error){
            defer.reject(error);
        });
        return defer.promise;
    }

    function saveSettings(settingsObject){
        var defer = $q.defer();
        localforage.setItem(settingsKey,settingsObject)
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
        var resetFillData = Backend.getDefaults();
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
