angular.module('app')
.component('chatMessageBar',{
    controller: chatMessageBarController,
    controllerAs: 'vm',
    templateUrl: 'components/chat-message-bar/chat-message-bar.html',
    bindings: {
        currentRoom: '<',
        self: '<'
    }
});

chatMessageBarController.$inject = ['$rootScope','$log'];

function chatMessageBarController($rootScope,$log){
    var vm = this;
    vm.message = '';
    vm.sendMessage = sendMessage;

    var socket = null;

    function sendMessage(){
        $log.debug('You said:',vm.message);
        var messageData = {
            username: vm.self.username,
            email: vm.self.email,
            content: vm.message,
            room: vm.currentRoom
        };
        $rootScope.$broadcast('socket:message',messageData);
        vm.message = '';
    }
}
