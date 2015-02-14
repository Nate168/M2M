(function() {
    'use-strict';

    angular.module('m2mApp')
        .controller('toasterController', function ($scope, toaster) {

            $scope.pop = function(){
                //toaster.pop('success', "title", 'Its address is https://google.com.', 15000, 'trustedHtml', 'goToLink');
                //toaster.pop('success', "title", '<ul><li>Render html</li></ul>', 5000, 'trustedHtml');
                //toaster.pop('error', "title", '<ul><li>Render html</li></ul>', null, 'trustedHtml');
                toaster.pop('wait', "title", null, 0, 'template');
                //toaster.pop('warning', "title", "myTemplate.html", null, 'template');
                //toaster.pop('note', "title", "text");
            };

            $scope.goToLink = function(toaster) {
                var match = toaster.body.match(/http[s]?:\/\/[^\s]+/);
                if (match) $window.open(match[0]);
                return true;
            };

            $scope.clear = function(){
                toaster.clear();
            };

        });

})();