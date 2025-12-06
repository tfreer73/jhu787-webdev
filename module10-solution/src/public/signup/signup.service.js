(function() {
  'use strict';

  angular.module('common')
    .service('SignupService', SignupService);

  SignupService.$inject = ['$http', '$q'];
  function SignupService($http, $q) {
    var service = this;

    // Parse short names like "L1" or "A10" -> { category: 'L', index: 0 }
    function parseShortName(shortName) {
      if (!shortName || typeof shortName !== 'string') {
        return null;
      }
      var s = shortName.trim().toUpperCase();
      var letters = s.match(/^[A-Z]+/);
      var digits = s.match(/\d+$/);
      if (!letters || !digits) {
        return null;
      }
      return {
        category: letters[0],
        index: parseInt(digits[0], 10) - 1
      };
    }

    // Returns a promise:
    //  - resolves with menu item object when found
    //  - rejects with 'invalid-format' / 'not-found' / 'http-error'
    service.getMenuItemByShortName = function(shortName) {
      var parsed = parseShortName(shortName);
      if (!parsed) {
        return $q.reject('invalid-format');
      }

      // Construct the URL exactly as specified in the assignment
      var url = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/' +
                encodeURIComponent(parsed.category) +
                '/menu_items/' + encodeURIComponent(parsed.index) + '.json';

      return $http.get(url).then(function(response) {
        if (response.data === null) {
          return $q.reject('not-found');
        }
        return response.data;
      }, function() {
        return $q.reject('http-error');
      });
    };

    // expose parse helper for tests
    service._parseShortName = parseShortName;
  }
})();
