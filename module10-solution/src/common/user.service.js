(function() {
  'use strict';

  angular.module('common')
    .service('UserService', UserService);

  UserService.$inject = [];
  function UserService() {
    var service = this;
    service.user = null;

    service.saveUser = function(u) {
      service.user = angular.copy(u);
    };

    service.getUser = function() {
      return service.user;
    };

    service.isRegistered = function () {
      return !!service.user;
    };
  }
})();
