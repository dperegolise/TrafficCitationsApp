/** 
 *  Create the Vehicle module. This module will be used to represent a single
 *  vehicle from our database.
 *
 *  The module name should be in the form of 'agile.models.{tableName}', where
 *  tableName is the name of the DB table in camel case.
 */
angular.module('agile.models.vehicle', [

])
  // The factory name should be the name of the DB table in camel case, 
  // capitalized. e.g. AddressLine
  .factory('Vehicle', function() {
    // Always include 'use strict'
    // Strict mode makes it easier to write "secure" JavaScript.
    'use strict';

    /**
     * @class
     * @constructor
     * When we retrieve data from the backend, we will pass the vehicle data
     * in to this function, which will then create a Vehicle-typed
     * object out of it, which we'll use when displaying data on the template. 
     *
     */
    var Vehicle = function(vehicle) {
      // Each relevant column should be present here in the form of 
      // this.columnName = vehicle.columnName
      this.commercialVehicle = vehicle.commercialVehicle;
      this.tagNumber = vehicle.tagNumber;
      this.tagState = vehicle.tagState;
      // We don't need to include the unique ID column.
    };

    return Vehicle;
  });