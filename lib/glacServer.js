/*
 * chat.js - module to provide chat messaging
*/


// ------------ BEGIN MODULE SCOPE VARIABLES --------------
//'use strict';

var
  glacServerObj,
  socket = require( 'socket.io' ),
  crud        = require( './crud' ),
  conf = require('./config.js'),
  os = require("os"),
  utility   = require( './utility'),
  fs   = require( 'fs'),
  mssqldb = require('./datiMSSQL.js'),
  strcrypt = require('./strcrypt.js'),
  dem = require('./callSoap.js'),
  comuni = require('./comuni.js'),
  soap = require('soap'),
  constants = require('constants'),
  mdb = require('./datiMariaDb.js'),
  pazienti = require('./pazienti.js'),
  loginWeb = require('./loginWeb.js'),
  accettazioni = require('./accettazioni.js'),
  ricette = require('./ricette.js'),
  esami = require('./esami.js'),
  prestazioni = require('./prestazioni.js');
  turni = require('./turni.js');




  var bufferData =""





// ------------- END MODULE SCOPE VARIABLES ---------------

// ---------------- BEGIN UTILITY METHODS -----------------

// ----------------- END UTILITY METHODS ------------------

// ---------------- BEGIN PUBLIC METHODS ------------------
glacServerObj = {

  connect : function ( server ) {

   var io = socket.listen( server );
   //port.connect(io)
    console.log("server listen socket.io")

    // Begin io setup
    io
      .of( '/' )
      .on( 'connection', function ( socket ) {


        socket.on('aggiungiEsamiAccettazione', function( esami_map ) {
          console.log('scattata la aggiungiEsamiAccettazione  per id=' + esami_map[0].idAccettazione)
          accettazioni.insertEsamiPazienteMulti(esami_map,socket,"insertEsamiPazienteAcc")
        });
        socket.on('aggiungiEsameAccettazione', function( accettazione_map ) {
          console.log('scattata la aggiungiEsameAccettazione  per id=' + accettazione_map)
          accettazioni.insertEsamiPaziente(accettazione_map,socket,"insertEsamiPazienteAcc")
        });
        socket.on('searchEsamiPaziente', function( accettazione_map ) {
          console.log('scattata la searchEsamiPaziente  per id=' + accettazione_map)
          accettazioni.searchEsamiPaziente(accettazione_map,socket)
        });
        socket.on('searchEsamiPrivato', function( accettazione_map ) {
          console.log('scattata la searchEsamiPrivato  per id=' + accettazione_map)
          accettazioni.searchEsamiPrivato(accettazione_map,socket)
        });
        socket.on('aggiungiPrestazioneRicetta', function( prestazione_map ) {
          console.log('scattata la aggiungiPrestazioneRicetta  per id=' + prestazione_map)
          ricette.aggiungiPrestazioneRicetta(prestazione_map,socket)
        });
        socket.on('searchPrestazioniDescrizioneAcc', function( prestazione_map ) {
          console.log('*************scattata la searchPrestazioniDescrizione  per id=' + prestazione_map)
          prestazioni.searchPrestazioniDescrizione(prestazione_map,socket,'searchPrestazioniDescrizioneAcc')
        });
        socket.on('searchPrestazioniDescrizioneConf', function( prestazione_map ) {
          console.log('*************scattata la searchPrestazioniDescrizione  per id=' + prestazione_map)
          prestazioni.searchPrestazioniDescrizione(prestazione_map,socket,'searchPrestazioniDescrizioneConf')
        });
        socket.on('searchPrestazioniDescrizioneRic', function( prestazione_map ) {
          console.log('*************scattata la searchPrestazioniDescrizione  per id=' + prestazione_map)
          prestazioni.searchPrestazioniDescrizione(prestazione_map,socket,'searchPrestazioniDescrizioneRic')
        });
        socket.on('eliminaPrestazioneRicetta', function( prestazione_map ) {
          console.log('scattata la eliminaPrestazioneRicetta  per id=' + prestazione_map)
          ricette.eliminaPrestazioneRicetta(prestazione_map,socket)
        });
        socket.on('eliminaEsameRicetta', function( esame_map ) {
          console.log('scattata la eliminaEsameRicetta  per id=' + esame_map.idRicetta)
          ricette.eliminaEsame(esame_map,socket)

        });

        socket.on('eliminaEsameAccettazione', function( esame_map ) {
          console.log('scattata la eliminaEsameAccettazione  per id=' + esame_map.idRicetta)
          accettazioni.eliminaEsameAccettazione(esame_map,socket)

        });

        socket.on('aggiungiEsameRicetta', function( esame_map ) {
          console.log('scattata la aggiungiEsameRicetta  per id=' + esame_map[0].idRicetta)
          ricette.aggiungiEsame(esame_map,socket);
          //accettazioni.insertEsamiPaziente(esame_map,socket,"insertEsamiPazienteRic")
        });

        socket.on('aggiungiEsamiRicetta', function( esame_map ) {
          console.log('scattata la aggiungiEsameRicetta  per id=' + esame_map.idRicetta)
          ricette.aggiungiEsamiMulti(esame_map,socket);
          //accettazioni.insertEsamiPaziente(esame_map,socket,"insertEsamiPazienteRic")
        });

        socket.on('deleteRicetta', function( ricetta_map ) {
          console.log('scattata la delete ricetta per id=' + ricetta_map.idRicetta);
          ricette.eliminaRicetta(ricetta_map,socket)

        });

        socket.on('createRicetta', function( user_map ) {
          console.log('scattata la create ricetta')
          ricette.createRicetta(user_map,socket)

        });

        socket.on('createAccettazione', function( user_map ) {
          console.log('scattata la create accettazione')
          accettazioni.createAccettazione(user_map,socket)

        });

        // Begin /create/ message handler
        socket.on('createpaziente', function( user_map ) {
          console.log('scattata la create paziente')
          pazienti.createPaziente(user_map,socket);
        });

        socket.on('updatepaziente', function( user_map ) {
          console.log('scattata la create paziente')
          pazienti.updatePaziente(user_map,socket);
        });
        socket.on('login', function( user_map ) {
          console.log('scattata la create paziente')
          loginWeb.login(user_map,socket);
        });

        socket.on('esami', function( user_map ) {
          let str=[];
          console.log('server arrivata richiesta dettaglio esami per barcode: ' + user_map)
          var vDb ="";
          var lconfig = conf.fnDatabase();
          console.log("scattata la esami barcode lato server")
          vDb = utility.getDatabase(user_map);
          if (vDb.length == 0){
            console.log('KO database: ')
            str.push(JSON.parse('{"risultato":"Nessun database associato al '+user_map+'"}'));
            socket.emit("esami",str)
          }
          else {
            console.log('OK database: '+vDb);
            console.log('OK database: '+ lconfig);
            var vStored = "qryEsaApparecchiatura";
            dati.storedQry(lconfig,vStored,user_map,function(result,err){
                //console.log("scattata callback read per tabella " + tabella)
                if (err) {
                  console.log("Attenzione errore storedQry1 " + vStored);
                  console.log(err)
                  str.push(JSON.parse('{"risultato":"'+err.message+'"}'));
                  socket.emit("esami",str)
                }
                else {
                  //console.log(result.recordset);
                  console.log("OK")
                  console.log("rows output", result.output.MSGOUT)
                  console.log("rows output", result.output.NOMINATIVO)
                  if (result.recordsets.length >0){
                    console.log("ramo recordset")
                    console.log("stampo recordset:", result.recordset);
                    socket.emit("esami",result.recordset)
                  }
                  else {
                    console.log("ramo no recordset")
                    str.push(JSON.parse('{"risultato":"Nessun esame associato al '+user_map+'"}'));
                    socket.emit("esami",str)
                  }



                }
            })
          }
        });

        socket.on('searchRicettaWeb', function( ricetta_map ) {
          const lconfig = conf.fnDatabase();
          let str=[];
          console.log('server arrivata richiesta search ricettaweb: ' + ricetta_map);
          console.log(ricetta_map.nricetta)
          console.log(ricetta_map.cf)
          console.log(ricetta_map.idAccettazione)
          const nricetta = ricetta_map.nricetta //'1900A4317267908';
          const cf = ricetta_map.cf //'LFNGCM40A53G273V';
          const pincode_crypt = strcrypt.encryptStringWithRsaPublicKey(ricetta_map.pincode);
          const cf_crypt = strcrypt.encryptStringWithRsaPublicKey(cf);
          console.log(cf_crypt)
          const msg = '{"msg": "OK CRYPT"}';
          var myurl = './serviceReference/wsRicetta/demVisualizzaErogato.wsdl';
          //var myurl = 'https://demservicetest.sanita.finanze.it/DemRicettaErogatoServicesWeb/services/demVisualizzaErogato.wsdl';
          var args = {
               pinCode: pincode_crypt,
               codiceRegioneErogatore: ricetta_map.codregioneerogatore,
               codiceAslErogatore: ricetta_map.codaslerogatore,
               codiceSsaErogatore: ricetta_map.codssaerogatore,
               nre: nricetta,
               cfAssistito: cf_crypt,
               tipoOperazione: '1'
               };
               var auth = " Basic " + new Buffer(ricetta_map.utenteerogatore + ":" + ricetta_map.pwerogatore).toString("base64");
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
                 options.cert = fs.readFileSync('./cert/prova.pem');
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

                    console.log('verifico recupero dati ricetta.');
                    console.log(result.ElencoErroriRicette.ErroreRicetta.codEsito);

                    if (result.ElencoErroriRicette.ErroreRicetta.codEsito === '0000') {
                       console.log('ok recupero dati ricetta. inserisco nel db locale');
                       ricette.createRicettaWebMariaDB(lconfig,ricetta_map,result,socket);
                    }
                    else {
                      console.log('ko recupero dati ricetta. inserisco nel db locale');
                      socket.emit("createricetta", "KO")
                    }
                 }

               },{},    myHeaders);

           },'https://demservice.sanita.finanze.it/DemRicettaErogatoServicesWeb/services/demVisualizzaErogato');

        });



        socket.on('searchEsamiPrestazione', function( user_map ) {
          console.log('server arrivata richiesta elecno esami per descrizione: ' + user_map)
          esami.searchEsamiPrestazione(user_map,socket);
        });

        socket.on('searchEsamiDescrizione', function( user_map ) {
          console.log('server arrivata richiesta elecno esami per descrizione: ' + user_map)
          esami.searchEsamiDescrizione(user_map,socket);
        });


        socket.on('searchEsamiRicetta', function( user_map ) {
          let str=[];
          console.log('server arrivata richiesta elenco searchEsamiRicetta: ' + user_map)
          ricette.esamiRicetta(user_map, socket);
        });

        socket.on('searchCognome', function( user_map ) {

          console.log('server arrivata richiesta elecno pazienti per cognome: ' + user_map)
          pazienti.searchCognome(user_map,socket,msg,'searchCognome');

        })
        socket.on('searchCognomeAcc', function( user_map ) {

          console.log('server arrivata richiesta elecno pazienti per cognome: ' + user_map)
          pazienti.searchCognome(user_map,socket,'searchCognomeAcc');

        })

        socket.on('searchAccettazioniPaziente', function( user_map ) {
          console.log('server arrivata richiesta elecno accettazioni per paziente con id : ' + user_map)
          accettazioni.searchAccettazioniPaziente(user_map, socket);
        });


        socket.on('searchRicetteAccettazione', function( user_map ) {

          console.log('server arrivata richiesta elecno ricette per accettazione : ' + user_map)
          ricette.searchRicetteAccettazione(user_map, socket);
        });

        socket.on('searchPrestazioniRicetta', function( prestazione_map ) {

          console.log('server arrivata richiesta elecno prestazioni per ricetta : ' + prestazione_map.nRicetta + '  ' + prestazione_map.idRicetta)
          ricette.prestazioniRicetta(prestazione_map,socket)

        });

        socket.on('riepilogoContabileRicetta', function( ricetta_map ) {

          console.log('server arrivata richiesta riepilogoContabileRicetta per idricetta: ' + ricetta_map.idRicetta)
          ricette.riepilogoContabileRicetta(ricetta_map,socket)

        });

        socket.on('riepilogoContabileAccettazione', function( accettazione_map ) {

          console.log('server arrivata richiesta riepilogoContabileAccettazione per idACcettazione: ' + accettazione_map.idAccettazione)
          accettazioni.riepilogoContabileAccettazione(accettazione_map,socket)

        });
        socket.on('totalePrivatoAccettazione', function( accettazione_map ) {

          console.log('server arrivata richiesta totalePrivatoAccettazione per idAccettazione: ' + accettazione_map.idAccettazione)
          accettazioni.totalePrivatoAccettazione(accettazione_map,socket)

        });
        socket.on('totaleRicetteAccettazione', function( accettazione_map ) {

          console.log('server arrivata richiesta totaleRicetteAccettazione per idACcettazione: ' + accettazione_map.idAccettazione)
          accettazioni.totaleRicetteAccettazione(accettazione_map,socket)

        });
        socket.on('eliminaTurno', function( turno_map ) {

          console.log('server arrivata richiesta eliminaTurno per idturnopaziente : ' + turno_map.idturnopaziente)
          turni.eliminaTurno(turno_map,socket);

        });
        socket.on('assegnaTurno', function( turno_map ) {

          console.log('server arrivata richiesta turnoPaziente per idPaziente : ' + turno_map.idPaziente)
          turni.assegnaTurno(turno_map,socket);

        });
        socket.on('elencoPazientiPerTurno', function( turno_map ) {

          console.log('server arrivata richiesta elencoPazientiPerTurno')
          turni.elencoPazientiPerTurno(turno_map,socket);

        });
      }
    );
    // End io setup



    return io;
  }


};
module.exports = glacServerObj;
// ----------------- END PUBLIC METHODS -------------------
