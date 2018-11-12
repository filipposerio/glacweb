/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
import * as model    from './model.js';

/*
Body module
*/
let userID;
// Module variables
const mainHTML = `
</br>
</br>
<div class="elencoprestazioni-sub"></div>
</br>
  <form id="searchEsami">
    <div class="search__wrapper">
      <p>
        <label for="s" class="search__label">Cerca prestazione SSN: </label>
        <input type="search" id="name" class="search__input">
        <button type="submit" >Cerca</button>
      </p>
    </div>
  </form>

  <div class="prestazioniSSN-sub"></div>
`;


const prestazioneHTML = `
  <fieldset>
    <legend> Nuova prestazione SSN </legend>
    <form id="prestazioniricetta">
    <p>
      <label for="codicePrestazione">Codice Prestazione</label><br>
      <input type="text" name="codicePrestazione" required>
    <p>
    <p>
        <input type='button' ></input>
    </p>
    </form>
  </fieldset>
`;
/*
 Event handlers
*/
document.addEventListener( 'searchPrestazioniDescrizionexxx', ( event ) => {
  console.log("passo dalla eventlistener searchPrestazioniDescrizione... " )
  if (event.data != undefined) {
    console.log("searchPrestazioniDescrizione creo lista da elenco" )

      listPrestazioniSSN( event.data );
  }
  else {
    console.log("searchPrestazioniDescrizione event.data undefined!!!!!!")

    message.show("Nessun esame presente.")
    listPrestazioniSSN([])
  }
});

document.addEventListener( 'eliminaPrestazioneRicetta', ( event ) => {
  console.log("passo dalla eventlistener eliminaPrestazioneRicetta " + event.data)
  model.searchPrestazioniRicetta(localStorage.idRicetta);

});


document.addEventListener( 'aggiungiPrestazioneRicetta', ( event ) => {
  console.log("passo dalla eventlistener aggiungiPrestazioneRicetta " + event.data)
  console.log("chiamo la searchPrestazioniRicetta......per id " + localStorage.idRicetta);
  model.searchPrestazioniRicetta( localStorage.idRicetta );

});
document.addEventListener( 'searchPrestazioniRicetta', ( event ) => {
  console.log("passo dalla eventlistener searchPrestazioniRicetta " + event.data)
  if (event.data != undefined) {
    console.log("searchPrestazioniRicetta creo lista da elenco" + event.data)
      listPrestazioniRicetta( event.data );
  }
  else {
    console.log("searchPrestazioniRicetta event.data undefined!!!!!!")
    message.show("Nessuna prestazione presente per la ricetta selezionata.");

    listPrestazioniRicetta([]);
  }

});

const searchPrestazioni = ( event) => {

  console.log('search searchPrestazioni' +  event.target.name.value );
  event.preventDefault();
  console.log("chiamo la searchPrestazioni......: filtro: " +  event.target.name.value);
  model.searchPrestazioniDescrizioneRic( event.target.name.value);
};

const nuovo = () => {
  document.querySelector( '.elencoprestazioni-sub' ).innerHTML = prestazioneHTML;
  const form = document.forms[ 'prestazioniricetta' ];
  form.addEventListener( 'submit', ( event ) => {
      event.preventDefault();
      //model.createRicetta(dm.formToJSON(form));
  });
};

const show = ( data ) => {

  document.querySelector( '.ricette-sub' ).innerHTML = userHTML;
  const form = document.forms[ 'user' ];

  dm.JSONToForm( form, data );

  form.addEventListener( 'submit', ( event ) => {

    event.preventDefault();

    console.log ( "submit " + data );

    //user.update(  data._id, dm.formToJSON( form ) );

  });

};


