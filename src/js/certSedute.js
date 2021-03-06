/*
Import Section
*/

import * as utility   from './utility.js';
/*
Body module
*/

// Module variables
let objPaziente ={}
const mainHTML = `
<div class="sedute-sub"></div>
`;

document.addEventListener( 'sedutesupplementari', ( event ) => {
  console.log('scattata la sedutesupplementari')
  event.preventDefault()
  objPaziente = event.data;
    initModule(  document.querySelector( '.certificato-sub' ))

});


const stampaCertificato = () => {
  window.print();
}
const certificatoSeduteSupplementari = ( rows ) => {
  const html = `
  <br>
  <br>
  <br>
  <div class="container-fluid" align="center">
  <div class="col-lg-6">
  <button id="stampaCertificato" type="button" class="form-control btn-sm btn-primary d-print-none">Stampa</button>
  </div>
  <div class="col-lg-6" align="left">____________________________________________________________________________________________________________________________</div>
  <div class="arow">
    <div class="col-lg-6" align="left"><h5>${localStorage.ragionesociale}</h5></div>
    <div class="col-lg-6" align="left"><h5>Direttore Sanitario ${localStorage.direttoresanitario}</h5></div>    
    <div class="col-lg-6" align="left"><h5>${localStorage.indirizzo}</h5></div>
    <br>
    <div class="col-lg-6" align="left"><h5>${localStorage.telefono}</h5></div>
    <br>
    <div class="col-lg-6" align="left">____________________________________________________________________________________________________________________________</div>
    <br>    
    <div class="col-lg-6" align="left"><h5>Si certifica che il Sig/ra ${objPaziente.cognome} ${objPaziente.nome} </h5></div>
    <br>
    <div class="col-lg-6" align="left"><h5>nato a ${objPaziente.comunenascita} il ${utility.dataItaliana(objPaziente.datanascita)} e residente a  <h5></div>
    <br>    
    <div class="col-lg-6" align="left"><h5>${objPaziente.comuneresidenza} in ${objPaziente.indirizzoresidenza}<h5></div>
    <br>    
    <div class="col-lg-6" align="left"><h5>Codice Fiscale ${objPaziente.cf}</h5></div>
    <br>    
    <div class="col-lg-6" align="left"><h5>Affetto/a da insufficienza renale cronica terminale </h5></div>
    <br>    
    <div class="col-lg-6" align="left"><h5>necessita per il mese di ____________ 2018 </h5></div>
    <br>    
    <div class="col-lg-6" align="left"><h5>di N ________________ Emodialitiche con Cadenza ___________ settimanale</h5></div>
    <br>    
    <div class="col-lg-6" align="left"><h5>Palermo li _________________________ </h5></div>
    <br>    
    <br>
    <div class="col-lg-6" align="right">Palermo li ${(new Date().getDate().toString().padStart(2,'0'))+'-'+ (new Date().getMonth()+1).toString().padStart(2, '0') +'-'+new Date().getFullYear().toString()} </div>
    <br>    
    <div class="col-lg-6" align="right">Il Direttore Sanitario </div>
    <br>    
    <div class="col-lg-6" align="right">______________________ </div>
    <br>
    <br>
    <div class="col-lg-6"  align="left">(Firma autografa sostituita a mezzo stampa ai sensi dell’art. 3 c. 2 del D.Lgs 39/1993) </div>
    <div class="col-lg-6" align="left">____________________________________________________________________________________________________________________________</div>
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

  certificatoSeduteSupplementari();
  window.print();
};



export { initModule };
