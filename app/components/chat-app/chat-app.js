angular.module('app')
.component('chatApp',{
    controller: chatAppController,
    controllerAs: 'vm',
    templateUrl: 'components/chat-app/chat-app.html',
    bindings: {
    }
});

chatAppController.$inject = [
    '$log',
    '$rootScope',
    '$scope',
    '$http',
    'md5',
    'Messages',
    'Settings',
    'Backend'
];

function chatAppController(
    $log,
    $rootScope,
    $scope,
    $http,
    md5,
    Messages,
    Settings,
    Backend
){

    var vm = this;
    vm.rooms = [];
    vm.currentRoom = '';
    vm.messages = [];
    vm.self = {};
    vm.switchRoom = switchRoom;

    $scope.$on('socket:init', initChat);
    $scope.$on('socket:addMessage', addMessageToRoom);
    $scope.$on('socket:userJoin', addUserToRoom);
    $scope.$on('socket:userLeft', removeUserFromRoom);

    function initChat(event, data){
        $log.log('Initializing Chatrooms');
        vm.rooms = data.rooms;
        Settings.getLoginData()
        .then(function(loginData){
            vm.self = loginData;
            setupRoom(loginData);
        }).catch(function(error){
            $log.log('settings Error',error);
        });
    }

    function addMessageToRoom(event, data){
        data.hash = md5.createHash(data.email);
        vm.messages.push(data);
        Backend.notification(data);
    }

    function addUserToRoom(event, data){
        data.type = 'service';
        data.content = 'has joined';
        vm.messages.push(data);
    }

    function removeUserFromRoom(event, data){
        data.type = 'service';
        data.content = 'has left';
        vm.messages.push(data);
    }

    function setupRoom(loginData){
        if(loginData.defaultRoom){
            vm.currentRoom = loginData.defaultRoom;
        } else {
            vm.currentRoom = vm.rooms[0];
        }

        Messages.getMessages(vm.currentRoom)
        .then(function(messages){
            vm.messages = messages;
        });
        $rootScope.$broadcast('socket:userLogin', loginData);
    }

    function switchRoom(newRoom){
        var data = {
            username: vm.self.username,
            email   : vm.self.email,
            oldRoom : vm.currentRoom,
            newRoom : newRoom
        };
        vm.currentRoom = newRoom;
        vm.messages = [];
        Messages.getMessages(vm.currentRoom)
        .then(function(messages){
            vm.messages = messages;
            $rootScope.$broadcast('socket:switchRoom', data);
        });
    }
}
