/**
 * Created by nathanielz on 11/11/2014.
 */
(function(){
  'user-strict';

  angular.module('m2mApp').controller('formController', ['$scope','$state','$http', 'dataAccess',
      function ($scope, $state, $http, dataAccess) {


        var onUserComplete = function(response) {

          $scope.user = response.data;

        };
        $scope.search = function (order, zip) {
          dataAccess.searchOrder(order, zip)
            .then(onUserComplete);
        };


      }]);






}());
