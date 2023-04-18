'use strict';
angular.module('App', ['ngSanitize', 'ngMessages', 'pascalprecht.translate'])
.run(['$translate', function ($translate) {
  $translate.use('current');
}]).config(['$translateProvider', 'DICTIONARY', function($translateProvider, DICTIONARY) {

  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.translations('current', DICTIONARY);

}]);
