(function() {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: 
        '<h3>Welcome! Choose a category to view items.</h3><a ui-sref="categories">View Categories</a>'
      })

      .state('categories', {
        url: '/categories',
        template: '<categories categories="$ctrl.categories"></categories>',
        controller: 'CategoriesController as $ctrl',
        resolve: {
          categories: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories()
              .then(response => response.data);
          }]
        }
      })

      .state('items', {
        url: '/items/{categoryShortName}',
        template: '<items items="$ctrl.items" category-name="$ctrl.categoryName"></items>',
        controller: 'ItemsController as $ctrl',
        resolve: {
          itemsResponse: ['$stateParams', 'MenuDataService',
            function($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                .then(response => response.data);
            }]
        }
      });
  }

  angular.module('MenuApp')
    .controller('CategoriesController', CategoriesController)
    .controller('ItemsController', ItemsController);

  CategoriesController.$inject = ['categories'];
  function CategoriesController(categories) {
    var $ctrl = this;
    $ctrl.categories = categories;
  }

  ItemsController.$inject = ['itemsResponse'];
  function ItemsController(itemsResponse) {
    var $ctrl = this;
    $ctrl.items = itemsResponse.menu_items;
    $ctrl.categoryName = itemsResponse.category.name;
  }
})();
