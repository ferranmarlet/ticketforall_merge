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

});


controllers.controller('periodesAbsenciaController', function () {

});
