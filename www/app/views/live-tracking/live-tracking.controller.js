(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name m2mApp.controller:liveTrackingController
     * @description
     * # LiveTrackingCtrl
     * Controller of the m2mApp
     */
    angular.module('m2mApp')
        .controller('liveTrackingController',
        ['$scope', 'Restangular', 'mapConstants', 'authService', 'toaster', function ($scope, Restangular, mapConstants, authService, toaster) {
            $scope.liveTracking = {};
            $scope.liveTracking.markers = [];
            $scope.liveTracking.pointLinks = [];

            $scope.authentication = authService.authentication;

            toaster.pop('wait', "Getting Devices", null, 0, 'template');

            //  /api/v1/devices/:partyId/devicelastlocations
            Restangular.one('devices', $scope.authentication.partyId).getList('devicelastlocations')
                .then(function(devices) {
                    $scope.liveTracking.devices = devices;

                    angular.forEach($scope.liveTracking.devices, function(device, key) {
                        var marker = {
                            title: device.deviceAlias,
                            latitude: device.latitude,
                            longitude: device.longitude
                        };

                        $scope.liveTracking.markers.push(marker);
                    });

                    toaster.clear();

                }, function(response) {
                    toaster.pop('error', "Error Getting Devices: " + response.status, null, 0);
                }
            );

            $scope.mapCenter = {
                "latitude": mapConstants.MAP.DEFAULT_LATITUDE,
                "longitude": mapConstants.MAP.DEFAULT_LONGITUDE,
                "zoomLevel": mapConstants.MAP.ZOOM.DEFAULT
            };

            $scope.clusterOptions = {
                maxZoom: 16, // Default is null
                gridSize: 20 // Default is 60
            };

            $scope.goToLocation = function (latitude, longitude) {
                $scope.mapCenter = { latitude: latitude, longitude: longitude, zoomLevel: 8 };
                if (!$scope.$$phase) $scope.$apply("mapCenter");
            };

            // Toggle full screen
            $scope.toggleFullScreen = function () {
                $scope.isFullscreen = !$scope.isFullscreen;
            };
        }])
    ;

})();