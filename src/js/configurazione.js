

/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
import * as model    from './model.js';
import * as accettazione from './accettazione.js';
import * as ricettaweb from './ricettaWeb.js';
import * as comuni from './comuni.js';
import * as prestazione    from './prestazioniRicetta.js';
import * as esame   from './esamiRicetta.js';



/*
Body module
*/
let userID;
// Module variables
const mainHTML = `
<div class="container">
  <div class="row">
    <div class="col-lg-3">
      <button class="btn btn-xs btn-link" id="btnprestazioni">Prestazioni di laboratorio</button>
    </div>
    <div class="col-lg-3">
      <button class="btn btn-xs btn-link" id="btnesami">Esami di laboratorio</button>
    </div>
    <div class="col-lg-3">
      <!--button class="btn btn-xs btn-link" id="btnesamiprestazioni">Associazione Prestazioni di laboratorio / Esami di laboratorio</button-->
    </div>
    </div>
  </div>
</div>
<div id="dtl" class="dtllab-sub">  </div>
`;
/*
 Event handlers
*/
document.addEventListener( 'searchEsamiPrestazione', ( event ) => {
  //console.log("passo dalla eventlistener searchEsamiPrestazione " + event.data)
  if (event.data != undefined) {
    //console.log("searchEsamiPrestazione creo lista da elenco" + event.data)
    listEsamiiLab( event.data );
  }
  else {
    console.log("searchEsamiPrestazione event.data undefined!!!!!!")
    message.show("Nessun esame presente.")
    listEsamiiLab([])
  }
});

document.addEventListener( 'searchEsamiDescrizione', ( event ) => {
  console.log("passo dalla eventlistener searchEsamiDescrizione... ")
  console.log(event.data)
  if (event.data != undefined) {
    console.log("searchEsamiDescrizione creo lista da elenco" )

    listEsamiiLab( event.data );
  }
  else {
      console.log("searchEsamiDescrizione event.data undefined!!!!!!")

    message.show("Nessun esame presente.")
    listEsamiiLab([])
  }
});

document.addEventListener( 'searchPrestazioniDescrizioneConf', ( event ) => {
  console.log("passo dalla eventlistener searchPrestazioniDescrizione... ")
  console.log(event.data)
  if (event.data != undefined) {
    console.log("searchPrestazioniDescrizione creo lista da elenco" )
    listPrestazioniLab(event.data);
  }
  else {
    console.log("searchPrestazioniDescrizione event.data undefined!!!!!!")
    message.show("Nessun esame presente.")
    listPrestazioniLab([])
  }
});


const listEsamiiLab = ( rows ) => {
  //console.log("funzione list: " + rows[0].DESCRIZIONE)
  //console.log("funzione list: " + rows[0][0]);
  //console.log("funzione list: " + rows[0].RANGEM)
  const html = `
  <p>
  <h6 align="center"> Elendo esami (${rows.length} righe)</h6>

  <table id="prestazioniSSNList"  class="table">
    <tr class="table table-sm">
      <th scope="col">NUM_ESAME</th>
      <th scope="col">Descrizione</th>
      <th scope="col">Unita misura</th>
      <th scope="col">Range M</th>
      <th scope="col">Range F</th>
      <th scope="col">Range B</th>
      <th scope="col">Num Prest</th>
    </tr>
    ${rows.map(row => `
      <tr id=${row.idesame} class="table table-sm">
        <td ><p>${row.num_esame}</p></td>
        <td ><p>${row.descrizione}</p></td>
        <td ><p>${row.umisura}</p></td>
        <td ><p>${row.rangem}</p></td>
        <td ><p>${row.rangef}</p></td>
        <td ><p>${row.rangeb}</p></td>
        <td ><p>${row.num_prest}</p></td>
      </tr>`
    ).join('')}
  </table>
  </p>
`;
//document.querySelector( '.dtllab-sub' ).innerHTML = html;
message.show(html)


};


const listPrestazioniLab = ( rows ) => {
  console.log("funzione list: " + rows)
  const html = `
  <p>
  <h6 align="center"> Elenco prestazioni erogate dal laboratorio (${rows.length} righe)</h6>
  <table id="prestazioniSSNList"  class="table table-sm table-striped">
    <tr >
      <th scope="col">Dettaglio esami</th>
      <th scope="col">N. Esami</th>
      <th scope="col">Codice Prestazione</th>
      <th scope="col">Note</th>
      <th scope="col">Descrizione</th>
      <th scope="col">Branca</th>
      <th scope="col">Num Prest</th>
      <th scope="col">Tariffa convenzionato</th>
      <th scope="col">Tariffa privato</th>
    </tr>
    ${rows.map(row => `
      <tr id=${row.idprestazione} >
        <td ><p><sel id="sel">Seleziona</sel></p></td>
        <td ><p>${row.numeroesami}</p></td>
        <td ><p>${row.codiceprestazionessn}</p></td>
        <td ><p>${row.note}</p></td>
        <td ><p>${row.descrizione}</p></td>
        <td ><p>${row.codicebranca}</p></td>
        <td ><p>${row.num_prest}</p></td>
        <td ><p>${row.tariffaconvenzionato}</p></td>
        <td ><p>${row.tariffaprivato}</p></td>
      </tr>`
    ).join('')}
  </table>
  </p>
`;
document.querySelector( '.dtllab-sub' ).innerHTML = html;
console.log("selezione righe tabella")
const table  = document.getElementById( "prestazioniSSNList" );
console.log(table)
//const tableRows = table.querySelectorAll(".row");
const tableRows =table.getElementsByTagName( "tr" );
//console.log(tableRows)
  for( let row of tableRows ) {
    //console.log("aggiungo event alle righe per selezione")
    row.addEventListener('click', ( event ) => {
      //console.log(event);
        if (event.target.tagName == 'SEL') {
            switch( event.target.id ) {
                case "sel" : {
                  console.log("scattato select della riga. Cerco esami per la prestazione: " + row.id)
                  const rowCols = row.getElementsByTagName( "td" );
                  //model.searchEsamiPrestazione(rowCols[1].innerText)
                  model.searchEsamiPrestazione(row.id)
                break;
              }
            }
        }
    });
  }
}


const prestazionilab = (event ) => {
  document.querySelector( '.dtllab-sub' ).innerHTML = "Waiting..."
  model.searchPrestazioniDescrizioneConf('%');
}


const esamilab = (event ) => {
  model.searchEsamiDescrizione('%');
}
// Export module initModule
const initModule = ( container ) => {
  console.log("initmodule configurazione")
  container.innerHTML = mainHTML;
  const btn_prestazioni  = document.getElementById( "btnprestazioni" );
  btn_prestazioni.addEventListener ('click', prestazionilab, false);
  const btn_esami  = document.getElementById( "btnesami" );
  btn_esami.addEventListener ('click', esamilab, false);
  const btn_esamiprestazioni  = document.getElementById( "btnesamiprestazioni" );
  btn_esamiprestazioni.addEventListener ('click', nuovo, false);

};



export { initModule };
