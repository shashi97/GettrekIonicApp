app.factory("interceptorService", ['$q', '$rootScope', 'localStorageService', '$location', '$injector', '$window', function ($q, $rootScope, localStorageService, $location, $injector, $window) {

    var interceptorServiceFactory = {};

    var _request = function (config) {
        $rootScope.$broadcast("httpRequestStarted", null);
        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    };

    var _response = function (response) {
        // do something on success
        $rootScope.$broadcast("httpResponseReceived", null);
        return response;
    };

    // optional method
    var _responseError = function (rejection) {

        $rootScope.$broadcast("httpResponseError", rejection);
        if (rejection.status === 401) {
            var authService = $injector.get('authService');
            var authData = localStorageService.get('authorizationData');

            authService.logOut();
            if ($location.path() != "/login") {
                $location.path('/login');

                $window.location.reload();
            }
        }
        return $q.reject(rejection);

    };

    interceptorServiceFactory.request = _request;
    interceptorServiceFactory.response = _response;
    interceptorServiceFactory.responseError = _responseError;

    return interceptorServiceFactory;

}]);

