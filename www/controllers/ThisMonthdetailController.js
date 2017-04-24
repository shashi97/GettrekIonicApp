app.controller('ThisMonthdetailController', ['$scope', '$rootScope', '$http', '$stateParams', '$rootScope', '$timeout', '$ionicLoading', function ($scope, $rootScope, $http, $stateParams, $rootScope, $timeout, $ionicLoading) {

    //Loading Code Strat
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $timeout(function () {

        $scope.stooges = [{ name: 'Moe' }, { name: 'Larry' }, { name: 'Curly' }];
    }, 2000);
    $scope.Value = $stateParams.Value;
    $scope.Name = $stateParams.Name;
    //Loading Code End
    $scope.startDate = "14-12-2015";
    $scope.attStatus = 'all';
    $rootScope.isheaderbarHide = true;
    $rootScope.isfooterbarHide = true;

    $rootScope.MonthSummary = $scope.MonthSummary;
    $scope.Month = $rootScope.currentMonth;
    $scope.Year = $rootScope.currentYear;

    $scope.companyBranchID = $rootScope.CompanyBranchID;

    Month = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];

    var currdate = new Date();

    $scope.currentMonth = currdate.getMonth() + 1;
    $scope.currentYear = currdate.getFullYear();


    $scope.nextBtnDisable = false;
    if ($scope.currentMonth == $scope.Month && $scope.currentYear == $scope.Year) {
        $scope.nextBtnDisable = true;
    }

    var status = '';
    if ($stateParams.ThisMonthId != null || $stateParams.ThisMonthId != undefined) {
        $scope.status = $stateParams.ThisMonthId;
        status = $scope.status;
    }
    //var Selecteddate = '';
    //if ($stateParams.MonthSummary != null || $stateParams.MonthSummary != undefined) {
    //    $scope.Selecteddate = $stateParams.MonthSummary;
    //    Selecteddate = $scope.Selecteddate;
    //}
    $scope.monthCalender = null;
    start = new Date('01/' + $scope.Month + '/' + $scope.Year);

    date = $.fullCalendar.formatDate(start, 'dd/MM/yyyy')

    $scope.MonthSummary = function () {
        $scope.MsgToShowInHeader = "Monthly Attendance Summary";
        //$scope.dailyRecordVisibilty = false;
        //$scope.dataVisibilty = false;
        //$scope.employeeCalenderVisibilty = false;
        //$scope.MonthSummaryCalnderVisibilty = true;

        $('#MonthCalender').empty();

        $scope.monthCalender =
        $('#MonthCalender').fullCalendar({
            buttonText: {

            },
            header: {
                left: 'None',
                center: 'None',
                right: 'None'
            },

            defaultView: 'month',
            editable: false,
            allDaySlot: true,
            selectable: true,
            slotMinutes: 30,
            hideIfNoPrevNext: true,

            viewRender: function (view, element) {
                $('#MonthCalender').fullCalendar('gotoDate', $scope.Year, $scope.Month - 1);
            }
        })


        $scope.monthCalender.fullCalendar('addEventSource', function (start, end, callback) {

            //start = new Date();

            //'01/' + $scope.Month+'/'+ $scope.Year;
            date = '01/' + $scope.Month + '/' + $scope.Year; //$.fullCalendar.formatDate(start, 'dd/MM/yyyy')

            $http.get(apiServiceBase + "MonthSummaryData/GetAttMonthDetail?startDate=" + date + "&attStatus=" + status + "&companyBranchID=" + $scope.companyBranchID).success(function (data) {
                callback(data);
                $ionicLoading.hide();
            });
            //$.ajax({
            //    type: 'Get',
            //    url: apiServiceBase + 'MonthSummaryData/GetAttMonthDetail',
            //    data: "startDate=" + date + "&attStatus=" + status + "&companyBranchID=" + $scope.companyBranchID,
            //    cache: false,
            //    contentType: "application/json",
            //    success: function (doc) {
            //        callback(doc);
            //        $ionicLoading.hide();

            //        //$scope.MonthSummary = $rootScope.CompanyBranchID;
            //    },                
            //    error: function (xhr, status, error) {

            //        document.appendChild(xhr.responseText);
            //    }

            //}); //end ajax           
        });

        $scope.CalenderTitle = "2015"; //$moment($scope.Date, $rootScope.momentDateFormat).format("MMMM YYYY");
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

        }
        $rootScope.currentMonth = $scope.Month;
        $rootScope.currentYear = $scope.Year;

        $rootScope.currentMonthName = Month[$scope.Month - 1];

        $scope.monthCalender.fullCalendar(value);

    }

    $scope.MonthSummary();
    //$ionicLoading.hide();


}])
