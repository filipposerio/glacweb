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
<div class="elencoesami-sub"></div>
`;

document.addEventListener( 'searchEsamiPaziente', ( event ) => {
  console.log("passo dalla eventlistener searchEsamiPaziente... " + event.data)
  if (event.data != undefined) {
    console.log("searchEsamiPaziente creo lista da elenco" + event.data)

      listEsamiPaziente( event.data );
  }
  else {
    console.log("searchEsamiPaziente event.data undefined!!!!!!")

    message.show("Nessun esame presente per la ricetta.")
    listEsamiPaziente([])
  }
});

const stampaRiepilogoAccettazione = (rows) => {
  window.print();
}
const listEsamiPaziente = ( rows ) => {
  localStorage.totaleLordo = 0;
  for (let j=0; j<rows.length; j++){
    localStorage.totaleLordo = +localStorage.totaleLordo + +rows[j].TESAME;
  }
localStorage.totaleLordo = parseFloat(localStorage.totaleLordo).toFixed(2);
  console.log("funzione listEsamiPaziente: " + rows[0])
  const html = `
  <div class="arow">
  <button id="stampaEsamiAccettazione" type="button" class="btn-sm btn-link d-print-none">Stampa</button>
  </div>
  
  <div class="arow">
    <div class="col-sm"><h5>Istituto Polispecialistico Clinico Diagnostico</h5></div>
    <div class="col-sm"><h5>Accettazione N. ${localStorage.idAccettazione}</h5></div>
    </div>

    <div class="arow">
    <div class="col-sm"><h6>Dr. Giacomo Liguori Soc. Consortile a.r.l.</h6></div>
    <div class="col-sm"></div>
    </div>

    <div class="arow">
    <div class="col-sm"><h6>Via Padre Giuseppe Puglisi, 74/76</h6></div>
    <div class="col-sm"></div>
    </div>

    <div class="arow">
    <div class="col-sm"><h5>Paziente: ${localStorage.paziente}</h5></div>
    <div class="col-sm"><h5>Data Accettazione: ${localStorage.dataAccettazione}</h5></div>
    </div>
    <div class="arow">
    <div class="col-sm">${localStorage.indirizzoPaziente} </div>
    <div class="col-sm"></div>
    </div>
    <div class="arow">
    <div class="col-sm">${localStorage.cf}</div>
    <div class="col-sm"></div>
    </div>
    <div class="arow">
    <div class="col-sm">${localStorage.comunePaziente} </div>
    <div class="col-sm"></div>
    </div>
    <div class="arow">
    <div class="col-sm">${localStorage.telefonoPaziente} </div>
    <div class="col-sm"></div>
    </div>


  
  <div class="row" id="rigaInfoEsami>
    <div class="col-lg-1"></div>
    <div class="col">
      <h6> Elenco esami </h6>
      <table id="esamiList"  class="table table-sm">
        <thead>
          <tr>
          <th scope="col">Descrizione</th>
          <th scope="col">Ricetta</th>

        </tr>
        </thead>
        <tbody>
        ${rows.map(row => `
          <tr id=${row.IDESAMEPAZIENTE}  >
            <td ><p>${row.DESCRIZIONE}</p></td>
            <td ><p>${row.NRICETTA}</p></td>
          </tr>`
        ).join('')}
        </tbody>
      </table>
    </div>
  </div>
  
  <footer class="page-footer font-small blue">
    <div class="col" align="right">Palermo li ${(new Date().getDate().toString().padStart(2,'0'))+'-'+ (new Date().getMonth()+1).toString().padStart(2, '0') +'-'+new Date().getFullYear().toString()} </div>
    <div class="col" align="right">Il Direttore Sanitario </div>
    <div class="row" >______________________ </div>
    <div class="row" >(Firma autografa sostituita a mezzo stampa ai sensi dell’art. 3 c. 2 del D.Lgs 39/1993) </div>
  </footer>
`;
  

  document.querySelector( '.elencoesami-sub' ).innerHTML = html;
  const btnStampa  = document.getElementById( "stampaEsamiAccettazione" ); 

  btnStampa.addEventListener ('click', stampaRiepilogoAccettazione, false);
  const table  = document.getElementById( "esamiList" );
  //const tableRows = table.querySelectorAll(".row");
  const tableRows =table.getElementsByTagName( "tr" );
  for( let row of tableRows ) {
    row.addEventListener('click', ( event ) => {
      if (event.target.tagName == 'SEL') {
        switch( event.target.id ) {
          case "del" : {
            console.log("scattato select della riga")
            let objEsame ={};
            objEsame.idEsamePaziente = row.id;
            model.eliminaEsameAccettazione(objEsame)
          break;
        }
      }
    }
  });
}
//window.scrollTo(0,document.body.scrollHeight);
 };

// Export module initModule
const initModule = ( container ) => {
  container.innerHTML = mainHTML;

  model.searchEsamiPaziente( localStorage.idAccettazione );
};



export { initModule };
