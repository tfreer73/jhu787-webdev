(function() {
  'use strict';

  angular.module('public')
    .directive('favItemExists', favItemExists);

  favItemExists.$inject = ['SignupService', '$q'];
  function favItemExists(SignupService, $q) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.favExists = function(modelValue, viewValue) {
          var value = modelValue || viewValue;

          // If the field is empty, let required validator handle it
          if (!value) {
            return $q.reject('empty');
          }

          // Return the promise from the service; resolve = valid, reject = invalid
          return SignupService.getMenuItemByShortName(value)
            .then(function(item) {
              // Valid
              return true;
            })
            .catch(function() {
              // Invalid (not found or bad)
              return $q.reject('not-found');
            });
        };
      }
    };
  }
})();
