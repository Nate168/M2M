(function() {

  'use-strict';

  angular.module('m2mApp')
    .controller('liveController',
    ['$scope', 'Restangular', 'authService',
      function ($scope, Restangular, authService) {
        $scope.liveDevices = {};
      }
    ]
  );

})();
