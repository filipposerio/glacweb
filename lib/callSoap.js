var soap = require('soap');
var constants = require('constants');
var fs = require('fs');

 var myurl = 'c:/nodeprj/glacweb/serviceReference/wsRicetta/demVisualizzaErogato.wsdl';
 //var myurl = 'c:/nodeprj/callsoap/demVisualizzaErogato.wsdl';
 //var myurl = 'https://demservicetest.sanita.finanze.it/DemRicettaErogatoServicesWeb/services/demVisualizzaErogato.wsdl';
 var args = {pinCode: '0Gv1vsTpzlvRD9kBd8FVLo2/441rZ8rRZVf0Zi9eO6+L7kme0KC8Vx6ZjRj/4JjA4aHPTCi3D6YW9OtmYkIpW7sfchmhqHdVORBZHPitiPHdr5iIipAhIzBhFOQIPfpYasW5cQmU//uNB4GSWSNDIkaqdMrDjTPpIkbKKeoA4dQ=',
      codiceRegioneErogatore: '190',
      codiceAslErogatore: '201',
      codiceSsaErogatore: '888888',
      nre: '1900A4000004510',
      cfAssistito: 'T8L5DQ4L7vZWEQ3gGWUhMYYRoGZAIsZSCZ4AieAmIKZ85B6HarO5s/jhtnp5m4r44JiwBRPYyYxtzP4npmLyk8zFSSuVxDAU3oaUdO0lOnDWKZjf886o2nbmSsPEiXYlTaJnWRU420qrQ4Sa2HfEK/32wXsOSq7TCpoMFYhkXeA=',
      tipoOperazione: '1'
      };
      var auth = " Basic " + new Buffer("UWT3CBXX" + ":" + "PBUW9EBP").toString("base64");
       var myHeaders = {
        "Authorization": auth
    }

//soap.createClient(myurl, { wsdl_headers: {Authorization: auth} }, function(err, client) {
creaclient = function() {
soap.createClient(myurl,{ }, function(err, client) {
         console.log('SOAPDEM.JS dentro callbakc SOAP.CREATECLIENT inizio messaggio');
         //console.log(client.wsdl.options);
         if (err) {
         	console.log('SOAPDEM.JS ERRORE!!!!!! ' + err.message);
         	}

//      console.log(client.describe());

      //client.setSecurity(new soap.BasicAuthSecurity('UWT3CBXX', 'PBUW9EBP'));
     client.setSecurity({
      addOptions:function(options){
        options.cert = fs.readFileSync('c:/nodeprj/callsoap/certTest.pem');
        //options.key = fs.readFileSync('c:/nodeprj/callsoap/certTest.pem');
        options.rejectUnauthorized = false;
        options.secureOptions = constants.SSL_OP_NO_TLSv1_2;
        options.strictSSL = false;
       // options.agent = new https.Agent(options);
      },
      toXML:function(){return '';}
    });
 console.log("SOAPDEM.JS PRIMA DELLA CHIAMATA ALLA VISUALIZZA EROGATO");
 //console.log(args);
      client.visualizzaErogato(args,  function(err, result) {
     console.log("*******************CHIAMO LA VISUALIZZA EROGATO");
        //console.log(args);
         if (err) {
         	console.log("ERRORE CHIAMATA FUNZIONE "  +err.message);
        }
         else {
         	console.log(result);
        }

      },{},    myHeaders);

  },'https://demservicetest.sanita.finanze.it/DemRicettaErogatoServicesWeb/services/demVisualizzaErogato');
};
module.exports = {
    creaclient: creaclient
}
