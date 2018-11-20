/*
Import Section
*/
import * as utility   from './utility.js';


/*
Body module
*/

// Module variables
let objPaziente = {}
const mainHTML = `
<div class="sedute-sub"></div>
`;

document.addEventListener( 'allegatoc', ( event ) => {
  console.log('scattata la event allegatoc')
  event.preventDefault()
  objPaziente = event.data;
  initModule(  document.querySelector( '.certificato-sub' ))

});


const stampaCertificato = () => {
  window.print();
}
const allegatoc = ( rows ) => {
  const html = `

  <div class="container-fluid" align="center">

  <br>
  <div class="col-lg-6">
  <button id="stampaCertificato" type="button" class="form-control btn-sm btn-primary d-print-none">Stampa</button>
  </div>
  <div class="col-lg-6" align="right">Allegato C </div>
  <div class="col-lg-6" align="left">____________________________________________________________________________________________________________________________</div>
  <div class="col-lg-6" align="center"><h5>REGIONE SICILIANA</h5></div>
  <div class="col-lg-6" align="center"><h5>AZIENDA UNITA' SANITARIA LOCALE N° 6</h5></div>
  <div class="col-lg-6" align="center"><h5>PALERMO</h5></div>
  <div class="col-lg-6" align="left">____________________________________________________________________________________________________________________________</div>
  <br>    
  <div class="col-lg-6" align="left"><h5>OGGETTO : Dichiarazione di impegno relativa alle prestazioni di dialisi autorizzate</h5></div>
  <br>    
  <div class="col-lg-6" align="right"><h5>AL SERVIZIO MEDICINA DI BASE</h5></div>
  <div class="col-lg-6" align="right"><h5>DISTRETTO ${objPaziente.distrettoaslpaziente}</h5></div>
  <div class="col-lg-6" align="right"><h5>PALERMO</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>Il sottoscritto assistito/a  ${objPaziente.cognome} ${objPaziente.nome} C.F. ${objPaziente.cf}</h5></div>
  <br>
  <div class="col-lg-6" align="left"><h5>nato a ${objPaziente.comunenascita} il  ${utility.dataItaliana(objPaziente.datanascita)} e residente a ${localStorage.comuneresidenza}  <h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>in Via ${objPaziente.indirizzoresidenza}<h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>dichiara sotto la propria responsabilita che le prestazioni di dialisi</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>autorizzate __________________ da questa USL saranno effetuate presso</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>l'ambulatorio di dialisi , denominato EMODIALISI PALERMO S.R.L.</h5></div>
  <br>    


  <div class="col-lg-6" align="left"><h5>operante nel comune di PALERMO Via Giovanni Dotto n 12</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>telefono 091 427426/6523409 diretto dal Dott Marco Mancusi.</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>Nel caso in cui per motivi vari , le prestazioni autorizzate non siano</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>totalmente o parzialmente effettuate presso l'ambulatorio di cui sopra,</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>il sottoscritto si impegna a comunicare immediatamente il numero delle</h5></div>
  <br>    
  <div class="col-lg-6" align="left"><h5>prestazioni non effettuate indicandone i motivi.</h5></div>
  <br>
  <div class="col-lg-6" align="left">Palermo li ${(new Date().getDate().toString().padStart(2,'0'))+'-'+ (new Date().getMonth()+1).toString().padStart(2, '0') +'-'+new Date().getFullYear().toString()} </div>
  <br>    
  <div class="col-lg-6" align="right">Il Dichiarante (1)</div>
  <br>    
  <div class="col-lg-6" align="right">______________________ </div>
  <br>
  <div class="col-lg-6"  align="left">${objPaziente.ndocumento}</div>
  <div class="col-lg-6" align="left">____________________________________________________________________________________________________________________________</div>
  <div class="col-lg-6">
  <div class="d-print-none">
  <br>
  <button id="stampaCertificatoFooter" type="button" class="form-control btn-sm btn-primary d-print-none">Stampa</button>
  </div>
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

  allegatoc();
  window.print();
};



export { initModule };
