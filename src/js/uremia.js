/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
import * as model    from './model.js';

/*
Body module
*/

// Module variables

const mainHTML = `
<div class="sedute-sub"></div>
`;


const stampaCertificato = () => {
  window.print();
}
const certificatoInsufficienza = ( rows ) => {
  const html = `
  <br>
  <br>
  <br>
  <div class="container-fluid" align="center">
  <div class="col-lg-6">
  <button id="stampaCertificato" type="button" class="form-control btn-sm btn-primary d-print-none">Stampa</button>
  </div>
  <div class="col-lg-6" align="right"><h5>Palermo li ${(new Date().getDate().toString().padStart(2,'0'))+'-'+ (new Date().getMonth()+1).toString().padStart(2, '0') +'-'+new Date().getFullYear().toString()} </h5></div>
  <br>  
  <div class="col-lg-6" align="left">____________________________________________________________________________________________________________________________</div>
  <div class="arow">
    <div class="col-lg-6" align="left"><h5>${localStorage.ragionesociale}</h5></div>
    <br>
    <div class="col-lg-6" align="left"><h5>${localStorage.indirizzo}</h5></div>
    <br>
    <div class="col-lg-6" align="left"><h5>${localStorage.telefono}</h5></div>
    <br>
    <div class="col-lg-6" align="left">____________________________________________________________________________________________________________________________</div>
    <br>    
    <div class="col-lg-6" align="center"><h5>Si certifica </h5></div>
    <br>
    <div class="col-lg-6" align="left"><h5>che il Sig/ra ${localStorage.paziente} <h5></div>
    <br>    
    <br>    
    <div class="col-lg-6" align="left"><h5>Affetto/a da << UREMIA CRONICA TERMINALE >> </h5></div>
    <br>    
    <div class="col-lg-6" align="left"><h5>nel mese di ____________ anno_______ </h5></div>
    <br>    
    <div class="col-lg-6" align="left"><h5>ha effettuato N ___________ sedute Emodialitiche</h5></div>
    <br>    
    <div class="col-lg-6" align="left"><h5>presso questo centro nei giorni:</h5></div>
    <br>    
    <br>    
    <br>    
    <br>    
    <br>    
    <br>    
    <div class="col-lg-6" align="left"><h5>Il paziente riferisce di avere utilizzato durante il </h5></div>
    <br>    
    <div class="col-lg-6" align="left"><h5>sopradetto periodo i mezzi di trasporto della MADONIE SOC.</h5></div>
    <br>    
    <div class="col-lg-6" align="left">____________________________________________________________________________________________________________________________</div>
    <div class="col-lg-6" align="left"><h6>${localStorage.ragionesociale} ${localStorage.indirizzo} ${localStorage.telefono}</h6></div>
  <br>
  <br>  
  <br>
  <div class="col-lg-6">
  <button id="stampaCertificatoFooter" type="button" class="form-control btn-sm btn-primary d-print-none">Stampa</button>
  </div>
  </div>

`;


  document.querySelector( '.sedute-sub' ).innerHTML = html;
  const btnStampa  = document.getElementById( "stampaCertificato" );
  btnStampa.addEventListener ('click', stampaCertificato, false);
  const btnStampaFooter  = document.getElementById( "stampaCertificatoFooter" );
  btnStampaFooter.addEventListener ('click', stampaCertificato, false);
}
//window.scrollTo(0,document.body.scrollHeight);


// Export module initModule
const initModule = ( container ) => {
  container.innerHTML = mainHTML;

  certificatoInsufficienza();
  window.print();
};



export { initModule };
