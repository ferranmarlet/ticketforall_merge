var services = angular.module('services', []);

services.service("Session", function() {
  this.restoreUser = function() {
    if(localStorage.userId) {
        this.id = localStorage.id;
        this.userId = localStorage.userId;
        this.userRole = localStorage.userRole;
    }
    else if(sessionStorage.userId) {
        this.id = sessionStorage.id;
        this.userId = sessionStorage.userId;
        this.userRole = sessionStorage.userRole;
    }
    else {
        this.id = null;
        this.userId = null;
        this.userRole = 'guest';
    }
  };

  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
    sessionStorage.id = sessionId;
    sessionStorage.userId = userId;
    sessionStorage.userRole = userRole;
  };

  this.clear = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
    localStorage.clear();
    sessionStorage.clear();
  };

  this.saveSession = function() {
     localStorage.id =  this.id;
     localStorage.userId = this.userId;
     localStorage.userRole = this.userRole;
  };

  this.isAuthenticated = function() {
    return !!this.userId;
  };
  this.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
    }
    return (this.isAuthenticated() && (authorizedRoles.indexOf(this.userRole) != -1));
  };
  return this;
});

services.factory("ticketForAllService", function ($http, Session) {
    var service = {

        loginUser: function (name, pass) {
            var msg = {"username":name,"password":pass};
            return $http.post('/public/api/users/login', JSON.stringify(msg)).then(function (response){
               var user = null;
               if(response.data.result =='ok'){
                  var id = response.data.token;
                  user = {userId: name, role: response.data.rol};
                  Session.create(id, user.userId, user.role);
               }
               return user;
            });
        },

        getPeriodesAbsencia: function () {
            return [{ dataInici: "20-12-03", dataFi: "20-12-03" }, { dataInici: "20-12-03", dataFi: "20-12-03" }, { dataInici: "20-12-03", dataFi: "20-12-03"}];
        },

        setPeriodeAbsencia: function(dataini, datafi) {

        },

        deletePeriodeAbsencia: function(dataini, datafi) {

        },

        updatePeriodeAbsencia: function(dataini, datafi) {
            return true;
        },

        getCodiDiari: function () {
            return {codi:'456789', validesa:'26-11-2014'};
        },

        getFAQ: function () {
            return [{question: "Lorem ipsum dolor sit amet?", answer: "Duis tellus. Donec ante dolor."},
                    {question: "Lorem ipsum dolor sit amet?", answer: "Duis tellus. Donec ante dolor."},
                    {question: "Lorem ipsum dolor sit amet?", answer: "Duis tellus. Donec ante dolor."},
                    {question: "Lorem ipsum dolor sit amet?", answer: "Duis tellus. Donec ante dolor."}];
        },
    };

    return service;
});
