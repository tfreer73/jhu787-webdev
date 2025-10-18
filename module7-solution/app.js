(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('tripleDollar', TripeDollarFilter);

    // ToBuyController
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getToBuyItems();
        console.log(toBuy.items);

        toBuy.buyItem = function(index) {
            ShoppingListCheckOffService.buyItem(index);
        };
    }

    // AlreadyBoughtController
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;

        bought.items = ShoppingListCheckOffService.getBoughtItems();
    }

    // ShoppingListCheckOffService
    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
            {name: "cookies", quantity: 10, pricePerItem: 2},
            { name: "soda bottles", quantity: 5, pricePerItem: 1.5 },
            { name: "chips bags", quantity: 3, pricePerItem: 2.5 },
            { name: "apples", quantity: 8, pricePerItem: 0.75 },
            { name: "bananas", quantity: 6, pricePerItem: 0.5 }
        ];

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        var boughtItems = [];

        service.getBoughtItems = function() {
            return boughtItems;
        };

        service.buyItem = function(itemIndex) {
            var item = toBuyItems[itemIndex];
            toBuyItems.splice(itemIndex, 1);
            boughtItems.push(item);
        };
    }

    // TripleDollarSignFilter
    function TripeDollarFilter() {
        return function(input) {
            input = input || 0;
            return '$$$' + input.toFixed(2);
        };
    }

})();