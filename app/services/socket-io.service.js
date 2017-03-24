angular.module('app')

.service('Socket', socketService);

socketService.$inject = [
    '$rootScope',
    '$q',
    'socketFactory',
    'Settings'
];

function socketService(
    $rootScope,
    $q,
    socketFactory,
    Settings
){

    var service = {
        connect: connect,
        reset: reset
    };

    return service;

    function connect(){
        var defer = $q.defer();
        var socket = null;

        $rootScope.$on('socket:message', function(event, data){
            socket.emit('message',data);
        });

        $rootScope.$on('socket:userLogin', function(event, data){
            socket.emit('userLogin',data);
        });

        $rootScope.$on('socket:switchRoom', function(event, data){
            socket.emit('switchRoom',data);
        });

        $rootScope.$on('socket:disconnect', function(event, data){
            socket.disconnect(true);
        });

        Settings.getAllSettings().then(function(settings){
            var myIoSocket = io.connect(settings.serverAddress);
            socket = socketFactory({
                ioSocket: myIoSocket
            });
            socket.forward(['init','addMessage','userJoin','userLeft']);
            defer.resolve(socket);
        });

        return defer.promise;
    }

    function reset(){
        var defer = $q.defer();
        $rootScope.$broadcast('socket:disconnect',null);
        service.connect().then(function(result){
            defer.resolve(result);
        });
        return defer.promise;
    }

};
