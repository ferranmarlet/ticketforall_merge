var services = angular.module('services', []);

services.factory("ticketForAllService", function ($http) {
    var service = {

        loginUser: function (name, pass) {

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

