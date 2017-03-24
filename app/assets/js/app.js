angular.module('app',[
    'ngMaterial',
    'ngAnimate',
    'ngMdIcons',
    'LocalForageModule',
    'btford.socket-io'
]).run(onAppInit);

onAppInit.$inject = ['$rootScope','$log','Socket'];

function onAppInit($rootScope, $log, Socket){
    Socket.connect();
    $log.log('Your app is online!','Rejoice!');
    $rootScope.$on('resetApp',Socket.reset);
}
