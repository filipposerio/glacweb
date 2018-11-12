/*
Import Section
*/
import { socket } from './socket.js'
/*
Body module
*/

const sio = socket('/')


// in ascolto su messaggi del server
sio.on( 'elencoPazientiPerTurno', ( result ) => {
  console.log("ritorno della assegnaTurno: " + result)

  //alert(result)

    const event = new CustomEvent('elencoPazientiPerTurno', {bubbles: true, cancelable: true})
    console.log("ritorno della elencoPazientiPerTurno: " + result)
    event.data = result
    document.dispatchEvent( event )


})
sio.on( 'assegnaTurno', ( result ) => {
  console.log("ritorno della assegnaTurno: " + result)

  //alert(result)

    const event = new CustomEvent('assegnaTurno', {bubbles: true, cancelable: true})
    console.log("ritorno della assegnaTurno: " + result)
    event.data = result.recordset
    document.dispatchEvent( event )


})

sio.on( 'eliminaTurno', ( result ) => {
  console.log("ritorno della assegnaTurno: " + result)

  //alert(result)

    const event = new CustomEvent('eliminaTurno', {bubbles: true, cancelable: true})
    console.log("ritorno della eliminaTurno: " + result)
    event.data = result.recordset
    document.dispatchEvent( event )


})

const eliminaTurno = ( queryString ) => {

  console.log('invio al server la richiesta eliminaTurno ' )

   sio.emit( 'eliminaTurno',queryString )
}
const assegnaTurno = ( queryString ) => {

  console.log('invio al server la richiesta assegnaTurno' )

   sio.emit( 'assegnaTurno',queryString )
}

const elencoPazientiPerTurno = ( queryString ) => {

  console.log('invio al server la richiesta :elencoPazientiPerTurno ' )

   sio.emit( 'elencoPazientiPerTurno',queryString )
}
export {

         assegnaTurno,
         elencoPazientiPerTurno,
         eliminaTurno
}
