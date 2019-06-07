/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
//import * as model    from './model.js';
import * as ricettaweb from './ricettaWeb.js';
import * as mdlAccettazioni    from './mdlAccettazioni.js';
import * as mdlRicette    from './mdlRicette.js';
import * as esamepaziente   from './esamiPaziente.js';
import * as utility   from './utility.js';
import * as accettazione from './accettazione.js';

/*
Body module
*/
let userID;
let objPaziente ={}
let objAccettazione ={}
let objRicetta = {}
// Module variables


const html = `
<div id="paz"></div>
`;


// function module
const esamiRicette = () => {
    mdlRicette.searchRicetteAccettazione(objAccettazione.idaccettazione)
  };
const ricetteAccettazione = () => {
  mdlRicette.searchRicetteAccettazione(objAccettazione.idaccettazione)
};

const AccettazioniPaziente = () => {
    mdlAccettazioni.searchAccettazioniPaziente(objPaziente.idanagrafica)
};



// event 
document.addEventListener( 'selezionePazienteLat', ( event ) => {
  event.preventDefault;
  objPaziente = event.data;
  console.log('scattata la selezionePazienteLat ' + event.data.nome + ' ' + event.data.cognome+' ' +event.data.cf)
  document.getElementById('paz').innerHTML = `  
    <button class="btn btn-link btn-sm"  id="elencoaccettazioni1" ><h6> ${event.data.nome} ${event.data.cognome} ${event.data.cf}</h6> </button>
    </br>
    <div id="acc"></div>
  `; 
  const btn_acc1 = document.getElementById('elencoaccettazioni1')
  //alert(btn_acc1.id)
  btn_acc1.addEventListener('click',AccettazioniPaziente,false);
});
document.addEventListener( 'selezioneAccettazioneLat', ( event ) => {
  event.preventDefault;
  objAccettazione = event.data;
  console.log('scattata la selezioneAccettazioneLat')
  console.log(event.data)
  //document.getElementById('all').innerHTML =  ``;
  document.getElementById('acc').innerHTML =  
  `<button id="btn_acc_lat" class="btn btn-link btn-sm"><h6>Accettazione N.  ${event.data.idaccettazione} </h6> </button>
  </br>
  </br>
  <div id="ric"></div>
  <div id="esm"></div>
  <div id="rpl"><button>Concludi accettazione</button></div>  
  `;
  const btn_acc = document.getElementById('btn_acc_lat')
  btn_acc.addEventListener('click',ricetteAccettazione,false);

});
document.addEventListener( 'selezioneRicettaLat', ( event ) => {
  event.preventDefault;
  objRicetta = event.data;
    document.getElementById('ric').innerHTML =  `<button id="acccselezionata" class="btn btn-link btn-sm"><h6>Ricetta N.  ${event.data.nricetta} </h6> </button> `;
});

const setPaziente = (paziente)  =>{
  document.getElementById('laterale').innerHTML = paziente;
}


// Export module initModule
const initModule = (  ) => {
 console.log("initmodule laterale ")
 document.getElementById('laterale').innerHTML = html;
 //document.getElementById('info').innerHTML = ''

 
};



export { initModule, setPaziente };
