(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    // Controller
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrow = this;
        narrow.searchTerm = "";
        narrow.found = [];

        narrow.narrowItDown = function () {
            if (!narrow.searchTerm || narrow.searchTerm.trim().length === 0) {
                narrow.found = [];
                return;
            }

            MenuSearchService.getMatchedMenuItems(narrow.searchTerm).then(function (foundItems) {
                narrow.found = foundItems;
            })
            .catch(function (err) {
                narrow.found = [];
                console.error('Error fetching menu items:', err);
            });
        };

        narrow.removeItem = function (index) {
            narrow.found.splice(index, 1);
        };
    }

    // Service
    MenuSearchService.$inject = ['$http', '$q'];
    function MenuSearchService($http, $q) {
        var service = this;
        var MENU_URL = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json';

        service.getMatchedMenuItems = function (searchTerm) {
            var deferred = $q.defer();

            $http.get(MENU_URL).then(function (response) {
                var data = response.data;
                var allItems = [];

                // Flatten all menu_items arrays across categories (A, B, C, etc.)
                for (var categoryKey in data) {
                    if (data.hasOwnProperty(categoryKey)) {
                        var category = data[categoryKey];
                        if (category && Array.isArray(category.menu_items)) {
                            allItems = allItems.concat(category.menu_items);
                        }
                    }
                }

                var term = searchTerm.toLowerCase();
                var found = [];

                // Match search term ONLY in description
                for (var i = 0; i < allItems.length; i++) {
                    var item = allItems[i];
                    var description = (item.description || '').toLowerCase();

                    if (description.indexOf(term) !== -1) {
                        found.push(item);
                    }
                }

                deferred.resolve(found);
            }).catch(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };
    }

    // Directive
    function FoundItemsDirective() {
        return {
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            templateUrl: 'foundItems.html',
            controller: FoundItemsDirectiveController,
            controllerAs: 'ctrl',
            bindToController: true
        };
    }

    // Directive Controller
    function FoundItemsDirectiveController() {
        var ctrl = this;
    }

})();
