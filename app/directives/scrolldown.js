angular.module('app')
.directive('scrolldown',scrollDown);

scrollDown.$inject = ['$timeout']

function scrollDown($timeout) {
    var directive = {
        scope: { scrolldown: "=" },
        link: link
    };
    return directive;

    function link($scope, $element) {
        $scope.$watchCollection('scrolldown', function (newValue) {
            if (newValue) {
                $timeout(function(){
                    $element[0].scrollTop = $element[0].scrollHeight;
                }, 0);
            }
        });
    }
}
