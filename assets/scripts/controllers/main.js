'use strict';

angular.module('flightFinder').factory('CitiesService', function($http, $q){
    return {
        getCities: function() {
            var deferred = $q.defer();
            $http.get("/routes/cities").
                success(function(data) {
                    deferred.resolve(data);
                });
            return deferred.promise;
        },

        getCandidates: function(cities, city) {
            if(city && city.length >= 3) {
                return cities.filter(function(cand) {
                    return cand.toLowerCase().startsWith(city.toLowerCase());
                });
            } else {
                return [];
            }
        }
    };
});

angular.module('flightFinder').factory('RoutesService', function($http, $q){
    return {
        find: function(route) {
            var deferred = $q.defer();
            $http.post("/routes/find", route).
                success(function(data) {
                    deferred.resolve(data);
                }).
                error(function() {
                    deferred.resolve({ "data": {"error": "Oops! Something went wrong."} });
                });
            return deferred.promise;
        }
    };
});

/**
 * @ngdoc function
 * @name flightFinder.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flightFinder
 */
angular.module('flightFinder').controller('FlightCtrl', function ($scope, $rootScope, $http, CitiesService, RoutesService) {
    $scope.route = { "from": "", "to": "" };
    $scope.candidateCities = [];
    var cities = [];

    CitiesService.getCities().then(function(data) {
        $scope.citiesRetrieved = true;
        cities = data.cities;
    });

    $scope.getCandidateCity = function(city) {
        $scope.candidateCities = CitiesService.getCandidates(cities, city); 
    };

    $scope.findFlights = function() {
        $scope.airlines = [];
        delete $scope.error;
        $scope.onRequest = true;
        
        RoutesService.find($scope.route).then(function(data) {
            if(data.airlines) {
                $scope.airlines = data.airlines;
            } else {
                $scope.error = data.error;
            }
            $scope.onRequest = false;
        });
    };
});
