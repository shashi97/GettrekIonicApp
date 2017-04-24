//angular.module('starter.controller', [])
app.controller('aIndexController', ['$scope', '$timeout', '$location', '$rootScope', function ($scope, $timeout, $location, $rootScope) {

    var injectParams = ['$scope', '$http', '$location', '$timeout'];
    var injectParams = ['$timeout', '$location'];

    var abc = function () {

        $timeout(function () {

            $location.path('/login')
        }, 2000);

    }
    $rootScope.isheaderbarHide = false;
    $rootScope.isfooterbarHide = false;
    abc();

    //aIndexController.$inject = injectParams;
    //.controller('aIndexController', aIndexController);
}])
