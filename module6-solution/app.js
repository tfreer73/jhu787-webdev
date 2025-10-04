(function () {
    'use strict';
    angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        var vm = this;

        vm.items = "";
        vm.message = "";
        vm.messageColor = "";
        vm.borderColor = "";

        vm.checkItems = function () {
            if (!vm.items || vm.items.trim() === "") {
                displayMessage("Please enter data first", "red");
                return;
            }

            var itemsArray = vm.items.split(',').map(
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
            vm.message = msg;
            vm.messageColor = color;
            vm.borderColor = color;
        }

    }

})();