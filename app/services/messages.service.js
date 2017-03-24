angular.module('app')

.service('Messages',messagesService);

messagesService.$inject = ['$q','$http','Settings'];

function messagesService($q, $http, Settings){
    var service = {
        getMessages: getMessages
    };

    return service;

    function getMessages(room){
        var defer = $q.defer();
        Settings.getAllSettings().then(function(settings){
            var queryURL = settings.serverAddress + '/msg?room=' + room;
            $http.get(queryURL).then(function (messages) {
                for(var m=0;m<messages.data.length;m++){
                    messages.data[m].hash = md5(messages.data[m].email);
                    messages.data[m].time = moment(messages.data[m].created).calendar();
                }
                defer.resolve(messages.data);
            });
        });
        return defer.promise;
    }
}
