/*
Import Section
*/
import { socket } from './socket.js'
/*
Body module
*/

const sio = socket('/')



// messaggi ricevuti dal server
sio.on( 'riepilogoContabileRicetta', ( result ) => {
  console.log("ritorno della riepilogoContabileRicetta: " + result)
    const event = new CustomEvent('riepilogoContabileRicetta', {bubbles: true, cancelable: true})
    console.log("ritorno della riepilogoContabileRicetta: " + result)
    event.data = "OK"
    document.dispatchEvent( event )
})

sio.on( 'deletericetta', ( result ) => {
  console.log("ritorno della deletericetta: " + result)

  //alert(result)

    const event = new CustomEvent('deletericetta', {bubbles: true, cancelable: true})
    console.log("ritorno della deletericetta: " + result)
    event.data = result
    document.dispatchEvent( event )


})

sio.on( 'createricetta', ( result ) => {
  console.log("ritorno della createricetta: " + result)

  //alert(result)

    const event = new CustomEvent('createricetta', {bubbles: true, cancelable: true})
    console.log("ritorno della createricetta: " + result)
    event.data = result
    document.dispatchEvent( event )


})

sio.on( 'searchRicetteAccettazione', ( result ) => {
  console.log("ritorno della searchRicetteAccettazione: " + result)

  //alert(result)

    const event = new CustomEvent('searchRicetteAccettazione', {bubbles: true, cancelable: true})
    console.log("ritorno della searchRicetteAccettazione: " + result)
    if (result.rowCount >0) {
      event.data = result.rows
    }
    else {
      event.data = ""
    }
    document.dispatchEvent( event )


})


sio.on( 'aggiungiPrestazioneRicetta', ( result ) => {
  console.log("ritorno della aggiungiPrestazioneRicetta: " + result)

  //alert(result)

    const event = new CustomEvent('aggiungiPrestazioneRicetta', {bubbles: true, cancelable: true})
    //console.log("ritorno della aggiungiEsameRicetta: " + result)
    event.data = result.recordset
    document.dispatchEvent( event )


})

sio.on( 'aggiungiEsameRicetta', ( result ) => {
  console.log("ritorno della aggiungiEsameRicetta: " + result)

  //alert(result)

    const event = new CustomEvent('aggiungiEsameRicetta', {bubbles: true, cancelable: true})
    //console.log("ritorno della aggiungiEsameRicetta: " + result)
    event.data = result.recordset
    document.dispatchEvent( event )


})

sio.on( 'searchEsamiRicetta', ( result ) => {
  console.log("ritorno della searchEsamiRicetta: " + result)

  //alert(result)

    const event = new CustomEvent('searchEsamiRicetta', {bubbles: true, cancelable: true})
    console.log("ritorno della searchEsamiRicetta: " + result)
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )


})
sio.on( 'eliminaEsameRicetta', ( result ) => {
  console.log("ritorno della eliminaEsameRicetta: " + result)

  //alert(result)

    const event = new CustomEvent('eliminaEsameRicetta', {bubbles: true, cancelable: true})
    console.log("ritorno della eliminaEsameRicetta: " + result)
    event.data = result.recordset
    document.dispatchEvent( event )


})

sio.on( 'eliminaPrestazioneRicetta', ( result ) => {
  console.log("ritorno della eliminaPrestazioneRicetta: " + result)

  //alert(result)

    const event = new CustomEvent('eliminaPrestazioneRicetta', {bubbles: true, cancelable: true})
    console.log("ritorno della eliminaPrestazioneRicetta: " + result)
    event.data = result.recordset
    document.dispatchEvent( event )


})

sio.on( 'searchPrestazioniDescrizioneRic', ( result ) => {
  console.log("ritorno della searchPrestazioniDescrizioneRic: " )
  //alert(result)
    const event = new CustomEvent('searchPrestazioniDescrizioneRic', {bubbles: true, cancelable: true})
    console.log("ritorno della searchPrestazioniDescrizioneRic: " )
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )
})