const listPrestazioniSSN = ( rows ) => {
  console.log("funzione list: " )
  const html = `
  <p>
  <h3 align="center"> ELENCO PRESTAZIONI EROGATE DAL SSN </h3>

  <table id="prestazioniSSNList"  class="table">
    <tr class="table-warning">
      <th scope="col"></th>
      <th scope="col">Codice Prestazione</th>
      <th scope="col">Descrizione</th>
    </tr>
    ${rows.map(row => `
      <!--tr id=${row.IDPRESTAZIONE} class="row" descrizionePrestazione="${row.descrizione}" codicePrestazione="${row.codicePrestazione}"-->
      <tr id=${row.IDPRESTAZIONE} class="table-warning">
        <td><p><sel id="add">Aggiungi alla ricetta</sel></p></td>
        <td ><p>${row.CODICEPRESTAZIONESSN}</p></td>
        <td ><p>${row.DESCRIZIONE}</p></td>
      </tr>`
    ).join('')}
  </table>

  </p>
`;
  document.querySelector( '.prestazioniSSN-sub' ).innerHTML = html;

  const table  = document.getElementById( "prestazioniSSNList" );
  //const tableRows = table.querySelectorAll(".row");
  const tableRows =table.getElementsByTagName( "tr" );
  for( let row of tableRows ) {
    row.addEventListener('click', ( event ) => {
      if (event.target.tagName == 'SEL') {
        switch( event.target.id ) {
          case "add" : {
            console.log("scattato select della riga")
            const rowCols = row.getElementsByTagName( "td" );

            let objPrestazione ={};
            objPrestazione.idPrestazione = row.id;
            objPrestazione.idRicetta = localStorage.idRicetta;
            objPrestazione.nRicetta = localStorage.nRicetta;
            objPrestazione.idAccettazione = localStorage.idAccettazione;
            objPrestazione.codicePrestazione = rowCols[1].innerText
            objPrestazione.descrizione = rowCols[2].innerText
            model.aggiungiPrestazioneRicetta(objPrestazione)
          break;
        }
      }
    }
  });
  }
  window.scrollTo(0,document.body.scrollHeight);
 };

const listPrestazioniRicetta = ( rows ) => {
  console.log("funzione list: " + rows)


  const html = `
  <p>
  <h3 align="center"> ELENCO PRESTAZIONI GIA' ASSOCIATE ALLA RICETTA </h3>

  <table id="prestazioniList"  class="table">
    <thead>
    <tr>
      <th scope="col">N. Ricetta</th>
      <th scope="col">Codice Prestazione SSN</th>
      <th scope="col">Descrizione</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
    <thead>
    <tbody>
    ${rows.map(row => `
        <tr id=${row.idPrestazioneRicetta}>
        <td ><p>${row.nRicetta}</p></td>
        <td ><p>${row.codicePrestazione}</p></td>
        <td ><p>${row.descrizione}</p></td>
        <td><p><sel id="del">Elimina prestazione</sel></p></td>
        <td><p><sel id="upd">Modifica</sel></p></td>
      </tr>`
    ).join('')}
    </tbody>
  </table>

  </p>
`;

  document.querySelector( '.elencoprestazioni-sub' ).innerHTML = html;

  const table  = document.getElementById( "prestazioniList" );
  //const tableRows = table.querySelectorAll(".row");
  const tableRows = table.getElementsByTagName( "tr" );
  for( let row of tableRows ) {
    console.log('stampo intera riga')

    console.log(row.id)
    row.addEventListener('click', ( event ) => {

      console.log(event.target)
      console.log(row)
      console.log(row.nodeType)

      if (event.target.tagName == 'SEL') {
        switch( event.target.id ) {
          case "sel" : {
            localStorage.idPrestazioneRicetta = row.id;
            break;
          }
          case "del" : {
            console.log('eliminare la prestazione '+ row.id)
            model.eliminaPrestazioneRicetta(row.id)
            break;
          }
        }
      }
    });
  }
};


const serializeArray = ( fields ) => {
  const object = {};
  for( let field of fields ){
    object[ field.name ] = field.value;

  }

  return object;
};




// Export module initModule

const initModule = ( container ) => {
  console.log("initmodule prestazioniRicetta idRIcetta " +localStorage.idRicetta)
  container.innerHTML = mainHTML;
  const form = document.forms.searchEsami;
  form.addEventListener ('submit', searchPrestazioni, false);
  //document.getElementById('info').innerHTML = 'Paziente selezionato: ' + localStorage.paziente + ' Accettazione N. ' + localStorage.idAccettazione

  model.searchPrestazioniRicetta(localStorage.idRicetta );
};


export { initModule };
