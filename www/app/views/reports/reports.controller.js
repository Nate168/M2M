(function() {

  'use-strict';

  angular.module('m2mApp')
    .controller('reportController', ['$scope', '$state', function($scope, $state){
      // Report type select options.
      $scope.reportTypeOptions =[
        { name: "Daily Install", value: "reports.daily-install" },
        { name: "Device History", value: "reports.device-history" },
        { name: "Devices", value: "reports.devices" },
        { name: "Estimated Mileage", value: "reports.mileage" },
        { name: "No Communication", value: "reports.no-communication" },
        { name: "Remove Devices", value: "reports.removed" },
        { name: "Sales Detailt", value: "reports.sales-detail" },
        { name: "Sales Summary", value: "reports.sales-summary" },
        { name: "Three Nights Out", value: "reports.three-nights-out" },
        { name: "Total Devices", value: "reports.total-devices" },
        { name: "User Activity", value: "reports.user-activity" },
        { name: "Weekly Heartbeat", value: "reports.weekly-heartbeat" }
      ];

      $scope.showReport = function(value){
        if(!value) return;

        $state.go(value);
      };
    }])
  ;
})();
