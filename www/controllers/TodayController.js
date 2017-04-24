app.controller('TodayController', ['$filter', '$rootScope', '$scope', '$http', '$stateParams','$ionicTabsDelegate', 'Today', '$timeout', '$ionicLoading', function ($filter, $rootScope, $scope, $http,$stateParams, $ionicTabsDelegate, Today, $timeout, $ionicLoading) {

    $scope.isDate = $rootScope.isDate;
    //Loading Code Strat
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    //Loading Code End



    $scope.getAllBranches = function () {
        Today.dropdown($http, function (data) {
            $scope.dropdownData = data.Result;
            $rootScope.companyBranchList = data.Result;
            $scope.getCurrentBranch();


        });
    }

    $scope.getCurrentBranch = function () {
        Today.currentBranch($http, function (data) {
            $scope.currentBranchData = data;

            $scope.selectedBranch.selected = [];

            $scope.dropdownData.forEach(function (item) {
                if (item.CompanyBranchID == $scope.currentBranchData) {
                    $scope.selectedBranch.selected = item;
                }
            });

            $scope.getAttendance(0);
        });
    }


    $scope.changeBranch = function (companyBranchID) {
        if (companyBranchID == 0) {
            $rootScope.IsDropdownHide = true;
        }
        else {
            $rootScope.IsDropdownHide = false;

            Today.setCurrentBranch($http, $scope.selectedBranch.selected.CompanyBranchID, function (data) {
                $scope.getAttendance($scope.isDate);
            });
        }
    }

    $scope.getAttendance = function (isDate) {
        $scope.showCalendar = false;
        $scope.isDate = isDate;
        $rootScope.isDate = isDate;
        $ionicTabsDelegate.select(isDate);
        if ($scope.isDate == 0) {
            $scope.startDate = $filter('date')($scope.Dateobj, "dd/MM/yyyy");
            $scope.currentDate = $filter('date')($scope.Dateobj, "dd-MM-yyyy");
            $scope.DataShow = true;
            $scope.CalenderShow = true;
        }
        else if ($scope.isDate == 1) {
            var previousDay = new Date($scope.Dateobj);
            previousDay.setDate($scope.Dateobj.getDate() - 1);
            $scope.startDate = $filter('date')(previousDay, "dd/MM/yyyy");
            $scope.currentDate = $filter('date')(previousDay, "dd-MM-yyyy");
            $scope.DataShow = true;
        }
        else if ($scope.isDate == 2) {

            $scope.startDate = $filter('date')($scope.Dateobj, "dd-MM-yyyy");
            $scope.currentDate = $filter('date')($scope.Dateobj, "dd-MM-yyyy");
            $scope.DataShow = true;
            $scope.showCalendar = true;
        }

        Today.all($http, $scope.startDate, $scope.isDate, $scope.selectedBranch.selected.CompanyBranchID,function (data) {
    $rootScope.CompanyBranchID = $scope.selectedBranch.selected.CompanyBranchID;
    $scope.Today = data.Result;
    $ionicTabsDelegate.select(isDate);
    $ionicLoading.hide();

});
    }

    if ($rootScope.CompanyBranchID == undefined || $rootScope.CompanyBranchID == 0) {

        $rootScope.isheaderbarHide = true;
        $rootScope.isfooterbarHide = true;
        $rootScope.IsDropdownHide = false

        $scope.ddObj = {};

        $scope.isDate = 0;
        $scope.Dateobj = new Date();
        $scope.currentDate = new Date();
        $scope.startDate = '';

        $rootScope.Dateobj = $scope.Dateobj;

        $rootScope.selectedBranch = { CompanyBranchID: 0, BranchName: '' }

        $scope.getAllBranches();
    }
    else {
        $scope.dropdownData = $rootScope.companyBranchList;
        $scope.selectedBranch.selected = $rootScope.selectedBranch.selected;
        $scope.Dateobj = $rootScope.Dateobj;
        $scope.getAttendance($rootScope.isDate);
    }
    //$scope.Dateobj = new Date();
    $scope.DateShow = $filter('date')($scope.Dateobj, "dd/MM/yyyy");
    $scope.datepickerObject = {
        titleLabel: 'Title',  //Optional
        todayLabel: 'Today',  //Optional
        closeLabel: 'Close',  //Optional
        setLabel: 'Set',  //Optional
        setButtonType: 'button-assertive',  //Optional
        todayButtonType: 'button-assertive',  //Optional
        closeButtonType: 'button-assertive',  //Optional
        from: new Date(2001, 8, 2), //Optional
        to: new Date(),  //Optional
        inputDate: new Date(),  //Optional
        mondayFirst: true,  //Optional
        dateFormat: 'dd-MM-yyyy', //Optional
        //Optional
        callback: function (val) {  //Mandatory
            datePickerCallback(val);
        },
        closeOnSelect: false
    };

    var datePickerCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {

            //Loading Code Strat
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            //Loading Code End

            console.log('Selected date is : ', val)
            $scope.Dateobj = val;
            $rootScope.Dateobj = $scope.Dateobj;
            $scope.DateShow = $filter('date')($scope.Dateobj, "dd/MM/yyyy");
            $scope.startDate = $scope.DateShow;
            $scope.currentDate = $filter('date')($scope.Dateobj, "dd-MM-yyyy");
            Today.all($http, $scope.startDate, $scope.isDate, $scope.selectedBranch.selected.CompanyBranchID,function (data) {
    $rootScope.CompanyBranchID = $scope.selectedBranch.selected.CompanyBranchID;
    $scope.Today = data.Result;
    $ionicLoading.hide();
});
        }
    };


}])
