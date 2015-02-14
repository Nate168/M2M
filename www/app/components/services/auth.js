(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name m2mApp.authService
     * @description
     * # simpleLogin
     * Service in the m2mApp.
     */
    angular.module('m2mApp')
        .factory('authService', ['$http', '$q', 'localStorageService', 'authSettings',
            function ($http, $q, localStorageService, authSettings){
                var serviceBase = authSettings.apiServiceBaseUri;
                var authServiceFactory = {};

                var _authentication = {
                    isAuth: false,
                    userName: "",
                    partyId: ""
                };

                var _login = function (loginData) {
                    var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

                    var deferred = $q.defer();

                    $http.post(serviceBase + 'token', data,
                        {
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        })
                        .success(function (response) {

                            localStorageService.set('authorizationData',
                                {
                                    token: response.access_token,
                                    partyId: response.partyId,
                                    userName: response.userName
                                });

                            _authentication.isAuth = true;
                            _authentication.partyId = response.partyId;
                            _authentication.userName = response.userName;

                            deferred.resolve(response);

                        }).error(function (err, status) {
                            _logOut();
                            deferred.reject(err);
                        });

                    return deferred.promise;
                };

                var _logOut = function () {
                    localStorageService.remove('authorizationData');

                    _authentication.isAuth = false;
                    _authentication.userName = undefined;
                    _authentication.partyId = undefined;
                };

                var _fillAuthData = function () {
                    var authData = localStorageService.get('authorizationData');

                    if (authData) {
                        _authentication.isAuth = true;
                        _authentication.userName = authData.userName;
                        _authentication.partyId = authData.partyId;
                    }
                };

                authServiceFactory.login = _login;
                authServiceFactory.logOut = _logOut;
                authServiceFactory.fillAuthData = _fillAuthData;
                authServiceFactory.authentication = _authentication;

                return authServiceFactory;
            }]);

})();