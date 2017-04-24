'user strict'

define(['app'], function (app) {

    var injectParams = ['$q','$rootScope','localStorageService','$location','$injector','$window'];

    var factory = {};
    
    var interceptorService = function ($q, $rootScope, localStorageService, $location, $injector,$window)    
    {
        
        factory.request = function (config) {
            $rootScope.$broadcast("httpRequestStarted", null);
            config.headers = config.headers || {};

            var authData = localStorageService.get('ls.authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;

        };

        // optional method
    var   _requestError= function (rejection) {
        $rootScope.$broadcast("httpRequestFailed", rejection);
        return $q.reject(rejection);
    };



    factory.response= function (response) {
        // do something on success
        $rootScope.$broadcast("httpResponseReceived", null);
        return response;
    };

        // optional method
    factory.responseError = function (rejection) {

        $rootScope.$broadcast("httpResponseError", rejection);
        if (rejection.status === 401) {
            var authService = $injector.get('authService');
            var authData = localStorageService.get('authorizationData');

            //if (authData) {
            //    if (authData.useRefreshTokens) {
            //        $location.path('/refresh');
            //        return $q.reject(rejection);
            //    }
            //}
            
            authService.logOut();
            if ($location.path() != "/login") {
                $location.path('/login');

                $window.location.reload();
            }
        }
        return $q.reject(rejection);
        
    };
    return factory;
    };
    interceptorService.$inject = injectParams;
    app.factory('interceptorService', interceptorService);
});
