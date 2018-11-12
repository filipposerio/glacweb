/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
import * as model    from './model.js';
import * as paziente from './pazienti.js';

/*
Body module
*/


// Module variables
const mainHTML = `
<br>
<br>
<div class="row">
      <div class="col-lg-6">
        <div id="subesa" class="elencoesami-sub"></div>
      </div>
      <div class="col-lg-4">
        <form id="searchEsami">
            <div class="search__wrapper">
              <p>
                <label for="s" class="search__label">Cerca esame da aggiungere: </label>
                <input type="search" id="name" class="search__input">
                <button type="submit" >Cerca</button>
              </p>
            </div>
          </form>
          <div class="esamilab-sub"></div>
      </div>
      <div class="col-lg-2">
        Elenco esami da aggiungere
        <form id="aggiungiEsamiCarrello">
          <ul id="carrelloesami" class="list-group">
          </ul>
          <button id="nuoviesami" class="btn-success" >Conferma esami</button>
        <form>
      </div>
</div>
<!--div class="row">
<div class="col">
  <div id="subesa" class="elencoesami-sub"></div>
</div>
</div-->
`;


document.addEventListener( 'eliminaEsameAccettazione', ( event ) => {
  console.log("scattata la eliminaEsameAccettazione");
  console.log("chiamo la eliminaEsameAccettazione......" );
  model.searchEsamiPrivato( localStorage.idAccettazione );
});

document.addEventListener( 'insertEsamiPazienteAcc', ( event ) => {
  console.log("scattata la insertEsamiPazienteAcc");
  console.log("chiamo la searchEsamePaziente......" );
  document.querySelector( '.esamilab-sub' ).innerHTML = '';
  clearulEsami();

  model.searchEsamiPrivato( localStorage.idAccettazione );
});
document.addEventListener( 'searchEsamiPrivato', ( event ) => {
  console.log("passo dalla eventlistener searchEsamiPrivato... " + event.data)
  if (event.data != undefined) {
    console.log("searchEsamiPrivato creo lista da elenco" + event.data)

      listEsamiPaziente( event.data );
  }
  else {
    console.log("searchEsamiPrivato event.data undefined!!!!!!")

    message.show("Nessun esame privato presente per la accettazione.")
    listEsamiPaziente([])
  }
});



document.addEventListener( 'searchPrestazioniDescrizioneAcc', ( event ) => {
  console.log("passo dalla eventlistener searchPrestazioniDescrizione... " )

  if (event.data != undefined) {
    console.log("searchPrestazioniDescrizione creo lista da elenco" )

      list( event.data );
  }
  else {
    console.log("searchPrestazioniDescrizione event.data undefined!!!!!!")

    message.show("Nessun esame presente.")
    list([])
  }
});


