var app = angular.module('ticketforall', ['controllers', 'services', 'directives', 'pascalprecht.translate', 'ngRoute'])

.config(function($translateProvider, $routeProvider, USER_ROLES) {
    $routeProvider
    .when('/faq', {
        templateUrl: 'frontEnd/views/faq.html',
        controller: 'faqController',
        data: { authorizedRoles: [USER_ROLES.admin, USER_ROLES.subscriptor, USER_ROLES.quiosquer] }
    })
    .when('/ticket', {
        templateUrl: 'frontEnd/views/codiDiari.html',
        controller: 'codiDiariController',
        controllerAs:'codiDiariCtrl',
        data: { authorizedRoles: [USER_ROLES.subscriptor] }
    })
    .when('/contactar', {
        templateUrl: 'frontEnd/views/informacioEmpresaEditorial.html',
        data: { authorizedRoles: [USER_ROLES.admin, USER_ROLES.subscriptor, USER_ROLES.quiosquer] }
    })
    .when('/inici', {
        templateUrl: 'frontEnd/views/paginaPrincipal.html',
        data: { authorizedRoles: [USER_ROLES.admin, USER_ROLES.subscriptor, USER_ROLES.quiosquer] }
    })
    .when('/login', {
        templateUrl: 'frontEnd/views/login.html',
        controller: 'loginController',
        controllerAs: 'loginCtrl',
        data: { authorizedRoles: [USER_ROLES.guest] }
    })
    .when('/periodesAbsencia', {
        templateUrl: 'frontEnd/views/gestionarPeriodesAbsencia.html',
        controller: 'periodesAbsenciaController',
        controllerAs: 'periodesAbsenciaCtrl',
        data: { authorizedRoles: [USER_ROLES.subscriptor] }
    })
    .when('/perfil', {
        templateUrl: 'frontEnd/views/gestionarPerfil.html',
        controller: 'perfilController',
        controllerAs: 'perfilCtrl',
        data: { authorizedRoles: [USER_ROLES.admin, USER_ROLES.subscriptor, USER_ROLES.quiosquer] }
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

app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  quiosquer: 'quiosquer',
  subscriptor: 'subscriptor',
  guest:'guest'
});

app.run(function ($rootScope, AUTH_EVENTS, Session) {
    Session.restoreUser();
    $rootScope.$on('$routeChangeStart', function (event, next) {
        var authorizedRoles = next.data.authorizedRoles;
        if (!Session.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            if (Session.isAuthenticated()) {
                // user is not allowed
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else {
                // user is not logged in
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
        }
    });
})