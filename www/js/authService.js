
'use strict';
define(['app'], function (app) {

    var injectParams = ['$http', '$q', 'localStorageService', 'ngAuthSettings', '$cookies', '$window'];

    var authService = function ($http, $q, localStorageService, ngAuthSettings, $cookies, $window) {

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

        //var _saveRegistration = function (registration) {

        //    _logOut();

        //    return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //        return response;
        //    });

        //};

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&url=" + loginData.url;

            if (loginData.useRefreshTokens) {
                data = data + "&client_id=" + ngAuthSettings.clientId;
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

            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {

            var deferred = $q.defer();
            $http.get("/login/logout").success(function () {
                localStorageService.remove('authorizationData');
                $cookies.Authorization = null;
                delete ($cookies.Authorization);
                _authentication.isAuth = false;
                _authentication.userName = "";
                _authentication.useRefreshTokens = false;
                deferred.resolve("sucessaa");


            }).error(function (err, status) {
                deferred.reject(err);
            });



            return deferred.promise;


        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.useRefreshTokens = authData.useRefreshTokens;
            }

        };

        var _refreshToken = function (stateId, areaId, stateName, areaName) {
            var deferred = $q.defer();

            var authData = localStorageService.get('authorizationData');

            if (authData) {

                if (authData.useRefreshTokens) {

                    var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                    localStorageService.remove('authorizationData');

                    $http.post(serviceBase + 'token', data,
                        {
                            headers:
                              {
                                  'Content-Type': 'application/x-www-form-urlencoded',
                                  'stateid': stateId,
                                  'areaid': areaId,
                                  'statename': stateName,
                                  'areaname': areaName,
                                  'refreshToken': 'true'
                              }
                        }).success(function (response) {

                            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
                            $cookies.Authorization = "Bearer " + response.access_token;
                            deferred.resolve(response);

                        }).error(function (err, status) {
                            _logOut();
                            deferred.reject(err);
                        });
                }
            }

            return deferred.promise;
        };


        authServiceFactory.saveRegistration = _saveRegistration;
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;
        authServiceFactory.refreshToken = _refreshToken;


        authServiceFactory.externalAuthData = _externalAuthData;


        return authServiceFactory;
    }

    authService.$inject = injectParams;
    app.factory('authService', authService);

});
