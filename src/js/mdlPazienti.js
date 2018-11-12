/*
Import Section
*/
import { socket } from './socket.js'
/*
Body module
*/

const sio = socket('/')
sio.on( 'updatepaziente', ( result ) => {
  console.log("ritorno della updatepaziente: " + result)

  //alert(result)

    const event = new CustomEvent('updatepaziente', {bubbles: true, cancelable: true})
    console.log("ritorno della updatepaziente: " + result)
    event.data = result.recordset
    document.dispatchEvent( event )


})



sio.on( 'createpaziente', ( result ) => {
  console.log("ritorno della createpaziente: " )
  //alert(result)
    const event = new CustomEvent('createpaziente', {bubbles: true, cancelable: true})
    console.log("ritorno della createpaziente: " )
    event.data = result.recordset
    document.dispatchEvent(event)
})

sio.on( 'searchCognomeAcc', ( result ) => {
  console.log("ritorno della searchCognomeAcc: " + result.length)

  //alert(result)

    const event = new CustomEvent('searchCognome', {bubbles: true, cancelable: true})
    console.log("mdlPazienti - event searchCognomeAcc: ritorno della searchCognomeAcc: n.elementi: " + result.length)
     if (result.hasOwnProperty('recordset')) {
       event.data = result.recordset
     }
     else {
      console.log("mdlPazienti - event searchCognomeAcc: ramo senza recordset....")
       event.data = result
     }

    document.dispatchEvent( event )


})

sio.on( 'searchCognome', ( result ) => {
    console.log("mdlPazienti - event searchCognome: ritorno della login: " + result)

    //alert(result)

      const event = new CustomEvent('searchCognome', {bubbles: true, cancelable: true})
      console.log("mdlPazienti - event searchCognome: ritorno della searcCognome: " + result)
       if (result.hasOwnProperty('recordset')) {
         event.data = result.recordset
       }
       else {
         event.data = result
       }

      document.dispatchEvent( event )


})
const searchPazientiCognome = ( queryString ) => {

  console.log('invio al server la richiesta :searchBarcode ' + queryString)

   sio.emit( 'searchCognomeAcc', queryString )
}
const searchPazientiCognomeAcc = ( queryString ) => {

  console.log('invio al server la richiesta searchCognomeAcc ' + queryString)

   sio.emit( 'searchCognomeAcc', queryString )
}

const createPaziente = ( queryString ) => {

  console.log('invio al server la richiesta :create paziente ' )

   sio.emit( 'createpaziente',queryString )
}
const updatePaziente = ( queryString ) => {

  console.log('invio al server la richiesta :update paziente ' )

   sio.emit( 'updatepaziente',queryString )
}

export {
         createPaziente,
         searchPazientiCognome,
         searchPazientiCognomeAcc,
         updatePaziente
}
