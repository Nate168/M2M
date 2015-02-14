(function() {

    'use-strict';

    angular.module('m2mApp')
        .controller('loginController',
        ['$scope', '$location', 'authService',
            function ($scope, $location, authService){

                // UI indicators.
                $scope.submitted = false;
                $scope.message = "";

                $scope.loginData = {
                    userName: "",
                    password: ""
                };

                // Log in user
                $scope.login = function () {

                    $scope.submitted = true;
                    $scope.message = "";

                    // Authorize user.
                    authService.login($scope.loginData)
                        .then(function () {
                            $location.path('/');
                        },
                        function (loginError) {
                            $scope.submitted = false;
                            $scope.message = loginError.error_description;
                        }
                    );
                };
            }
        ]
    );

})();