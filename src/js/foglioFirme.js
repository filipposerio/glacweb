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

document.addEventListener( 'fogliofirme', ( event ) => {
  console.log('scattata la event fogliofirme')
  event.preventDefault()
  objPaziente = event.data;
  initModule(  document.querySelector( '.certificato-sub' ))

});

const stampaCertificato = () => {
  window.print();
}
const certificatofirme = ( rows ) => {
  const html = `
  <div class="container-fluid" align="center">
  <br>
  <div class="col-lg-6">
  <button id="stampaCertificato" type="button" class="form-control btn-sm btn-primary d-print-none">Stampa</button>
  </div>
  <div class="col-lg-6" align="right">Foglio firme </div>
  <div class="col-lg-6" align="left">____________________________________________________________________________________________________________________________________________________</div>
  <div class="col-lg-6" align="left"><h5>${localStorage.ragionesociale}</h5></div>
  <div class="col-lg-6" align="left"><h5>${localStorage.indirizzo}</h5></div>
  <div class="col-lg-6" align="left"><h5>PArtita IVA ${localStorage.piva}</h5></div>
  <div class="col-lg-6" align="left"><h5>Telefono: ${localStorage.telefono}</h5></div>
  <div class="col-lg-6" align="left">____________________________________________________________________________________________________________________________________________________</div>
  <div class="col-lg-6" align="center"><h5>Si certifica che il Sig/ra ${objPaziente.cognome} ${objPaziente.nome} - ${utility.dataItaliana(objPaziente.datanascita)}<h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>Documento - ${objPaziente.ndocumento} - ha effettuato nel mese di ___________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>N ________________   (________________________________________________________________)</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>sedute di emodialisi nei seguenti giorni</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>1 ________________________________               16 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>2 ________________________________               17 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>3 ________________________________               18 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>4 ________________________________               19 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>5 ________________________________               20 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>6 ________________________________               21 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>7 ________________________________               22 ________________________________</h5></div>
  <br>   
  <div class="col-lg-6" align="left"><h5>8 ________________________________               23 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>9 ________________________________               24 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>10 ________________________________              25 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>11 ________________________________              26 ________________________________</h5></div>
  <br>     
  <div class="col-lg-6" align="left"><h5>12 ________________________________              27 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>13 ________________________________              28 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>14 ________________________________              29 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>15 ________________________________              30 ________________________________</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>31 ________________________________</h5></div>
  <div class="col-lg-6" align="right">Palermo li ${(new Date().getDate().toString().padStart(2,'0'))+'-'+ (new Date().getMonth()+1).toString().padStart(2, '0') +'-'+new Date().getFullYear().toString()} </div>
  <div class="col-lg-6" align="left">____________________________________________________________________________________________________________________________________________________</div>
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

  certificatofirme();
  window.print();

};



export { initModule };
