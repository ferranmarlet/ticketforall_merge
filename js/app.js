var app = angular.module('ticketforall', ['controllers', 'services', 'directives', 'pascalprecht.translate', 'ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider
      .when('/faq', {
          templateUrl: 'views/faq.html',
          controller: 'faqController'
      })
      .when('/ticket', {
          templateUrl: 'views/ticket.html',
          controller: 'PhoneDetailCtrl'
      })
      .when('/contactar', {
          templateUrl: 'views/contactar.html',
          controller: 'PhoneDetailCtrl'
      })
      .when('/inici', {
          templateUrl: 'views/inici.html',
          controller: 'PhoneDetailCtrl'
      })
      .otherwise({
          redirectTo: '/inici'
      });
  } ]);