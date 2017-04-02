angular.module('app')
.component('chatRoom',{
    controller: chatRoomController,
    controllerAs: 'vm',
    templateUrl: 'components/chat-room/chat-room.html',
    bindings: {
        currentRoom: '<',
        messages: '<',
        self: '<'
    }
});

chatRoomController.$inject = ['$mdSidenav','Settings'];

function chatRoomController($mdSidenav,Settings){
    var vm = this;
    vm.toggleSideNav = toggleSideNav;

    function toggleSideNav(){
        $mdSidenav('left').toggle();
    }
}
