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
          return $http.get('/public/api/periode_absencia/'+Session.id).then(function(response) {
             return response.data;
          });
        },

        setPeriodeAbsencia: function(dataini, datafi) {
          var msg = {"nomUsuari":Session.userId,"dataIni":dataini,"dataFi":datafi};
          return $http.post('/public/api/periode_absencia/'+Session.id, JSON.stringify(msg)).then(function(response) {
             return response.data.result =='ok';
          });
        },

        deletePeriodeAbsencia: function(id) {
          return $http.delete('/public/api/periode_absencia/'+Session.id +'/'+id).then(function(response) {
             return response.data.result =='ok';
          });
        },

        updatePeriodeAbsencia: function(id, dataini, datafi) {
           var msg = {"id":id,"dataIni":dataini,"dataFi":datafi};
           return $http.put('/public/api/periode_absencia/'+Session.id, JSON.stringify(msg)).then(function(response) {
             return response.data.result =='ok';
          });
        },

        getCodiDiari: function () {
           return $http.get('/public/api/codi_diari/'+Session.id).then(function(response) {
             if(response.data.result=='ok') return response.data.code;
             else return 0;
           });
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
