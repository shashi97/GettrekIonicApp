app.factory('Today', function () {

    var todayServiceFactory = {};

    var _attendanceCount = function ($http, startDate, isDate, companyBranchID, successCallBack, errorCallBack) {
        $http.get(apiServiceBase + "MonthSummaryData/GetCountAttendence?startDate=" + startDate + "&isDate=" + isDate + "&companyBranchID=" + companyBranchID).success(function (data) {
            successCallBack(data);
        });
    }

    var _dropdown = function ($http, successCallBack, errorCallBack) {
        $http.get(apiServiceBase + "MasterData/GetCompanyBranchDDOs").success(function (data) {
            successCallBack(data);
        });
    }

    var _currentBranch = function ($http, successCallBack, errorCallBack) {
        $http.get(apiServiceBase + "MasterData/GetCurrentBranchID").success(function (data) {
            successCallBack(data);
        })
    }

    var _setBranch = function ($http, companyBranchID, successCallBack, errorCallBack) {
        $http.post(apiServiceBase + "MasterData/SetBranch?companyBranchID=" + companyBranchID).success(function (data) {
            successCallBack(data);
        })
    }

    todayServiceFactory.all = _attendanceCount;
    todayServiceFactory.dropdown = _dropdown;
    todayServiceFactory.currentBranch = _currentBranch;
    todayServiceFactory.setCurrentBranch = _setBranch;

    return todayServiceFactory;

})