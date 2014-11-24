var app = angular.module('ticketforall', ['controllers', 'services', 'directives', 'pascalprecht.translate', 'ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/faq', {
        templateUrl: 'frontEnd/views/faq.html',
        controller: 'faqController'
    })
    .when('/ticket', {
        templateUrl: 'frontEnd/views/codiDiari.html',
        controller: 'codiDiariController'
    })
    .when('/contactar', {
        templateUrl: 'frontEnd/views/informacioEmpresaEditorial.html'
    })
    .when('/inici', {
        templateUrl: 'frontEnd/views/paginaPrincipal.html',
    })
    .when('/login', {
        templateUrl: 'frontEnd/views/login.html',
        controller: 'loginController',
        controllerAs: 'loginCtrl'
    })
    .when('/periodesAbsencia', {
        templateUrl: 'frontEnd/views/gestionarPeriodesAbsencia.html',
        controller: 'periodesAbsenciaController'
    })
    .otherwise({
        redirectTo: '/inici'
    });
}]);