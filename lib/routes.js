/*
 * app.js Express server with sample module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global */

//  ------------------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  configRoutes,
  crud        = require( './crud' ),
  glacServer        = require( './glacServer' ),
  //port = require( './comport' ),
  //makeMongoId = crud.makeMongoId;
//  ------------------------ END MODULE SCOPE VARIABLES  ----------------

//  ------------------------ BEGIN UTILITY METHODS ----------------------
//  ------------------------ END UTILITY METHODS   ----------------------

//  ------------------------ BEGIN PUBLIC METHODS  ----------------------

  configRoutes = function ( app, server ) {
    console.log("config routes");
    app.get( '/start', function ( request, response ) {
      response.redirect( '/index.html' );
    });
    app.get( '/', function ( request, response ) {
      console.log("chiamo la index.html")
      response.redirect( '/index.html' );
    });
    
    //console.log("port opened...")
    //port.connect();
    //xt400i.connect( server,port );
    glacServer.connect( server );
    //xt400i.listen();


};
module.exports = { configRoutes : configRoutes };
//  ------------------------ END PUBLIC METHODS -----------------------

//  ------------------------ BEGIN MODULE INITIALIZATION --------------

//  ------------------------ END MODULE INITIALIZATION   --------------
