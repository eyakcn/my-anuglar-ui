(function() {
  'use strict';

  angular
    .module('component.valuePicker.directive', [])
    .directive('valuePicker', valuePickerDirective);

  valuePickerDirective.$inject = [];

  function valuePickerDirective() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        ngModel: '=',
        postfix: '@',
        minLength: '@',
        values: '=',
        offset: '@'
      },
      templateUrl: 'components/value_picker/valuePicker.html',
      controller: valuePickerCtrl,
      controllerAs: 'vm',
      link: function(scope) {
        scope.$watch('index', function(index) {
          scope.ngModel = scope.values[index];
          scope.value = scope.offset ? scope.ngModel + parseInt(scope.offset) : scope.ngModel;
          var minLen = scope.minLength ? parseInt(scope.minLength) : 0;
          var valLen = (scope.value + '').length;
          scope.prefix = placeHolder(minLen - valLen, '0');
        });
        scope.$watch('values', function(values) {
          scope.index = getIndex(scope.ngModel, values);
        });
        scope.index = getIndex(scope.ngModel, scope.values);

        function placeHolder(len, n) {
          var res = '';
          for (var i = 0; i < len; i++) {
            res += n;
          }
          return res;
        }

        function getIndex(value, values) {
          if (_.contains(values, value)) {
            return _.indexOf(values, value);
          }

          if (typeof(value) === 'number') {
            if (value < values[0]) {
              return 0;
            }
            if (value > values[values.length - 1]) {
              return values.length - 1;
            }
          }
          return 0;
        }
      }
    };
  }

  valuePickerCtrl.$inject = ['$scope'];

  function valuePickerCtrl($scope) {
    var vm = this;

    vm.showNext = showNext;
    vm.showPrev = showPrev;

    function showNext() {
      $scope.index = ($scope.index + 1) % $scope.values.length;
    }

    function showPrev() {
      $scope.index = ($scope.index - 1 + $scope.values.length) % $scope.values.length;
    }
  }
})();