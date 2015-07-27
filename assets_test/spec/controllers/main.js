'use strict';

describe('Controller: FlightCtrl', function () {
  var scope, httpBackend

  // load the controller's module
  beforeEach(module('flightFinder'));

  var FlightCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    FlightCtrl = $controller('FlightCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {

  });
});
