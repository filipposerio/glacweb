/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
import * as sedutesupplementari from './certSedute.js';
import * as certificatoAllegatoC from './allegatoC.js';
import * as certificatoInsufficienza from './certInsufficienza.js';
import * as foglioFirme from './foglioFirme.js';
import * as certificatoUremia from './uremia.js';
import * as pazienti from './pazienti.js';

//import * as mdlTurno    from './mdlCertificazioni.js';

/*
Body module
*/

// Module variables
let objPaziente ={}
const mainHTML = `
<p>
  <div id="headercertificati" class="d-print-none">
  <br>
  <button class="btn-link btn-sm" id="sedute" >Certificato sedute effettuate</button>
  <button class="btn-link btn-sm" id="allegatoc" >Allegato C</button>
  <button class="btn-link btn-sm" id="insufficienza" >Certificato insufficianza renale</button>
  <button class="btn-link btn-sm" id="firme" >Foglio Firme</button>  
  <button class="btn-link btn-sm" id="uremia" >Uremia</button>  
</div>
<div id="subesa" class="certificato-sub"></div>'

`;

document.addEventListener( 'selezionePazienteCertificati', ( event ) => {
  event.preventDefault()
  objPaziente = event.data;
  console.log('scattata la selezionePazienteCertificati')
  console.log(objPaziente.paziente)
  /*const htmlPaziente = `
      <button class="btn btn-link btn-sm"  id="elencocertificati" ><h6>Paziente selezionato: ${objPaziente.nominativo}</h6></button>
`;
const pz  = document.getElementById( "cercapaziente" );
pz.innerHTML=""
const dtl  = document.getElementById( "dtlPazienti" );
dtl.innerHTML=""
const info_paziente  = document.getElementById( "info_paziente" );
info_paziente.innerHTML = htmlPaziente
const btn_certificati  = document.getElementById( "elencocertificati" );
btn_certificati.addEventListener ('click', certificati, false);*/
initModule( document.querySelector('.read-sub') );
});

const sedute = () => {
  console.log("click su sedute supplementari")
  //sedutesupplementari.initModule(  document.querySelector( '.certificato-sub' ))
  const event = new CustomEvent('sedutesupplementari', {bubbles: true, cancelable: true})
  event.data=  objPaziente
  document.dispatchEvent( event )
}

const allegatoc = () => {
  certificatoAllegatoC.initModule(  document.querySelector( '.certificato-sub' ))
}
const insufficienza = () => {
  certificatoInsufficienza.initModule(  document.querySelector( '.certificato-sub' ))
}
const firme = () => {
  foglioFirme.initModule(  document.querySelector( '.certificato-sub' ))
}
const uremia = () => {
  certificatoUremia.initModule(  document.querySelector( '.certificato-sub' ))
}


// Export module initModule
const initModule = ( container ) => {
  //console.log("initmodule esamiRicetta idRicetta " +localStorage.idRicetta)
  container.innerHTML = mainHTML;
  const btn_sedute  = document.getElementById( "sedute");
  btn_sedute.addEventListener ('click', sedute, false);
  const btn_allegatoc  = document.getElementById( "allegatoc");
  btn_allegatoc.addEventListener ('click', allegatoc, false);
  const btn_insufficienza  = document.getElementById( "insufficienza");
  btn_insufficienza.addEventListener ('click', insufficienza, false);
  const btn_firme  = document.getElementById( "firme");
  btn_firme.addEventListener ('click', firme, false);
  const btn_uremia  = document.getElementById( "uremia");
  btn_uremia.addEventListener ('click', uremia, false);   
  //mdlTurno.elencoPazientiPerTurno("pm")
};


export { initModule };
