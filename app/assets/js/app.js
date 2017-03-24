angular.module('app',[
    'ngMaterial',
    'ngAnimate',
    'ngMd5',
    'angular-electron',
    'btford.socket-io'
]).run(onAppInit);

onAppInit.$inject = [
    '$rootScope',
    '$log',
    '$window',
    'Socket',
    'Backend'
];

function onAppInit(
    $rootScope,
    $log,
    $window,
    Socket,
    Backend
){

    Socket.connect();
    $log.log('Your app is online!','Rejoice!');
    $rootScope.$on('resetApp',Socket.reset);
    $window.document.title = Backend.getTitle();

}
