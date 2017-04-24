app.controller('AttendanceSummeryController', ['$filter', '$scope', '$rootScope', '$http', '$stateParams', '$ionicTabsDelegate', 'AttendanceSummery', 'Today', '$timeout', '$ionicLoading', function ($filter, $scope, $rootScope, $http, $stateParams, $ionicTabsDelegate, attendanceSummery, Today, $timeout, $ionicLoading) {
    //Loading Code Strat
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    //Loading Code End
    $rootScope.isheaderbarHide = true;
    $rootScope.isfooterbarHide = true;

    $scope.search = '';
    $scope.Value = '';
    $scope.attStatus = '';
    $scope.attDate = '';
    $scope.Name = '';
    $scope.isDate = '';
    $scope.day = '';

    $scope.Dateobj = $rootScope.Dateobj;
    $scope.currentDate = $rootScope.Dateobj;
    $scope.startDate = '';
    $scope.Today = '';


    if ($stateParams.AttStatus != null || $stateParams.AttStatus != undefined) {
        $scope.attStatus = $stateParams.AttStatus;
    }
    if ($stateParams.AttDate != null || $stateParams.AttDate != undefined) {
        $scope.attDate = $stateParams.AttDate;
    }
    if ($stateParams.Name != null || $stateParams.Name != undefined) {
        $scope.Name = $stateParams.Name;
    }
    if ($stateParams.Value != null || $stateParams.Value != undefined) {
        $scope.Value = $stateParams.Value;
    }
    if ($stateParams.IsDate != null || $stateParams.IsDate != undefined) {
        $scope.isDate = parseInt($stateParams.IsDate);
        if ($scope.isDate == 0) {
            $scope.day = 'Today';
        }
        else if ($scope.isDate == 1) {
            $scope.day = 'Yesterday';
        }
        else if ($scope.isDate == 2) {
            $scope.attDate = $filter('date')($scope.Dateobj, "dd/MM");
            $scope.currentDate = $filter('date')($scope.Dateobj, "dd-MM");
            $scope.day = $scope.attDate;
           
        }

    }


    $scope.getAttendanceSummeryData = function () {
        attendanceSummery.all($http, $scope.attStatus, $scope.attDate, function (data) {
            $scope.attendanceSummerydata = data.Result;
        });
    }


    $scope.getAttendance = function (isDate) {

        $ionicTabsDelegate.select(isDate);
        if ($scope.isDate == 0) {
            $scope.startDate = $filter('date')($scope.Dateobj, "dd/MM/yyyy");
            $scope.currentDate = $filter('date')($scope.Dateobj, "dd-MM-yyyy");
        }
        else if ($scope.isDate == 1) {
            var previousDay = new Date($scope.Dateobj);
            previousDay.setDate($scope.Dateobj.getDate() - 1);
            $scope.startDate = $filter('date')(previousDay, "dd/MM/yyyy");
            $scope.currentDate = $filter('date')(previousDay, "dd-MM-yyyy");
        }
        else {
            $scope.attDate = $filter('date')($scope.Dateobj, "dd/MM/yyyy");
            $scope.currentDate = $filter('date')($scope.Dateobj, "dd-MM-yyyy");
            $scope.startDate = $scope.attDate;
        }
        
        Today.all($http, $scope.startDate, $scope.isDate, $rootScope.CompanyBranchID, function (data) {
            $scope.Today = data.Result;
          

            $scope.getAttendanceSummeryData();
            $ionicLoading.hide();
        });

    }

    $scope.getAttendance($scope.isDate);
}])
