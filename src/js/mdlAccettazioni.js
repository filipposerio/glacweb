/*
Import Section
*/
import { socket } from './socket.js'
/*
Body module
*/

const sio = socket('/')


// in ascolto su messaggi del server


sio.on( 'totalePrivatoAccettazione', ( result ) => {
  console.log("ritorno della totalePrivatoAccettazione: " + result)
    const event = new CustomEvent('totalePrivatoAccettazione', {bubbles: true, cancelable: true})
    console.log("ritorno della totalePrivatoAccettazione: " + result)
    event.data = result;

    document.dispatchEvent( event )
})
sio.on( 'totaleRicetteAccettazione', ( result ) => {
  console.log("ritorno della totaleRicetteAccettazione: " + result)
    const event = new CustomEvent('totaleRicetteAccettazione', {bubbles: true, cancelable: true})
    console.log("ritorno della totaleRicetteAccettazione: " + result)
    event.data = result;
    document.dispatchEvent( event )
})
sio.on( 'riepilogoContabileAccettazione', ( result ) => {
  console.log("ritorno della riepilogoContabileAccettazione: " + result)
    const event = new CustomEvent('riepilogoContabileAccettazione', {bubbles: true, cancelable: true})
    console.log("ritorno della riepilogoContabileAccettazione: " + result)
    event.data = "OK"
    document.dispatchEvent( event )
})


sio.on( 'searchAccettazioniPaziente', ( result ) => {
  console.log("ritorno della searchAccettazioniPaziente: " + result)

  //alert(result)

    const event = new CustomEvent('searchAccettazioniPaziente', {bubbles: true, cancelable: true})
    console.log("ritorno della searchAccettazioniPaziente: " + result)
    if (result.hasOwnProperty('recordset')) {
      event.data = result.recordset
    }
    else {
      event.data = result
    }
    document.dispatchEvent( event )


})


sio.on( 'createaccettazione', ( result ) => {
  console.log("ritorno della createaccettazione: " + result)

  //alert(result)

    const event = new CustomEvent('createaccettazione', {bubbles: true, cancelable: true})
    console.log("ritorno della createaccettazione: " + result)
    event.data = result.recordset
    document.dispatchEvent( event )


})



//funzioni da chiamare lato client

const riepilogoContabileAccettazione = ( queryString ) => {

  console.log('invio al server la richiesta :riepilogoContabileAccettazione ' + queryString)
   sio.emit( 'riepilogoContabileAccettazione', queryString )
}
const searchAccettazioniPaziente = ( queryString ) => {

  console.log('invio al server la richiesta mdlAccettazioni searchAccettazioniPaziente ' + queryString)

   sio.emit( 'searchAccettazioniPaziente', queryString )
}
const createAccettazione = ( queryString ) => {

  console.log('invio al server la richiesta :create paziente ' )

   sio.emit( 'createAccettazione',queryString )
}
const totalePrivato = ( queryString ) => {

  console.log('invio al server la richiesta :create paziente ' )

   sio.emit( 'totalePrivatoAccettazione',queryString )
}
const totaleRicette = ( queryString ) => {

  console.log('invio al server la richiesta :create paziente ' )

   sio.emit( 'totaleRicetteAccettazione',queryString )
}


export {
         searchAccettazioniPaziente,
         riepilogoContabileAccettazione,
         createAccettazione,
         totalePrivato,
         totaleRicette
}
