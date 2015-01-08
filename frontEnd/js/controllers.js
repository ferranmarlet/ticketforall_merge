var controllers = angular.module('controllers', []);


controllers.controller("mainController", function ($scope, $location, USER_ROLES, AUTH_EVENTS, Session) {
    $scope.currentUser = { userId: Session.userId, role: Session.userRole };
    $scope.idioma = "ca";
    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };
    $scope.isAdmin = function() {
      if($scope.currentUser) return $scope.currentUser.role == USER_ROLES.admin;
      else return false;
   };
   $scope.isQuiosquer = function() {
      if($scope.currentUser)return $scope.currentUser.role == USER_ROLES.quiosquer;
      else return false;
   }
   $scope.isSubscriptor = function() {
      if($scope.currentUser)return $scope.currentUser.role == USER_ROLES.subscriptor;
      else return false;
   }

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
        ticketForAllService.loginUser($scope.username, $scope.password).then(function (user) {
           if(user != null){
             $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
             $scope.setCurrentUser(user);
             if($scope.remember)Session.saveSession();
             $scope.setCurrentUser(user);
             $location.path('/inici');
          }
          else {
             $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
             alert("Nom d'usuari o contrassenya erronis");
          }
        }, function () {
           alert("Nom d'usuari o contrassenya erronis");
           $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
});


controllers.controller('faqController', function (ticketForAllService) {
    this.faqs = ticketForAllService.getFAQ();
});


controllers.controller('codiDiariController', function (ticketForAllService, $scope) {
   ticketForAllService.getCodiDiari().then(function(data) {
      if(data != 0) {
         $scope.codi_diari = data;
      }
      else {
         $scope.codi_diari = "No tens un periode d'absència actualment.";
      }
   });
});


controllers.controller('periodesAbsenciaController', function ($scope, ticketForAllService) {
    this.editing = -1;
    $scope.contingut =[];
    $scope.creating = false;
    ticketForAllService.getPeriodesAbsencia().then(function(data) {
      $scope.contingut = data;
    });
    $scope.dates = { dataInici: "", dataFi: "" };
    $scope.periodeId ='';

    this.editarPeriode = function (indx) {
        this.editing = indx;
        $scope.dates.dataInici = '';
        $scope.dates.dataFi = '';
        $scope.periodeId = $scope.contingut[indx].id;
    };

    this.isEditing = function (indx) {
        return this.editing == indx;
    };

    this.sendEdit = function () {
        this.editing = -1;
    };

    this.enviarEdicioPeriode = function () {
        //agafa les dataini, datafi del formulari i les envia a la api
        this.editing = -1;
        if(!$scope.creating) {
           ticketForAllService.updatePeriodeAbsencia($scope.periodeId, $scope.dates.dataInici, $scope.dates.dataFi).then(function(data) {
              if(data) {
                alert("Els canvis s'han realitzat correctament");
                ticketForAllService.getPeriodesAbsencia().then(function(data) {
                   $scope.contingut = data;
                });
             }
             else {
                alert("Hi ha algut un error. Torna-ho a provar més tard.");
             }
          });
       }
       else {
          $scope.creating = false;
          ticketForAllService.setPeriodeAbsencia($scope.dates.dataInici, $scope.dates.dataFi).then(function(data) {
             if(data) {
                alert("El periode s'ha afegit correctament");
                ticketForAllService.getPeriodesAbsencia().then(function(data) {
                   $scope.contingut = data;
                });
             }
             else {
                alert("Hi ha algut un error. Torna-ho a provar més tard.");
             }
          });
       }
    };

    this.crearPeriode = function () {
        $scope.creating = true;
        $scope.contingut.unshift({startdate:'', enddate:''});
        $scope.dates.dataInici = '';
        $scope.dates.dataFi='';
        this.editing = 0;
    };

    this.esborrarPeriode = function (indx) {
        //mostrar missatge de confirmació de l'esborrat
        var r = confirm("De veritat vols esborrar el periode?");
        if (r) {
           ticketForAllService.deletePeriodeAbsencia($scope.contingut[indx].id).then(function(data) {
             if(data) {
                ticketForAllService.getPeriodesAbsencia().then(function(data) {
                   $scope.contingut = data;
                });
             }
          });
        }
    };
});

controllers.controller("perfilController", function ($translate, $scope) {
    this.canviIdioma = function (langKey) {
        $scope.idioma = langKey;
        $translate.use(langKey);
        //s'ha de guardar al usuari
    };
});
