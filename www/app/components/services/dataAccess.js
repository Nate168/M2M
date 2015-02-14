/**
 * Created by nathanielz on 11/19/2014.
 */

angular.module('m2mApp')
  .factory('dataAccess', ['$http',
    function ($http){
      return {
        searchOrder: function(order, zip){
          return $http.get("http://localhost:4448/api/orders/" + order + "/zip/" + zip);
        }
      }
    }]);
