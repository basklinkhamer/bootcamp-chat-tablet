angular.module('app')
.component('settingsBar',{
    controller: settingsBarController,
    controllerAs: 'vm',
    templateUrl: 'components/settings-bar/settings-bar.html',
    bindings: {
        showButtons: '<'
    }
});

settingsBarController.$inject = [
    '$log',
    '$scope',
    '$rootScope',
    '$mdDialog',
    'Settings'
];

function settingsBarController(
    $log,
    $scope,
    $rootScope,
    $mdDialog,
    Settings
){

    var vm = this;

    vm.showPrompt               = showPrompt;
    vm.toggleSettingsButtons    = toggleSettingsButtons;
    vm.$onInit                  = generatePrompts;

    function generatePrompts(){
        Settings.getAllSettings()
        .then(function(data){
            vm.settings = data;
            $log.log('Generating Settings Dialogs');

            var emailDialog = $mdDialog.prompt()
                .title('E-mail')
                .textContent('Please provide your fellow bootcampers with your email:')
                .placeholder('Email Address')
                .ariaLabel('Email Address')
                .initialValue(vm.settings.email)
                .ok('Save')
                .cancel('Cancel')
                .openFrom('#emailToggle')
                .closeTo('#emailToggle');

            var userDialog = $mdDialog.prompt()
                .title('Username')
                .textContent('Please provide your fellow bootcampers with your username:')
                .placeholder('Username')
                .ariaLabel('Username')
                .initialValue(vm.settings.username)
                .ok('Save')
                .cancel('Cancel')
                .openFrom('#userToggle')
                .closeTo('#userToggle');

            var serverDialog = $mdDialog.prompt()
                .title('Server Address')
                .textContent('Please provide a server address to connect to:')
                .placeholder('http://')
                .ariaLabel('Server Address')
                .initialValue(vm.settings.serverAddress)
                .ok('Save')
                .cancel('Cancel')
                .openFrom('#serverToggle')
                .closeTo('#serverToggle');

            var infoDialog = $mdDialog.alert()
                .title('Welcome to the Bootcamp Chat App!')
                .textContent('This app was lovingly created by Bas Klinkhamer and expanded by you, '+ vm.settings.username +'! You\'re a rockstar!')
                .ariaLabel('App Information')
                .ok('Rock on!');

            vm.settingsDialogs = {
                email : {
                    id      : 'emailToggle',
                    label   : 'Email',
                    icon    : 'ion-android-mail',
                    dialog  : emailDialog
                },
                username : {
                    id      : 'userToggle',
                    label   : 'Username',
                    icon    : 'ion-android-person',
                    dialog  : userDialog
                },
                serverAddress : {
                    id      : 'serverToggle',
                    label   : 'Server Settings',
                    icon    : 'ion-android-wifi',
                    dialog  : serverDialog
                },
                info : {
                    id      : 'infoToggle',
                    label   : 'App Info',
                    icon    : 'ion-happy',
                    dialog  : infoDialog
                }
            };

        });
    }

    function showPrompt(prompt,inputType) {
        $mdDialog.show(prompt)
        .then(function(userInput) {
            if(inputType!=='info'){
                savePromptData(userInput,inputType);
            }
        }, function() {
            // Action cancelled
        });
    }

    function savePromptData(userInput, inputType){
        vm.settings[inputType] = userInput;
        $log.log('Updating settings');
        Settings.saveSettings(vm.settings)
        .then(function(result){
            $rootScope.$broadcast('resetApp',null);
        });
    }

    function toggleSettingsButtons(){
        if(vm.showButtons!==true){
            vm.showButtons = true;
        } else {
            vm.showButtons = false;
        }
    }

    $scope.$on('resetApp',generatePrompts);
}
