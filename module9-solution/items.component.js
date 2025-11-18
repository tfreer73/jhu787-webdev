(function () {
  'use strict';

  angular.module('MenuApp')
    .component('items', {
      template: `
        <h2>{{$ctrl.categoryName}} Items:</h2>
        <ul>
          <li class="item" ng-repeat="item in $ctrl.items">
            {{ item.name }}
          </li>
        </ul>
        <a ui-sref="categories">Back to Categories</a>
      `,
      bindings: {
        items: '<',
        categoryName: '<'
      }
    });
})();
