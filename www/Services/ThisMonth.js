app.factory('ThisMonth', function () {
    return {
        all: function ($http, Month, Year, companyBranchID, successCallBack, errorCallBack) {
            $http.get(apiServiceBase + "MonthSummaryData/GetAttMonthSummary?Month=" + Month + "&Year=" + Year + "&companyBranchID=" + companyBranchID).success(function (data) {
                successCallBack(data);
            });
        }
    }
})