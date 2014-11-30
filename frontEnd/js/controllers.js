var controllers = angular.module('controllers', []);


controllers.controller('loginController', function ($scope, $location) {
    this.logged = false;
    this.login = function () {
        $scope.show = true;
        $location.path('/inici');
    };

});


controllers.controller('faqController', function (ticketForAllService) {
    this.faqs = ticketForAllService.getFAQ();
});


controllers.controller('codiDiariController', function (ticketForAllService) {
    this.codi_diari = ticketForAllService.getCodiDiari(); 
});


controllers.controller('periodesAbsenciaController', function (ticketForAllService) {
    this.contingut = ticketForAllService.getPeriodesAbsencia();

    this.editarPeriode = function () {
        //mostrar formulari d'edició 
        console.log("esticEditant");
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
        $translate.use(langKey);
    };
});
