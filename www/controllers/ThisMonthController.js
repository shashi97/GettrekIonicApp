app.controller('ThisMonthController', ['$filter', '$scope', '$rootScope', '$http', 'ThisMonth', '$timeout', '$ionicLoading', 'Today', function ($filter, $scope, $rootScope, $http, ThisMonth, $timeout, $ionicLoading, Today) {
    //Loading Code Strat
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    //$rootScope.IsDropdownHide = false;
    $scope.dropdownData = $rootScope.companyBranchList;
    $scope.companyBranchID = $rootScope.CompanyBranchID;
    //Loading Code End
    //$scope.MonthSummary = $rootScope.MonthSummary;

    $scope.dropdownData.forEach(function (item) {
        if (item.CompanyBranchID == $scope.companyBranchID) {
            $scope.selectedBranch.selected = item;
        }
    });

    $scope.isDate = 0;

    $rootScope.isheaderbarHide = true;
    $rootScope.isfooterbarHide = true;
    $scope.Year = 0;
    $scope.currentYear = 0;

    //Loading Code End


    //$rootScope.selectedBranch = { CompanyBranchID: 0, BranchName: '' }

    if ($rootScope.currentMonth != undefined) {
        $scope.currentMonth = $rootScope.currentMonth;
        $scope.Month = $rootScope.currentMonth;
        $scope.Year = $rootScope.currentYear;
        $scope.changeMonth = $rootScope.changeMonth;
    }
    else {
        var date = new Date();

        $scope.currentMonth = date.getMonth() + 1;
        $scope.Month = date.getMonth() + 1;
        $scope.Year = date.getFullYear();
        $scope.currentYear = date.getFullYear();

        $rootScope.currentMonth = $scope.Month;
        $rootScope.currentYear = $scope.Year;
    }

    // $rootScope.currentMonthName = 'December';
    //reloadOnSearch: false;

    $scope.nextBtnDisable = false;
    if ($scope.currentMonth == $scope.Month && $scope.currentYear == $scope.Year) {
        $scope.nextBtnDisable = true;
    }

    $scope.getMonthlyAttendance = function () {
        ThisMonth.all($http, $scope.Month, $scope.Year, $scope.selectedBranch.selected.CompanyBranchID, function (data) {
            $scope.ThisMonthData = data.Result;
            $rootScope.currentMonthName = $scope.ThisMonthData.MonthName;
            $rootScope.currentYear = $scope.Year;
            $rootScope.changeMonth = $scope.changeMonth;
            //$rootScope.MonthSummary = $scope.MonthSummary;
            $ionicLoading.hide();
        });
    }

    $scope.changeBranch = function (companyBranchID) {
        if (companyBranchID == 0) {
            $rootScope.IsDropdownHide = true;
        }
        else {
            $rootScope.IsDropdownHide = false;
            $rootScope.CompanyBranchID = $scope.selectedBranch.selected.CompanyBranchID;
            Today.setCurrentBranch($http, $scope.selectedBranch.selected.CompanyBranchID, function (data) {
                $scope.getMonthlyAttendance();
            });

        }
    }




    $scope.getAttendance = function (isDate) {
        $scope.isDate = isDate;
        //$ionicTabsDelegate.select(isDate);
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
        else {
            $scope.CalenderShow = true;

        }

        Today.all($http, $scope.startDate, $scope.isDate, $scope.selectedBranch.selected.CompanyBranchID, function (data) {
            $rootScope.CompanyBranchID = $scope.selectedBranch.selected.CompanyBranchID;
            $scope.Today = data.Result;

            $ionicLoading.hide();
        });
    }

    $scope.changeMonth = function (value) {

        //Loading Code Strat
        $ionicLoading.show(
            {
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        //Loading Code End

        if (value == 'next') {

            if ($scope.Month == 12) {
                $scope.Month = 1;
                $scope.Year = $scope.Year + 1;
            }
            else {
                $scope.Month = parseInt($scope.Month) + 1;
            }
            if ($scope.currentMonth == $scope.Month && $scope.currentYear == $scope.Year) {
                $scope.nextBtnDisable = true;
            }

            $rootScope.currentMonth = $scope.Month;
            $rootScope.currentYear = $scope.Year;
        }
        else {
            $scope.nextBtnDisable = false;
            if ($scope.Month == 1) {
                $scope.Month = 12;
                $scope.Year = parseInt($scope.Year) - 1;
            }
            else {
                $scope.Month = parseInt($scope.Month) - 1;
            }

            $rootScope.currentMonth = $scope.Month;
            $rootScope.currentYear = $scope.Year;
        }

        $scope.getMonthlyAttendance();
    }

    $scope.getMonthlyAttendance();
}])
