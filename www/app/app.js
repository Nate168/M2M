(function () {

    'use strict';

    /**
     * @ngdoc M2M application module.
     * @name m2mApp
     * @description
     *
     * Main module of the application.
     */

    angular.module('m2mApp', [
        'ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize', 'ngTouch',
        'ui.router', 'ui.bootstrap', 'ngGrid', 'toaster', 'commonFilters', 'LocalStorageModule',
        'restangular', 'google.map', 'ngFullscreen', ])
        .config(function ($stateProvider, $urlRouterProvider) {
            // For any unmatched url, redirect to /
            $urlRouterProvider.otherwise("/");
            //
            // Now set up the states
            $stateProvider
                .state('main', {
                    url: "/",
                    templateUrl: "views/main.html",
                    pageTitle: 'Main'
                })
                .state('dashboard', {
                    url: "/dashboard",
                    templateUrl: "views/dashboard/dashboard.html",
                    pageTitle: 'Dashboard'
                })
                .state('toaster', {
                    url: "/toaster",
                    templateUrl: "views/toaster/toaster.html",
                    pageTitle: 'Toaster',
                    controller: 'toasterController'
                })
                .state('help', {
                    url: "/help",
                    templateUrl: "views/support/help.html",
                    pageTitle: 'Help'
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "views/login/login.html",
                    pageTitle: 'Login',
                    controller: 'loginController'

                })

                //Set-Up Account
                .state('form', {
                    url: '/form',
                    templateUrl: 'views/setup/form.html',
                    controller: 'formController'

                })

                .state('form.profile', {
                    url: '/profile',
                    templateUrl: 'views/setup/form-profile.html'



                })

                .state('form.sign', {
                    url: '/sign',
                    templateUrl: 'views/setup/form-sign.html'

                })

                .state('form.submit', {
                    url: '/submit',
                    templateUrl: 'views/setup/form-submit.html'
                })

                // End///


                // device states
                .state('devices', {
                    abstract: true,
                    url: '/devices',
                    template: '<ui-view/>'
                })
                .state('devices.live', {
                    url: "/live",
                    templateUrl: "views/devices/live.html",
                    pageTitle: 'Live Devices',
                    controller: 'liveController'

                })
                .state('devices.inventory', {
                    url: "/inventory",
                    templateUrl: "views/devices/inventory.html",
                    pageTitle: 'Device Inventory',
                    controller: 'deviceInventoryController'
                })
                .state('devices.inactive', {
                    url: "/inactive",
                    templateUrl: "views/devices/inactive.html",
                    pageTitle: 'Inactive Devices'
                })
                .state('devices.details', {
                    url: "/details/:deviceId",
                    templateUrl: "views/devices/details.html",
                    pageTitle: 'Device Details',
                    controller: 'deviceDetailsController'
                })
                // end device states
                .state('live-tracking', {
                    url: "/live-tracking",
                    templateUrl: "views/live-tracking/live-tracking.html",
                    pageTitle: 'Live Tracking',
                    controller: 'liveTrackingController'
                })
                .state('loans', {
                    url: "/loans",
                    templateUrl: "views/loans/loans.html",
                    pageTitle: 'Loans'
                })
                .state('users', {
                    url: "/users",
                    templateUrl: "views/users/users.html",
                    pageTitle: 'Users'
                })
                .state('alerts', {
                    url: "/alerts",
                    templateUrl: "views/alerts/alerts.html",
                    pageTitle: 'Alerts'
                })
                .state('reports', {
                    url: "/reports",
                    templateUrl: "views/reports/reports.html",
                    controller: "reportController",
                    pageTitle: 'Reports'
                })
                .state('reports.daily-install', {
                    url: "/daily-install",
                    templateUrl: "views/reports/daily-install.html",
                    pageTitle: 'Daily Install Report'
                })
                .state('reports.device-agreement', {
                    url: "/device-agreement",
                    templateUrl: "views/reports/device-agreement.html",
                    pageTitle: 'Device Agreement Report'
                })
                .state('reports.device-history', {
                    url: "/device-history",
                    templateUrl: "views/reports/device-history.html",
                    pageTitle: 'Device History Report'
                })
                .state('reports.devices', {
                    url: "/devices",
                    templateUrl: "views/reports/devices.html",
                    pageTitle: 'Devices Report'
                })
                .state('reports.mileage', {
                    url: "/mileage",
                    templateUrl: "views/reports/mileage.html",
                    pageTitle: 'Estimated Mileage Report'
                })
                .state('reports.no-communication', {
                    url: "/no-communication",
                    templateUrl: "views/reports/no-communication.html",
                    pageTitle: 'No Communication Report'
                })
                .state('reports.removed', {
                    url: "/removed",
                    templateUrl: "views/reports/removed.html",
                    pageTitle: 'Removed Report'
                })
                .state('reports.sales-detail', {
                    url: "/sales-detail",
                    templateUrl: "views/reports/sales-detail.html",
                    pageTitle: 'Sales Detail Report'
                })
                .state('reports.sales-summary', {
                    url: "/sales-summary",
                    templateUrl: "views/reports/sales-summary.html",
                    pageTitle: 'Sales Summary Report'
                })
                .state('reports.three-nights-out', {
                    url: "/three-nights-out",
                    templateUrl: "views/reports/three-nights-out.html",
                    pageTitle: 'Three Nights Out Report'
                })
                .state('reports.total-devices', {
                    url: "/total-devices",
                    templateUrl: "views/reports/total-devices.html",
                    pageTitle: 'Total Devices Report'
                })
                .state('reports.user-activity', {
                    url: "/user-activity",
                    templateUrl: "views/reports/user-activity.html",
                    pageTitle: 'User Activity Report'
                })
                .state('reports.weekly-heartbeat', {
                    url: "/weekly-heartbeat",
                    templateUrl: "views/reports/weekly-heartbeat.html",
                    pageTitle: 'Weekly Heartbeat Report'
                })
                .state('companies', {
                    url: "/companies",
                    templateUrl: "views/companies/companies.html",
                    pageTitle: 'Companies'
                })
        })



        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptorService');
        }])
        .config(function (RestangularProvider) {
            // Global configuration
            RestangularProvider.setBaseUrl(location.protocol + '//' + location.hostname + '/api/v1/');
        })
        .constant({'mapConstants': {
            'MAP': {
                "DEFAULT_LATITUDE": 38.9734885,
                "DEFAULT_LONGITUDE": -95.2509269,
                'MAP_TYPE_ID': google.maps.MapTypeId.HYBRID,
                'ZOOM': {
                    'DEFAULT': 2,
                    'LOCATE': 17,
                    'HISTORY': 2,
                    'MAX': 20
                }
            }
        }})
        .constant('authSettings', {
            apiServiceBaseUri: location.protocol + '//' + location.hostname + '/api/',
            clientId: 'publicClientId'
        })
        .run(['authService', function (authService) {
            authService.fillAuthData();
        }])
        .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.brandLabel = 'White Label';
            $rootScope.copyright = 'Copyright &\copy\; ' + new Date().getFullYear() + ' ' + $rootScope.brandLabel;
        }]);

})();
