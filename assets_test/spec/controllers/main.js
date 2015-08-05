'use strict';

if (typeof String.prototype.startsWith !== 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) === 0;
  };
}

describe('Controller: FlightCtrl', function () {

  // load the controller's module
  beforeEach(module('flightFinder'));

  var FlightCtrl, scope, httpBackend, routesService, citiesService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    FlightCtrl = $controller('FlightCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  beforeEach(inject(function(_RoutesService_, _CitiesService_){
    routesService = _RoutesService_;
    citiesService = _CitiesService_;
  }));

  afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
  });

  it('should return a list of cities that start with the searchtext', function() {
    httpBackend.when('GET', '/cities').respond(function() {
       return [200, {"cities": ["Manila", "Tokyo", "Singapore", "Dubai", "Los Angeles", "San Francisco", "San Diego"]}, {}];
    });

    citiesService.getCities().then(function(data) {
      expect(citiesService.getCandidates(data.cities, "")).toEqual([]);
      expect(citiesService.getCandidates(data.cities, "Mani")).toEqual(["Manila"]);
      expect(citiesService.getCandidates(data.cities, "San")).toEqual(["San Francisco", "San Diego"]);
    });

    httpBackend.flush();
  });


  it('should return the list of airlines for a route', function() {
    httpBackend.when('GET', '/cities').respond(function() {
       return [200, {"cities": ["Manila", "Tokyo", "Singapore", "Dubai", "Los Angeles", "San Francisco", "San Diego"]}, {}];
    });

    httpBackend.when('POST', '/routes/find').respond(function() {
      return [ 200, {"airlines": ["Cebu Pacific", "Air Philippines", "Philippine Airlines"]}, {} ];
    });

    scope.route = {"from": "Singapore", "to": "Manila"};
    routesService.find(scope.route).then(function(data) {
      var airlines = data.airlines;
      expect((typeof airlines)).toEqual('object');
    });

    scope.findFlights();
    expect(scope.airlines.length).toEqual(0);
    expect(scope.onRequest).toEqual(true);
    expect(scope.error).toEqual(undefined);

    httpBackend.flush();
  });

});
