(function() {

  'use-strict';

  angular.module('commonFilters', [])
    .filter('dateTimeUtcToLocal', function ($filter) {
      return function (input, format) {
        if (input === null || !moment(input).isValid()) {
          return "INVALID_DATE";
        }

        var utcTime = moment.utc(input).format();

        var _date = new Date(utcTime);

        if (format === null) { return _date; }

        _date = $filter('date')(new Date(utcTime), format);

        return _date;
      };
    })
    .filter('yesNo', function ($filter) {
      // Convert 1, 0, true, false to Yes or No.
      return function (input) {
        return input ? 'Yes' : 'No';
      }
    })
  ;

})();
