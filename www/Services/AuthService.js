angular.module('starter.service', ['ngCookies'])
app.factory("AuthService", ['$http', '$q', 'localStorageService', 'ngAuthSettings', '$cookies', '$window', function ($http, $q, localStorageService, ngAuthSettings, $cookies, $window) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: ""
    };

    var _login = function (loginData, successCallBack) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&url=" + loginData.url;

        if (loginData.useRefreshTokens) {
            data = data + "&client_id=" + ngAuthSettings.clientId + "&client_Secret=AMYV7M1r981yoG";
        }

        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            if (loginData.useRefreshTokens) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
            }
            else {
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });
            }
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _authentication.useRefreshTokens = loginData.useRefreshTokens;

            $cookies.Authorization = "Bearer " + response.access_token;

            deferred.resolve(response);

            successCallBack(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);

            successCallBack(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        var deferred = $q.defer();
        localStorageService.remove('authorizationData');
        $cookies.Authorization = null;
        delete ($cookies.Authorization);
        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.useRefreshTokens = false;

        return deferred.promise;


    };


    authServiceFactory.login = _login;
    authServiceFactory.logout = _logOut;

    return authServiceFactory;

}])
