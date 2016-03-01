(function() {
  'use strict';

  angular
    .module('component.datetimePicker.directive', ['component.valuePicker'])
    .directive('datetimePicker', datetimePickerDirective);

  datetimePickerDirective.$inject = [];

  function datetimePickerDirective() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        ngModel: '=',
        daysToNow: '@',
        daysFromNow: '@'
      },
      templateUrl: 'components/datetime_picker/datetimePicker.html',
      link: function(scope) {
        var momentVal = moment(scope.ngModel, 'yyyy/M/d h:mm');
        !momentVal.isValid() && (momentVal = moment());

        var minMoment = moment().day(-(scope.daysToNow || (366 * 40)));
        var maxMoment = moment().day(scope.daysFromNow || (366 * 6));

        scope.years = makeArray(minMoment.year(), maxMoment.year());
        scope.months = makeMonths(minMoment.month(), maxMoment.month());
        scope.days = makeDays(momentVal, minMoment, maxMoment);
        scope.hours = makeArray(0, 23);
        scope.minutes = makeArray(0, 59);

        scope.$watch('value', function(value) {
          scope.ngModel = composeDatetime(value);
        }, true);

        scope.value = {
          'year': momentVal.year(),
          'month': momentVal.month(),
          'date': momentVal.date(),
          'hour': 10,
          'minute': 0
        };

        scope.$watch('value.year', updateDays);
        scope.$watch('value.month', updateDays);

        function updateDays() {
          var targetMonth = moment([scope.value['year'], scope.value['month']]);
          scope.days = makeDays(targetMonth, minMoment, maxMoment);
        }
      }
    };
  }

  function composeDatetime(val) {
    return val['year'] + '/' + fillZeros(val['month'] + 1) + '/' + fillZeros(val['date']) + ' ' +
      fillZeros(val['hour']) + ':' + fillZeros(val['minute']);
  }

  function fillZeros(val) {
    var len = (val + '').length;
    return len > 1 ? val : '0' + val;
  }

  function makeDays(now, minMoment, maxMoment) {
    var thisMonth = now.month();
    var thisDate = now.date();
    if (thisMonth == minMoment.month()) {
      return makeArray(thisDate, minMoment.daysInMonth());
    } else if (thisMonth == maxMoment.month()) {
      return makeArray(1, thisDate);
    } else {
      return makeArray(1, now.daysInMonth());
    }
  }

  function makeMonths(from, to) {
    return makeArray(from, to, 0, 11);
  }

  function makeArray(from, to, min, max) {
    var res = [];
    if (from <= to) {
      for (var i = from; i <= to; i++) {
        res.push(i);
      }
    } else {
      var bottom = min || to;
      var top = max || from;
      for (var i = from; i <= top; i++) {
        res.push(i);
      }
      for (var i = bottom; i <= to; i++) {
        res.push(i);
      }
    }
    return res;
  }
})();