/*
Import Section
*/
import { socket } from './socket.js'
/*
Body module
*/

const sio = socket('/')


sio.on( 'riepilogoContabileAccettazione', ( result ) => {
  console.log("ritorno della riepilogoContabileAccettazione: " + result)
    const event = new CustomEvent('riepilogoContabileAccettazione', {bubbles: true, cancelable: true})
    console.log("ritorno della riepilogoContabileAccettazione: " + result)
    event.data = "OK"
    document.dispatchEvent( event )
})



sio.on( 'eliminaEsameAccettazione', ( result ) => {
  console.log("ritorno della eliminaEsameAccettazione: " + result)

  //alert(result)

    const event = new CustomEvent('eliminaEsameAccettazione', {bubbles: true, cancelable: true})
    console.log("ritorno della eliminaEsameAccettazione: " + result)
    event.data = result.recordset
    document.dispatchEvent( event )


})
sio.on( 'insertEsamiPazienteRic', ( result ) => {
  console.log("ritorno della insertEsamiPazienteRic: " + result)
  //alert(result)
    const event = new CustomEvent('insertEsamiPazienteRic', {bubbles: true, cancelable: true})
    console.log("ritorno della insertEsamiPazienteRic: " + result)
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )
})
sio.on( 'insertEsamiPazienteAcc', ( result ) => {
  console.log("ritorno della insertEsamiPazienteAcc: " + result)
  //alert(result)
    const event = new CustomEvent('insertEsamiPazienteAcc', {bubbles: true, cancelable: true})
    console.log("ritorno della insertEsamiPazienteAcc: " + result)
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )
})
sio.on( 'searchEsamiPaziente', ( result ) => {
  console.log("ritorno della searchEsamiPaziente: " + result)

  //alert(result)

    const event = new CustomEvent('searchEsamiPaziente', {bubbles: true, cancelable: true})
    console.log("ritorno della searchEsamiPaziente: " + result)
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )


})

sio.on( 'searchEsamiPrivato', ( result ) => {
  console.log("ritorno della searchEsamiPrivato: " + result)

  //alert(result)

    const event = new CustomEvent('searchEsamiPrivato', {bubbles: true, cancelable: true})
    console.log("ritorno della searchEsamiPrivato: " + result)
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )


})



sio.on( 'searchEsamiPrestazione', ( result ) => {
  console.log("ritorno della searchEsamiPrestazione: " + result)

  //alert(result)

    const event = new CustomEvent('searchEsamiPrestazione', {bubbles: true, cancelable: true})
    console.log("ritorno della searchEsamiPrestazione: " + result)
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )


})








sio.on( 'searchEsamiDescrizione', ( result ) => {
  //console.log("ritorno della searchEsamiDescrizione: " + result)

  //alert(result)

    const event = new CustomEvent('searchEsamiDescrizione', {bubbles: true, cancelable: true})
    //console.log("ritorno della searchEsamiDescrizione: " + result)
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )


})
sio.on( 'searchPrestazioniDescrizioneAcc', ( result ) => {
  console.log("ritorno della searchPrestazioniDescrizioneAcc: " )

  //alert(result)

    const event = new CustomEvent('searchPrestazioniDescrizioneAcc', {bubbles: true, cancelable: true})
    console.log("ritorno della searchPrestazioniDescrizioneAcc: " )
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )


})

sio.on( 'searchPrestazioniDescrizioneConf', ( result ) => {
  console.log("ritorno della searchPrestazioniDescrizioneConf: " )

  //alert(result)

    const event = new CustomEvent('searchPrestazioniDescrizioneConf', {bubbles: true, cancelable: true})
    console.log("ritorno della searchPrestazioniDescrizioneConf: " )
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )


})
sio.on( 'searchPrestazioniRicetta', ( result ) => {
  console.log("ritorno della searchPrestazioniRicetta: " + result)

  //alert(result)

    const event = new CustomEvent('searchPrestazioniRicetta', {bubbles: true, cancelable: true})
    console.log("ritorno della searchPrestazioniRicetta: " + result)
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )


})



sio.on( 'searchAccettazioniPaziente1', ( result ) => {
  console.log("ritorno della searchAccettazioniPaziente1: " + result)

  //alert(result)

    const event = new CustomEvent('searchAccettazioniPaziente1', {bubbles: true, cancelable: true})
    console.log("ritorno della searchAccettazioniPaziente1: " + result)
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )


})
sio.on( 'login', ( result ) => {
    console.log("ritorno della login n.elementi: " + result.length)
    //alert("ritorno della login: " + result)
    console.log(result)
    if (result != "") {
      const event = new CustomEvent('oklogin', {bubbles: true, cancelable: true})
      event.data = result
      console.log("dispatch event LOGIN OK")
      event.data = result;
      document.dispatchEvent( event )
    }
    else {
      const event = new CustomEvent('kologin', {bubbles: true, cancelable: true})

      document.dispatchEvent( event )

    }
})
sio.on( 'com', ( result ) => {
  console.log('client scattata la ricezione socket com  ' + result)
  console.log(result[0].messaggio)
  const event = new CustomEvent('com', {bubbles: true, cancelable: true})
  event.data = result
  document.dispatchEvent( event )
})
sio.on( 'esami', ( result ) => {
  console.log('client scattata la ricezione socket esami ' + result)
  console.log(result[0].messaggio)
  const event = new CustomEvent('esami', {bubbles: true, cancelable: true})
  event.data = result
  document.dispatchEvent( event )
})
sio.on( 'connessione', ( result ) => {
  console.log('client scattata la ricezione socket stato connessione ' + result)
  console.log(result[0].messaggio)
  const event = new CustomEvent('connessione', {bubbles: true, cancelable: true})
  event.data = result
  document.dispatchEvent( event )
})