sio.on( 'searchRicettaWeb', ( result ) => {
  console.log('client scattata la ricezione searchRicettaWeb ' + result)
  //alert(result.jsondataPrendiInCaricoResult);
  if (result.jsondataPrendiInCaricoResult.startsWith('X')) {
    alert(result.jsondataPrendiInCaricoResult);
  }
  else {
    const res = result.jsondataPrendiInCaricoResult.replace("\\","").replace('," }','}').replace('dataNascitaEstero','dataNascitaEstero1')
    alert(res);
    console.log("esito in json......")
    console.log(res)
    console.log("fine esito in json......")
    const resJSON = JSON.parse(res)
    alert(resJSON.Esito);
    //const event = new CustomEvent('searchRicettaWeb', {bubbles: true, cancelable: true})
    //event.data = result
    //document.dispatchEvent( event )
  }

})


// moduli lato client

const searchRicettaWeb = ( queryString ) => {

  console.log('invio al server la richiesta :searchRicettaWeb ' + queryString)

   sio.emit( 'searchRicettaWeb', queryString )
}

const deleteRicetta = (queryString ) => {

  console.log('invio al server la richiesta eliminaRicetta id=' +queryString.idRicetta)

   sio.emit( 'deleteRicetta', queryString )
}

const createRicetta = ( queryString ) => {

  console.log('invio al server la richiesta :create ricetta ' )

   sio.emit( 'createRicetta',queryString )
}

const searchRicetteAccettazione = ( queryString ) => {

  console.log('invio al server la richiesta :searchRicetteAccettazione ' + queryString)

   sio.emit( 'searchRicetteAccettazione', queryString )
}

const aggiungiEsamiRicetta = ( queryString ) => {

  console.log('invio al server la richiesta :aggiungiEsamiRicetta ' )

   sio.emit( 'aggiungiEsamiRicetta',queryString )
}
const aggiungiEsameRicetta = ( queryString ) => {

  console.log('invio al server la richiesta :aggiungiEsameRicetta ' )

   sio.emit( 'aggiungiEsameRicetta',queryString )
}

const aggiungiPrestazioneRicetta = ( queryString ) => {

  console.log('invio al server la richiesta :aggiungiPrestazioneRicetta ' )

   sio.emit( 'aggiungiPrestazioneRicetta',queryString )
}
const searchEsamiRicetta = ( queryString ) => {

  console.log('invio al server la richiesta :searchEsamiRicetta ' + queryString)
   sio.emit( 'searchEsamiRicetta', queryString )
}
const eliminaEsameRicetta = ( queryString ) => {
  console.log('invio al server la richiesta :eliminaEsameRicetta ' )
   sio.emit( 'eliminaEsameRicetta',queryString )
}
const eliminaPrestazioneRicetta = ( queryString ) => {
  console.log('invio al server la richiesta :eliminaPrestazioneRicetta')
   sio.emit( 'eliminaPrestazioneRicetta',queryString )
}
const searchPrestazioniDescrizioneRic = ( queryString ) => {
   console.log('invio al server la richiesta :searchPrestazioniDescrizione ' + queryString)
   sio.emit( 'searchPrestazioniDescrizioneRic', queryString )
}
const riepilogoContabileRicetta = ( queryString ) => {

  console.log('invio al server la richiesta :riepilogoContabileRicetta ' + queryString)
   sio.emit( 'riepilogoContabileRicetta', queryString )
}
// ezport dei moduli lato client
export {
  searchRicettaWeb,
  deleteRicetta,
  createRicetta,
  searchRicetteAccettazione,
  aggiungiEsameRicetta,
  aggiungiEsamiRicetta,
  aggiungiPrestazioneRicetta,
  searchEsamiRicetta,
  eliminaEsameRicetta,
  eliminaPrestazioneRicetta,
  searchPrestazioniDescrizioneRic,
  riepilogoContabileRicetta
}
