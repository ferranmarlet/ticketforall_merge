var controllers = angular.module('controllers', []);


controllers.controller('loginController', function ($scope, $location) {
    this.logged = false;
    this.login = function () {
        $scope.show = true;
        $location.path('/inici');
    };

});


controllers.controller('faqController', function () {

});


controllers.controller('codiDiariController', function () {
    this.codi_diari = '4556452452';
    this.validesa = 'Valid fins el 25 Octubre 2014.';
});


controllers.controller('periodesAbsenciaController', function () {
    this.contingut = [{ dataInici: "20-12-03", dataFi: "20-12-03" }, { dataInici: "20-12-03", dataFi: "20-12-03" }, { dataInici: "20-12-03", dataFi: "20-12-03"}];

    this.editarPeriode = function () {
        console.log("esticEditant");
    };
    this.esborrarPeriode = function () {
        console.log("esticEsborrant");
    };
});

controllers.controller("perfilController", function ($translate) {
    this.canviIdioma = function (langKey) {
        $translate.use(langKey);
    };
});