const listEsamiPaziente = ( rows ) => {
  console.log("funzione listEsamiPaziente: " + rows[0])
  localStorage.totalePrivato = 0;
  for (let j=0; j<rows.length; j++){
    localStorage.totalePrivato = +localStorage.totalePrivato + +rows[j].TESAME;
  }

localStorage.totalePrivato = parseFloat(localStorage.totalePrivato).toFixed(2);

  const html = `

  <h6 align="center"> ELENCO ESAMI (PRIVATO) GIA' ASSOCIATI ALLA ACCETTAZIONE  </h6>

  <table id="esamiList"  class="table table-sm table-striped">
    <thead>
      <tr>
      <th scope="col">Descrizione</th>
      <th scope="col">Codice SSN</th>
      <th scope="col">Tariffa SSN</th>
      <th scope="col">Tariffa Privato</th>
      <th scope="col">Tariffa applicata</th>
      <th scope="col">Ricetta</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    ${rows.map(row => `
      <tr id=${row.IDESAMEPAZIENTE}  >
        <td ><p>${row.DESCRIZIONE}</p></td>
        <td ><p>${row.CODICEPRESTAZIONESSN}</p></td>
        <td ><p>${row.TARIFFACONVENZIONATO}</p></td>
        <td ><p>${row.TARIFFAPRIVATO}</p></td>
        <td ><p>${row.TESAME}</p></td>
        <td ><p>${row.NRICETTA}</p></td>
        <td><p><sel id="del">Elimina</sel></p></td>
        <td><p><sel id="upd">Modifica</sel></p></td>
      </tr>`
    ).join('')}
    <tr id="totali"" >
      <td ></td>
      <td ></p></td>
      <td ></td>
      <td ><p><b>Totale</b></p></td>
      <td ><p>${localStorage.totalePrivato}</p></td>
      <td ><p></p></td>
      <td><p></p></td>
      <td><p></p></td>
    </tr>
    </tbody>
  </table>
`;
  document.querySelector( '.elencoesami-sub' ).innerHTML = html;

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
            const rowCols = row.getElementsByTagName( "td" );
            model.eliminaEsameAccettazione(objEsame)
            console.log("++++++++++++++++++++++++++++++++++++++++ " + localStorage.totaleLordo)
            localStorage.totaleLordo = +localStorage.totaleLordo - +rowCols[3].innerText;
            console.log("++++++++++++++++++++++++++++++++++++++++ " + localStorage.totaleLordo)
          break;
        }
      }
    }
  });
}
//window.scrollTo(0,document.body.scrollHeight);
 };



const list = ( rows ) => {
  console.log("funzione list: ")
  const html = `
  <p>
  <h5 align="center"> Esami erogati dal laboratorio </h5>
  <fieldset>
  <table id="esamiLabList"  class="table">
    <tr class="table-warning">
      <th scope="col"></th>
      <th scope="col">Numero Esame</th>
      <th scope="col">Descrizione</th>
      <th scope="col">codiceSSN</th>
      <th scope="col">Tariffa convenzione</th>
      <th scope="col">Tariffa privato</th>
      </tr>
    ${rows.map(row => `
      <!--tr id=${row.idEsame} class="row" descrizioneEsame="${row.descrizioneEsame}" numEsame="${row.num_esame}" codicePrestazioneSSN="${row.codicePrestazioneSSN}"-->
      <tr id=${row.IDPRESTAZIONE} class="table-warning">
        <td><p><sel id="add">Aggiungi</sel></p></td>
        <td ><p>${row.NUM_PREST}</p></td>
        <td ><p>${row.DESCRIZIONE}</p></td>
        <td ><p>${row.CODICEPRESTAZIONESSN}</p></td>
        <td ><p>${row.TARIFFACONVENZIONATO}</p></td>
        <td ><p>${row.TARIFFAPRIVATO}</p></td>
      </tr>`
    ).join('')}
  </table>
  </fieldset>
  </p>
`;
  document.querySelector( '.esamilab-sub' ).innerHTML = html;

  const table  = document.getElementById( "esamiLabList" );
  //const tableRows = table.querySelectorAll(".row");
  const tableRows =table.getElementsByTagName( "tr" );
  for( let row of tableRows ) {
    row.addEventListener('click', ( event ) => {
      if (event.target.tagName == 'SEL') {
        switch( event.target.id ) {
          case "add" : {
            console.log("scattato select della riga")
            const rowCols = row.getElementsByTagName( "td" );
            let objEsame ={};
            objEsame.idPrestazione = row.id;
            objEsame.idPaziente = localStorage.idPaziente;
            objEsame.idAccettazione = localStorage.idAccettazione;
            objEsame.idRicetta = '';
            //objEsame.num_esame = rowCols[1].innerText
            objEsame.tEsame = rowCols[5].innerText
            const ulEsami  = document.getElementById( "carrelloesami" );
            const li = document.createElement("li");
            li.setAttribute("id",  row.id);
            li.setAttribute("class","list-group-item");
            li.setAttribute("tariffa", rowCols[5].innerText)
            li.appendChild(document.createTextNode(rowCols[2].innerText + "("+rowCols[5].innerText+" €)"));
            var btn = document.createElement("BUTTON");
            var t = document.createTextNode("X");
            btn.setAttribute("id", row.id)

            btn.appendChild(t);
            btn.addEventListener ('click', removeEsami, false);
            li.appendChild(btn);
            ulEsami.appendChild(li);
            console.log(localStorage.objEsami)
            //paziente.aggiornaTotaliAccettazione(objEsame.tEsame);
            console.log("++++++++++++++++++++++++++++++++++++++++ " + localStorage.totaleLordo)
            localStorage.totaleLordo = +localStorage.totaleLordo + +rowCols[5].innerText;
            console.log("++++++++++++++++++++++++++++++++++++++++ " + localStorage.totaleLordo)


            //model.aggiungiEsameAccettazione(objEsame)
          break;
        }
      }
    }
  });
  }
  //window.scrollTo(0,document.body.scrollHeight);
 };


 const confermaEsami = (event) => {
  event.preventDefault();
  console.log("scattata la confermaEsami");

  const ulEsami  = document.getElementById( "carrelloesami" );
  //const liRemove  = ulEsami.getElementById( event.target.id );
  var lis = document.querySelectorAll('#carrelloesami li');
  console.log(lis);
  let arrayEsami = []
  //let objEsame = {}
  for( let li of lis ) {
    const objEsame ={}
    objEsame.idPrestazione = li.getAttribute("id");
    objEsame.idPaziente = localStorage.idPaziente;
    objEsame.idAccettazione = localStorage.idAccettazione;
    objEsame.idRicetta = '';
    objEsame.tEsame = li.getAttribute("tariffa");
    arrayEsami.push(objEsame)


     //li.parentNode.removeChild(li);
    //console.log(li.getAttribute("id"));
  }
  console.log("verifico arraylength " + arrayEsami.length);
  if (arrayEsami.length > 0) {
    console.log("ok arraylength");
    model.aggiungiEsamiAccettazione(arrayEsami)
    }
    else{
      console.log(" arraylength vuoto");
    }



  //alert(ulEsami)
  //ulEsami.removeChild()
}

