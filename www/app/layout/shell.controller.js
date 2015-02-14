(function() {

    'use-strict';

    angular.module('m2mApp')
        .controller('shellController', ['$scope', 'authService', function($scope , authService){

            $scope.authentication = authService.authentication;

            // Log out user
            $scope.logOut = function () {

                $scope.submitted = true;
                $scope.message = "";

                // Un-Authorize user.
                authService.logOut()
                    .then(function () {
                        $location.path('/login');
                    }
                );
            };
        }])
    ;

})();
