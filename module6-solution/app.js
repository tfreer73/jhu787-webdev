(function () {
    'use strict';
    angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {

        $scope.items = "";
        $scope.message = "";
        $scope.messageColor = "";
        $scope.borderColor = "";

        $scope.checkItems = function () {
            if (!$scope.items || $scope.items.trim() === "") {
                displayMessage("Please enter data first", "red");
                return;
            }

            var itemsArray = $scope.items.split(',').map(
                function (item) { 
                    return item.trim()
                }).filter(function (item) {
                    return item.length > 0;
                }
            );

            if (itemsArray.length === 0) {
                displayMessage("Please ender data first", "red");
                return;
            }

            if (itemsArray.length <= 3) {
                displayMessage("Enjoy!", "green");
            } else {
                displayMessage("Too much!", "green");
            }

        }

        function displayMessage(msg, color) {
            $scope.message = msg;
            $scope.messageColor = color;
            $scope.borderColor = color;
        }

    }

})();