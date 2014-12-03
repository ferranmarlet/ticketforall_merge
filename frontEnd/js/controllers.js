var controllers = angular.module('controllers', []);


controllers.controller("mainController", function ($scope, $location, USER_ROLES, AUTH_EVENTS, Session) {
    $scope.currentUser = { userId: Session.userId, role: Session.userRole };
    $scope.idioma = "ca";
    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };

    $scope.logOut = function () {
        $scope.currentUser = null;
        Session.clear();
        $location.path('/login');
    }

    $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
        $location.path('/login');
    });
    $scope.$on(AUTH_EVENTS.notAuthorized, function () {
        $location.path('/inici');
    });
})

controllers.controller('loginController', function ($scope, $rootScope, $location, Session, AUTH_EVENTS, ticketForAllService) {

    $scope.username = "";
    $scope.password = "";
    $scope.remember = false;

    this.login = function () {
        /*
        ticketForAllService.loginUser($scope.username, $scope.password).then(function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
        }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });*/
        var user = ticketForAllService.loginUser($scope.username, $scope.password);
        //si el login es correcte (es fa amb el promise comentat de dalt)
        if($scope.remember)Session.saveSession();
        $scope.setCurrentUser(user);
        $location.path('/inici');
    };
});


controllers.controller('faqController', function (ticketForAllService) {
    this.faqs = ticketForAllService.getFAQ();
    console.dir(this.faqs);
});


controllers.controller('codiDiariController', function (ticketForAllService) {
    this.codi_diari = ticketForAllService.getCodiDiari(); 
});


controllers.controller('periodesAbsenciaController', function ($scope, ticketForAllService) {
    this.editing = -1;
    this.contingut = ticketForAllService.getPeriodesAbsencia();
    $scope.dates = { dataInici: "", dataFi: "" };

    this.editarPeriode = function (indx) {
        this.editing = indx;
        console.log(this.contingut[indx].dataInici);
        $scope.dates.dataInici = this.contingut[indx].dataInici;
        $scope.dates.dataFi = this.contingut[indx].dataFi;
    };

    this.isEditing = function (indx) {
        return this.editing == indx;
    };

    this.sendEdit = function () {
        this.editing = -1;
    };

    this.enviarEdicioPeriode = function () {
        //agafa les dataini, datafi del formulari i les envia a la api
        ticketForallService.updatePeriodeAbsencia(dataini, datafi);
    };
    this.crearPeriode = function () {
        //mostrar formulari de creacio
        console.log("esticEditant");
    };
    this.enviarDadesCreacioPeriode = function () {
        //agafa les dataini, datafi del formulari i les envia a la api
        ticketForallService.modifyPeriodeAbsencia(dataini, datafi);
    };
    this.esborrarPeriode = function () {
        //mostrar missatge de confirmació de l'esborrat
        console.log("esticEsborrant");
    };
});

controllers.controller("perfilController", function ($translate) {
    this.canviIdioma = function (langKey) {
        $scope.idioma = langKey;
        $translate.use(langKey);
        //s'ha de guardar al usuari
    };
});
