var soap = require('soap');
var constants = require('constants');
var fs = require('fs');
var strcrypt = require('./strcrypt.js');





sstr = "5693894364";
var data = [];
for (var i = 0; i < sstr.length; i++){  
    data.push(sstr.charCodeAt(i));
}
console.log(data)
let buffer = new Buffer.from(data)
console.log(buffer.toString())

  const cf_crypt= strcrypt.encryptStringWithRsaPublicKey('LFNGCM40A53G273V','D:\\nodeprj\\glacweb\\testsoapfil\\SanitelCF.cer');
	
  console.log("cf_crypt");
	
	console.log(cf_crypt);


	const pincode_crypt = strcrypt.encryptStringWithRsaPublicKey('5693894364','D:\\nodeprj\\glacweb\\testsoapfil\\SanitelCF.cer');
	
  console.log("pincode_crypt");
  
  

 var myurl = './demVisualizzaErogato.wsdl';
 //var myurl = 'https://demservicetest.sanita.finanze.it/DemRicettaErogatoServicesWeb/services/demVisualizzaErogato.wsdl';
 var args = {
 			pinCode: pincode_crypt,
      codiceRegioneErogatore: '190',
      codiceAslErogatore: '206',
      codiceSsaErogatore: '426700',
      nre: '1900A4317267908',
      cfAssistito: cf_crypt,
      tipoOperazione: '1'
      };
      var auth = " Basic " + new Buffer("UVJ6EBVJ" + ":" + "Agosto_2018").toString("base64");
      var myHeaders = {
				wsdl_headers: { "Authorization": auth}
    	}
			var myHeaders = {
				"Authorization": auth
			}
console.log(args)
soap.createClient(myurl, myHeaders, function(err, client) {
//soap.createClient(myurl, function(err, client) {
				console.log(myHeaders)
				//client.addHttpHeader('Authorization',auth);
         console.log('SOAPDEM.JS dentro callbakc SOAP.CREATECLIENT inizio messaggio');
         //console.log(client.wsdl.options);
         if (err) {
         	console.log('SOAPDEM.JS ERRORE!!!!!! ' + err.message);
         	}

//      console.log(client.describe());

      //client.setSecurity(new soap.BasicAuthSecurity('UWT3CBXX', 'PBUW9EBP'));
     client.setSecurity({
      addOptions:function(options){
        //options.cert = fs.readFileSync('d:/nodeprj/glacweb/testsoapfil/DemService-SSL.pem');
        options.cert = fs.readFileSync('d:/nodeprj/glacweb/testsoapfil/prova.pem');
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

  },'https://demservice.sanita.finanze.it/DemRicettaErogatoServicesWeb/services/demVisualizzaErogato');
