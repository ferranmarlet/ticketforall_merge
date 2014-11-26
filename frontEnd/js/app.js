var app = angular.module('ticketforall', ['controllers', 'services', 'directives', 'pascalprecht.translate', 'ngRoute'])

.config(function($translateProvider, $routeProvider) {
    $routeProvider
    .when('/faq', {
        templateUrl: 'frontEnd/views/faq.html',
        controller: 'faqController'
    })
    .when('/ticket', {
        templateUrl: 'frontEnd/views/codiDiari.html',
        controller: 'codiDiariController',
        controllerAs:'codiDiariCtrl'
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
        controller: 'periodesAbsenciaController',
        controllerAs: 'periodesAbsenciaCtrl'
    })
    .when('/perfil', {
        templateUrl: 'frontEnd/views/gestionarPerfil.html',
        controller: 'perfilController',
        controllerAs: 'perfilCtrl'
    })
    .otherwise({
        redirectTo: '/inici'
    });

    $translateProvider.useStaticFilesLoader({
        prefix: 'frontEnd/languages/',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('cat');
});