(function () {
  'use strict';

  angular.module('MenuApp')
    .component('items', {
      template: `
        <h2>Items in Category: {{$ctrl.categoryName}}</h2>
        <ul>
          <li class="item" ng-repeat="item in $ctrl.items">
            {{ item.name }} — {{ item.description }}
          </li>
        </ul>
        <a ui-sref="categories">← Back to Categories</a>
      `,
      bindings: {
        items: '<',
        categoryName: '<'
      }
    });
})();
