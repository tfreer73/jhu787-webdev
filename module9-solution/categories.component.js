(function() {
  'use strict';

  angular.module('MenuApp')
    .component('categories', {
      template: `
        <h2>Menu Categories</h2>
        <ul>
          <li class="category" ng-repeat="cat in $ctrl.categories">
            <a ui-sref="items({categoryShortName: cat.short_name})">
              {{ cat.name }} ({{ cat.short_name }})
            </a>
          </li>
        </ul>
      `,
      bindings: {
        categories: '<'
      }
    });
})();
