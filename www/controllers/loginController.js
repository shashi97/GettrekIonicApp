app.controller('loginController', ['$scope', '$rootScope', '$location', 'AuthService', '$ionicLoading', function ($scope, $rootScope, $location, authService, $ionicLoading) {
   
    $rootScope.isheaderbarHide = true;
    $rootScope.isfooterbarHide = false;

    $scope.showError = false;

    $scope.user = {
        userName: '',
        password: '',
        url: '',
        useRefreshTokens: false
    };

    $scope.validateLogin = function () {

        if ($scope.user.userName == undefined || $scope.user.userName == null || $scope.user.userName == "") {
            $scope.userErrorMsg = 'please enter username'
            return;
        }
        else {
            $scope.userErrorMsg = 'success';
        }
        if ($scope.user.password == undefined || $scope.user.password == null || $scope.user.password == "") {
            $scope.passwordErrorMsg = 'please enter password'
            return;
        }
        else {
            $scope.passwordErrorMsg = 'success';
        }
         if ($scope.user.url == undefined || $scope.user.url == null || $scope.user.url == "") {
            $scope.urlErrorMsg = 'please enter Url'
                   return;
         }
         else {
             $scope.urlErrorMsg = 'success';
         }
        //else if ($scope.user.url == undefined || $scope.user.url == null || $scope.user.url == "") {
        //     $scope.passwordErrorMsg = 'please enter password'
        //     return;
        // }
       
            //else {
            //    var pattern = /^\w+$/;
            //    pattern.test($scope.user.url);  // returns a boolean
            //    if (pattern.test($scope.user.url) == false) {
            //        $scope.urlmessgae = "Please include only Character and Numeric";
            //        return;
            //    }
            //    else {
            //        $scope.urlmessgae = "success";
            //    }

            //}

        //}
         
        $scope.user.url = $scope.user.url + ".gettrek.com";
        $scope.user.useRefreshTokens = true;
        $scope.showError = false;

        //$scope.user.url = 'localhost:36628';
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        authService.login($scope.user, function (data) {


            $scope.user.url = $scope.user.url.split('.')[0];
            if (data != null) {
                $scope.returndata = data;
                if (data.error != undefined && data.error != null) {
                    $scope.showError = true;
                     $ionicLoading.hide();
                }
                else {
                    $scope.showError = false;

                    // redirect to todaycontroller page
                    $location.path("/Today/");
                    $ionicLoading.hide();
                    //$scope.state.go('/Today/');

                }
            }
        });
    }
}])
