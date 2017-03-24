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

chatOptionsController.$inject = ['Backend'];

function chatOptionsController(Backend){
    var vm = this;
    vm.appTitle = Backend.getTitle();
}
