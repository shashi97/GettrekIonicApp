app.factory('AttendanceSummery', function () {
    return {
        all: function ($http, attStatus, attDate, successCallBack, errorCallBack) {
            $http.get(apiServiceBase + "MonthSummaryData/GetAttendenceSummery?attStatus=" + attStatus + "&attDate=" + attDate)
                .success(function (data) {
                    successCallBack(data);
                });
        }
    };
})