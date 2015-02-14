(function() {

    'use-strict';

    angular.module('m2mApp')
        .controller('deviceDetailsController',
        ['$scope', 'Restangular', 'authService', 'toaster', '$stateParams',
            function ($scope, Restangular, authService, toaster, $stateParams) {
                $scope.deviceDetails = {};

                $scope.deviceDetails.deviceId = $stateParams.deviceId;
            }
        ]
    );

})();