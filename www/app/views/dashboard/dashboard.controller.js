(function() {

  'use-strict';

// Load visualization packages.
  google.load('visualization', '1', {
    packages: ['corechart']
  });

  angular.module('m2mApp')
    .controller('mpgChartController', ['$scope', 'm2mDashboardService', function ($scope, m2mDashboardService) {
      // Get chart data
      var mpgChartData = m2mDashboardService.getMpgChartData();

      var mpgChartDataTable = google.visualization.arrayToDataTable(mpgChartData);

      var mpgChartOptions = {
        title: '30 Day Fleet MPG'
      };

      var mpgChart = new google.visualization.LineChart(document.getElementById('mpg-chart'));

      mpgChart.draw(mpgChartDataTable, mpgChartOptions);
    }])
    .controller('alertsChartController', ['$scope', 'm2mDashboardService', function ($scope, m2mDashboardService) {
      // Get chart data
      var alertChartData = m2mDashboardService.getAlertChartData();

      var alertChartDataTable = google.visualization.arrayToDataTable(alertChartData);

      var alertChartOptions = {
        title: 'Fleet event Alerts for Last 30 Days'
      };

      var alertChart = new google.visualization.PieChart(document.getElementById('alert-chart'));
      alertChart.draw(alertChartDataTable, alertChartOptions);
    }])
    .controller('mileageChartController', ['$scope', 'm2mDashboardService', function ($scope, m2mDashboardService) {
      // Get chart data
      var mileageChartData = m2mDashboardService.getMileageChartData();

      var mileageChartDataTable = google.visualization.arrayToDataTable(mileageChartData);

      var mileageChartOptions = {
        title: '60 Day Fleet Milage Comparison'
      };

      var mileageChart = new google.visualization.BarChart(document.getElementById('mileage-chart'));
      mileageChart.draw(mileageChartDataTable, mileageChartOptions);
    }])
    .controller('maintainChartController', ['$scope', 'm2mDashboardService', function ($scope, m2mDashboardService) {
      // Get chart data
      var maintainChartData = m2mDashboardService.getMaintainChartData();

      var maintainChartDataTable = google.visualization.arrayToDataTable(maintainChartData);

      var maintainChartOptions = {
        title: 'Vehicle Maintainence Indicators',
        vAxis: { title: "Accelleration/Braking" },
        hAxis: { title: "Month" },
        seriesType: "bars",
        series: { 5: { type: "line" } }
      };

      var maintainChart = new google.visualization.ComboChart(document.getElementById('maintain-chart'));
      maintainChart.draw(maintainChartDataTable, maintainChartOptions);
    }])
    .factory('m2mDashboardService', ['$resource', function ($resource) {
      return {
        'getMpgChartData': function () {
          // Create a resource object for the api.
          var result = [
            ['Day', 'Vovo S40', 'Smart Car', 'Chevy Suburban'],
            ['1', 22.5, 26.9, 13.7],
            ['2', 22.5, 29.9, 16.0],
            ['3', 22.2, 36.9, 20.3],
            ['4', 19.0, 36.9, 20.2],
            ['5', 22.1, 36.4, 20.7],
            ['6', 22.0, 35.7, 19.1],
            ['7', 20.9, 34.8, 17.8],
            ['8', 12.6, 39.6, 18.1],
            ['9', 11.8, 40.5, 19.1],
            ['10', 13.3, 41.8, 18.9],
            ['11', 13.1, 43.5, 18.9],
            ['12', 15.2, 44.4, 20.3],
            ['13', 18.0, 25.9, 22.4],
            ['14', 21.1, 30.2, 25.0],
            ['15', 22.0, 35.7, 26.3],
            ['16', 22.6, 36.8, 25.9],
            ['17', 23.5, 39.0, 25.7],
            ['18', 24.7, 40.8, 20.7],
            ['19', 25.1, 42.7, 18.7],
            ['20', 26.0, 42.6, 21.6],
            ['21', 26.0, 37.7, 25.1],
            ['22', 26.0, 43.5, 24.4],
            ['23', 27.0, 43.6, 23.7],
            ['24', 27.0, 32.2, 12.0],
            ['25', 27.0, 35.5, 16.0],
            ['26', 26.3, 40.9, 20.6],
            ['27', 26.5, 41.5, 23.7],
            ['28', 26.4, 38.8, 23.1],
            ['29', 26.4, 38.0, 24.8],
            ['30', 26.4, 36.2, 24.2]
          ];

          return result;
        },
        'getAlertChartData': function () {
          // Create a resource object for the api.
          var result = [
            ['Events', 'Event Alerts per Day'],
            ['Start/Driving', 114],
            ['Parked/Stopped', 235],
            ['Geo-Zone X', 600],
            ['Idle/Caution', 212],
            ['Alerts', 70]
          ];

          return result;
        },
        'getMileageChartData': function () {
          //Create a resource object for the api.
          var result = [
            ['Device Alias', 'Current Month', 'Last Month'],
            ['Vovo S40', 1000, 400],
            ['Smart Car', 660, 1120],
            ['Chevy Suburban', 1030, 540]
          ];

          return result;
        },
        'getMaintainChartData': function () {
          // Create a resource object for the api.
          var result = [
            ['Month', 'Vovo S40', 'Smart Car', 'Chevy Suburban', 'Average'],
            ['2014/03', 165, 522, 998, 614.6],
            ['2014/04', 135, 599, 1268, 682],
            ['2014/05', 157, 587, 807, 623],
            ['2014/06', 139, 615, 968, 609.4],
            ['2014/07', 136, 629, 1026, 569.6]
          ];

          return result;
        }
      }
    }])
  ;
})();