sio.on( 'dettaglioBarcode', ( result ) => {
  console.log('client scattata la ricezione dettaglioBarcode ' + result)
  const event = new CustomEvent('dettaglioBarcode', {bubbles: true, cancelable: true})
  event.data = result
  document.dispatchEvent( event )
})


sio.on( 'lavorati', ( result ) => {
  console.log('client scattata la ricezione socket lavorati ' + result)
  const event = new CustomEvent('lavorati', {bubbles: true, cancelable: true})
  event.data = result
  document.dispatchEvent( event )
})

sio.on( 'log', ( result ) => {
  console.log('client scattata la ricezione socket log ' + result)
  const event = new CustomEvent('log', {bubbles: true, cancelable: true})
  event.data = result
  document.dispatchEvent( event )
})


const eliminaTuttiBarcodeLavorati = ( ) => {

  console.log('invio al server la richiesta clearBarcodeLavorati ')

   sio.emit( 'clearLavorati', queryString )
}
const dettaglioBarcode = ( queryString ) => {

  console.log('invio al server la richiesta :Barcode ' + queryString)

   sio.emit( 'dettaglioBarcode', queryString )
}
const login = ( queryString ) => {

  console.log('invio al server la richiesta di accesso ' + queryString)

   sio.emit( 'login', queryString )
}
const searchBarcode = ( queryString ) => {

  console.log('invio al server la richiesta :searchBarcode ' + queryString)

   sio.emit( 'lavorati', queryString )
}

const searchAccettazioniPaziente1 = ( queryString ) => {

  console.log('invio al server la richiesta :searchAccettazioniPaziente1 ' + queryString)

   sio.emit( 'searchAccettazioniPaziente1', queryString )
}

const searchEsamiBarcode = ( queryString ) => {

  console.log('invio al server la richiesta :searchEsamiBarcode ' + queryString)

   sio.emit( 'esami', queryString )
}

const searchMessaggi = (  ) => {

  console.log('invio al server la richiesta :searchMessaggi ' )

   sio.emit( 'log' )
}





const stato = (  ) => {

  console.log('invio al server la richiesta :statoconnessione ' )

   sio.emit( 'connessione' )
}


const searchPrestazioniRicetta = ( queryString ) => {

  console.log('invio al server la richiesta :searchPrestazioniRicetta ' + queryString)

   sio.emit( 'searchPrestazioniRicetta', queryString )
}
const searchPrestazioniDescrizioneAcc = ( queryString ) => {

  console.log('invio al server la richiesta :searchPrestazioniDescrizione ' + queryString)
   sio.emit( 'searchPrestazioniDescrizioneAcc', queryString )
}

const searchPrestazioniDescrizioneConf = ( queryString ) => {

  console.log('invio al server la richiesta :searchPrestazioniDescrizione ' + queryString)
   sio.emit( 'searchPrestazioniDescrizioneConf', queryString )
}
const searchEsamiDescrizione = ( queryString ) => {

  console.log('invio al server la richiesta :searchEsamiDescrizione ' + queryString)
   sio.emit( 'searchEsamiDescrizione', queryString )
}



const eliminaEsameAccettazione = ( queryString ) => {

  console.log('invio al server la richiesta :eliminaEsameAccettazione ' )

   sio.emit( 'eliminaEsameAccettazione',queryString )
}




const searchEsamiPrestazione = ( queryString ) => {

  console.log('invio al server la richiesta :searchEsamiPrestazione ' + queryString)
   sio.emit( 'searchEsamiPrestazione', queryString )
}

const searchEsamiPaziente = ( queryString ) => {

  console.log('invio al server la richiesta :searchEsamiPaziente ' + queryString)
   sio.emit( 'searchEsamiPaziente', queryString )
}

const searchEsamiPrivato = ( queryString ) => {

  console.log('invio al server la richiesta :searchEsamiPrivato ' + queryString)
   sio.emit( 'searchEsamiPrivato', queryString )
}

const aggiungiEsameAccettazione = ( queryString ) => {

  console.log('invio al server la richiesta :aggiungiEsameAccettazione ' + queryString)
   sio.emit( 'aggiungiEsameAccettazione', queryString )
}
const aggiungiEsamiAccettazione = ( queryString ) => {

  console.log('invio al server la richiesta :aggiungiEsamiAccettazione ' + queryString)
   sio.emit( 'aggiungiEsamiAccettazione', queryString )
}

const riepilogoContabileAccettazione = ( queryString ) => {

  console.log('invio al server la richiesta :riepilogoContabileAccettazione ' + queryString)
   sio.emit( 'riepilogoContabileAccettazione', queryString )
}
export {
         eliminaTuttiBarcodeLavorati,
         login,
         searchAccettazioniPaziente1,
         searchPrestazioniRicetta,
         searchEsamiDescrizione,
         searchPrestazioniDescrizioneAcc,
         searchPrestazioniDescrizioneConf,
         searchEsamiPrestazione,
         searchEsamiPaziente,
         aggiungiEsameAccettazione,
         eliminaEsameAccettazione,
         riepilogoContabileAccettazione,
         searchEsamiPrivato,
         aggiungiEsamiAccettazione
}
