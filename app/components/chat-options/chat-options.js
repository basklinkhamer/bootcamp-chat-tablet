angular.module('app')
.component('chatOptions',{
    controller: chatOptionsController,
    controllerAs: 'vm',
    templateUrl: 'components/chat-options/chat-options.html',
    bindings: {
        rooms: '<',
        currentRoom: '<',
        update: '&'
    }
});

chatOptionsController.$inject = [];

function chatOptionsController(){
    var vm = this;
}