const clearulEsami = () => {
  //event.preventDefault();
  //alert ("remove + " + event.target.id);
  const ulEsami  = document.getElementById( "carrelloesami" );
  //const liRemove  = ulEsami.getElementById( event.target.id );
  var lis = document.querySelectorAll('#carrelloesami li');
  console.log(lis);
  for( let li of lis ) {
      li.parentNode.removeChild(li);
    }
  }


const removeEsami = (event) => {
  event.preventDefault();
  //alert ("remove + " + event.target.id);
  const ulEsami  = document.getElementById( "carrelloesami" );
  //const liRemove  = ulEsami.getElementById( event.target.id );
  var lis = document.querySelectorAll('#carrelloesami li');
  console.log(lis);
  for( let li of lis ) {
    if (li.getAttribute("id") === event.target.id) {
      li.parentNode.removeChild(li);
    }
  }
}

const serializeArray = ( fields ) => {
  const object = {};
  for( let field of fields ){
    object[ field.name ] = field.value;

  }

  return object;
};


const searchEsami = ( event) => {

  console.log('search esami' +  event.target.name.value );
  event.preventDefault();
  console.log("chiamo la searchEsami......: filtro: " +  event.target.name.value);
  model.searchPrestazioniDescrizioneAcc( event.target.name.value);
};

// Export module initModule
const initModule = ( container ) => {
  console.log("initmodule esamiRicetta idRicetta " +localStorage.idRicetta)
  container.innerHTML = mainHTML;

  const form = document.forms.searchEsami;
  form.addEventListener ('submit', searchEsami, false);
  const btn = document.getElementById("nuoviesami")
  btn.addEventListener('click', confermaEsami, false);
  console.log("aggiungo event bottone confermaesami");

  //document.getElementById('info').innerHTML = 'Paziente selezionato: ' + localStorage.paziente + ' Accettazione N. ' + localStorage.idAccettazione
  model.searchEsamiPrivato( localStorage.idAccettazione );
};




export { initModule };
