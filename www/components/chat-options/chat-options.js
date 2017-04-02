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
    vm.$onInit = componentInit;

    function componentInit(){

        Backend.getTitle().then(function(title){
            vm.appTitle = title;
        });
    }
}
