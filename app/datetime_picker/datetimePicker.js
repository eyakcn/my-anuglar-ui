(function() {
  'use strict';

  angular.module('myApp.datetimePicker', ['ngRoute', 'component.datetimePicker'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/datetimePicker', {
        templateUrl: 'datetime_picker/datetimePicker.html',
        controller: 'DatetimePickerCtrl',
        controllerAs: 'vm'
      });
    }])

    .controller('DatetimePickerCtrl', DatetimePickerCtrl);

  DatetimePickerCtrl.$inject = [];

  function DatetimePickerCtrl() {
    var vm = this;

    activate();

    ///////////

    function activate() {
      vm.datetime = '2016/02/26 07:30';
    }
  }
})();