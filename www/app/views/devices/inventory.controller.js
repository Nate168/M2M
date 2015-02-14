(function() {

    'use-strict';

    angular.module('m2mApp')
        .controller('deviceInventoryController',
        ['$scope', 'Restangular', 'mapConstants', 'authService', 'toaster', '$state',
            function ($scope, Restangular, mapConstants, authService, toaster, $state) {
                $scope.deviceInventory = {};

                $scope.authentication = authService.authentication;

                toaster.pop('wait', "Getting Device Inventory", null, 0);

                Restangular.one('devices', $scope.authentication.partyId).getList('device-profiles')
                    .then(function(devices) {
                        $scope.deviceInventory.devices = devices;

                        toaster.clear();
                    }
                );

                var columnDefs = [
                    {
                        field: 'aliasName',
                        displayName: 'Device Alias',
                        width: '120px'
                    },
                    { field: 'deviceSerialNumber', displayName: 'Device S/N', width: '150px' },
                    {
                        field: 'imei',
                        displayName: 'IMEI',
                        width: '150px'
                    },
                    { field: 'vehicleType', displayName: 'Vehicle Description', width: '250px' },
                    { field: 'vehicleIdentificationNumber', displayName: 'VIN', width: '180px' },
                    {
                        field: 'activityFlag', displayName: 'Active?', width: '80px',
                        cellTemplate: '<div class="ngCellText">{{ row.getProperty(col.field) | yesNo }}</div>'
                    },
                    {
                        field: 'options', displayName: 'Edit Vehicle',
                        cellTemplate: '<a class="glyphicon glyphicon-pencil" ng-click="goToDetails({{row.getProperty(\'imei\')}})" title="Edit {{row.getProperty(\'imei\')}}" style="padding-left: 10px; padding-top: 4px; cursor:pointer;"></a>',
                        width: '100px;'
                    }
                ];

                var minHeight = 300;

                $scope.deviceInventory.gridOptions  = {
                    data: 'deviceInventory.devices',
                    columnDefs: columnDefs,
                    enableRowSelection: false,
                    enableColumnResize: true,
                    plugins: [new ngGridFlexibleHeightPlugin(minHeight)]
                };

                $scope.goToDetails = function(value){
                    if(!value) return;
                    $state.go('devices.details', { deviceId: value });
                };
            }
        ]
    );

})();