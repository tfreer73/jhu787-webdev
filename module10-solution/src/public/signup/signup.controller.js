(function() {
  'use strict';

  angular.module('public')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['SignupService', 'UserService', '$scope'];
  function SignupController(SignupService, UserService, $scope) {
    var $ctrl = this;

    $ctrl.user = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      favoriteShortName: ''
    };

    $ctrl.saved = false;
    $ctrl.favoriteInvalid = false;

    $ctrl.submit = function(form) {
      $ctrl.saved = false;
      $ctrl.favoriteInvalid = false;

      if (form.$invalid) {
        // If async validation still pending or other fields invalid — don't proceed
        return;
      }

      // Verify favorite by fetching menu item
      SignupService.getMenuItemByShortName($ctrl.user.favoriteShortName)
        .then(function(menuItem) {
          // Build the user object to save
          var userToSave = {
            firstName: $ctrl.user.firstName,
            lastName: $ctrl.user.lastName,
            email: $ctrl.user.email,
            phone: $ctrl.user.phone,
            favorite: {
              short_name: $ctrl.user.favoriteShortName,
              item: menuItem
            }
          };
          UserService.saveUser(userToSave);
          $ctrl.saved = true;
        })
        .catch(function(reason) {
          // mark favorite invalid and show message
          $ctrl.favoriteInvalid = true;
        });
    };
  }
})();
