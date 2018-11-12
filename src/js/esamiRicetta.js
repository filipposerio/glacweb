/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
import * as model    from './mdlRicette.js';

/*
Body module
*/

// Module variables


const aggiungiesamiModale = `
<br>
<br>
<div class="row">
      <div class="col-lg-4">
        <form id="searchEsamiModal">
            <div class="search__wrapper">
                <label for="s" class="search__label">Cerca esame: </label>
                <input type="search" id="name" class="search__input">
                <button type="submit" >Cerca</button>
            </div>
          </form>
          <div class="esamilab-sub"></div>
      </div>
      
      <div class="col-lg-2">
        Esami selezionati
        <form id="aggiungiEsamiCarrello">
          <ul id="carrelloesami" class="list-group">
          </ul>
          <button id="nuoviesami" class="btn-success" >Conferma</button>
        <form>
      </div>
</div>
</div>
`;

const mainHTML = `
<div id="subesa" class="elencoesami-sub"></div>
`;

document.addEventListener( 'insertEsamiPazienteRic', ( event ) => {
  console.log("scattata la insertEsamiPazienteRic");
  console.log("chiamo la searchEsamePaziente......" );
  model.searchEsamiRicetta( localStorage.idRicetta );
});

document.addEventListener( 'searchPrestazioniDescrizioneRic', ( event ) => {
  console.log("passo dalla eventlistener searchPrestazioniDescrizione... " )
  if (event.data != undefined) {
    console.log("searchPrestazioniDescrizione creo lista da elenco" )

      listEsamiLaboratorio( event.data );
  }
  else {
    console.log("searchPrestazioniDescrizione event.data undefined!!!!!!")

    message.show("Nessun esame presente.")
    listEsamiLaboratorio([])
  }
});
document.addEventListener( 'eliminaEsameRicetta', ( event ) => {
  console.log("scattata la eliminaEsameRicetta");
  console.log("chiamo la eliminaEsameRicetta......" );
  model.searchEsamiRicetta( localStorage.idRicetta );
});

document.addEventListener( 'aggiungiEsameRicetta', ( event ) => {
  console.log("scattata la aggiungiEsameRicetta");
  console.log("chiamo la searchEsamiRicetta......" );
  model.searchEsamiRicetta( localStorage.idRicetta );
});
document.addEventListener( 'searchEsamiRicetta', ( event ) => {
  console.log("passo dalla eventlistener searchEsamiRicetta... " + event.data)
  if (event.data != undefined) {
    //console.log("searchEsamiRicetta creo lista da elenco" + event.data)

      listEsamiRicetta( event.data );
  }
  else {
    console.log("searchEsamiRicetta event.data undefined!!!!!!")

    message.show("Nessun esame presente per la ricetta.")
    listEsamiRicetta([])
  }
});

document.addEventListener( 'searchEsamiDescrizione', ( event ) => {
  //console.log("passo dalla eventlistener searchEsamiDescrizione... " + event.data)
  if (event.data != undefined) {
    //console.log("searchEsamiDescrizione creo lista da elenco" + event.data)

      list( event.data );
  }
  else {
    console.log("searchEsamiDescrizione event.data undefined!!!!!!")
    message.show("Nessun esame presente.")
    list([])
  }
});


const listEsamiRicetta = ( rows ) => {
  console.log("funzione listEsamiRicetta: " + rows)
  localStorage.totaleRicetta = 0;
  for (let j=0; j<rows.length; j++){
    localStorage.totaleRicetta = +localStorage.totaleRicetta + +rows[j].TESAME;
  }
  localStorage.totaleRicetta = parseFloat(localStorage.totaleRicetta).toFixed(2);
  const html = `
  <p>
  <button class="btn-link btn-sm" id="aggiungiesami">Aggiungi Esami</button>
  <!--button  class="btn-link btn-sm" id="elencoesamiricetta" >Esami della ricetta</button-->
  <button  class="btn-link btn-sm" id="riepilogoricetta" >Conferma</button>
  <h6 align="center"> Elenco esami già associati alla ricetta  NNNNNNNN </h6>

  <table id="esamiList"  class="table table-sm" >
    <thead>
      <tr>
      <th scope="col">Descrizione</th>
      <th scope="col">codice prestazione SSN</th>
      <th scope="col">Tariffa</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    ${rows.map(row => `
      <tr id=${row.IDESAMEPAZIENTE}  >
        <td ><p>${row.DESCRIZIONE}</p></td>
        <td ><p>${row.CODICEPRESTAZIONESSN}</p></td>
        <td ><p>${row.TESAME}</p></td>
        <td><p><sel id="del">Elimina</sel></p></td>
        <td><p><sel id="upd">Modifica</sel></p></td>
      </tr>`
    ).join('')}
    <tr id="totali"" >
      <td ><p></p></td>
      <td ><p><b>Totale</b></p></td>
      <td ><p>${localStorage.totaleRicetta}</p></td>
      <td ><p></p></td>
      <td><p></p></td>
    </tr>
    </tbody>
  </table>
`;
  document.querySelector('.elencoesami-sub').innerHTML = html;
  const btn_aggiungi = document.getElementById("aggiungiesami")
  btn_aggiungi.addEventListener('click', aggiungiEsami, false);
  const btn_confermaricetta  = document.getElementById( "riepilogoricetta" );
  btn_confermaricetta.addEventListener ('click', riepilogoricetta, false);
  //const btn_esami  = document.getElementById( "elencoesamiricetta" );
  //btn_esami.addEventListener ('click', esamiricetta, false);
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
            model.eliminaEsameRicetta(objEsame)
          break;
        }
      }
    }
  });
}
//window.scrollTo(0,document.body.scrollHeight);
 };


 const esamiricetta = ( idRicetta ) => {
   //alert("chiamo la esami ricetta")
   console.log("chiamo la iniit module esame per elenco esami per ricetta")
   event.preventDefault();
   //esame.initModule( document.querySelector('.elencoacc-sub') );
   model.searchEsamiRicetta( localStorage.idRicetta );
 };

 const riepilogoricetta = () => {
   const a= confirm("Hai aggiunto tutti gli esami alla ricetta?")
   if (a==true) {
     let objRicetta = {}
     objRicetta.idRicetta = localStorage.idRicetta;
     //alert(localStorage.esenzioneRicetta)
     objRicetta.tricetta = localStorage.totaleRicetta;
     if (localStorage.esenzioneRicetta == "S"){
       objRicetta.tassistito = 0
       objRicetta.tnetto = localStorage.totaleRicetta
     }
     else {
       if (+localStorage.totaleRicetta > 36.15) {
         objRicetta.tassistito = 36.15
         objRicetta.tnetto = +localStorage.totaleRicetta - 36.15
       }
       else {
         objRicetta.tassistito = localStorage.totaleRicetta
         objRicetta.tnetto = 0
       }
     }
     model.riepilogoContabileRicetta(objRicetta);

   }

 };


 const listEsamiLaboratorio = ( rows ) => {
   console.log("funzione list: ")
   const html = `
   <p>
   <h6 align="center"> Elenco esami erogati </h6>
   <fieldset>
   <table id="esamiLabList"  class="table table-sm" style="font-size:80%;">
     <tr >
       <th scope="col"></th>
       <th scope="col">Numero Esame</th>
       <th scope="col">Descrizione</th>
       <th scope="col">codiceSSN</th>
       <th scope="col">T convenzione</th>
       <th scope="col">T privato</th>
     </tr>
     ${rows.map(row => `
       <!--tr id=${row.idEsame} class="row" descrizioneEsame="${row.descrizioneEsame}" numEsame="${row.num_esame}" codicePrestazioneSSN="${row.codicePrestazioneSSN}"-->
       <tr id=${row.IDPRESTAZIONE} >
         <td><p><sel id="add">+</sel></p></td>
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
             objEsame.idRicetta = localStorage.idRicetta;
             //objEsame.num_esame = rowCols[1].innerText
             objEsame.tEsame = rowCols[5].innerText
             //model.aggiungiEsameRicetta(objEsame)
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
             console.log("++++++++++++++++++++++++++++++++++++++++ " + localStorage.totaleRicetta)
             localStorage.totaleRicetta = +localStorage.totaleRicetta + +rowCols[5].innerText;
             console.log("++++++++++++++++++++++++++++++++++++++++ " + localStorage.totaleRicetta)

           break;
         }
       }
     }
   });
   }
   //window.scrollTo(0,document.body.scrollHeight);
  };



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
  model.searchPrestazioniDescrizioneRic( event.target.name.value);
};



const aggiungiEsami = (event) => {
  event.preventDefault();
  showEsamiModal(aggiungiesamiModale);
}


const confermaEsami = (event) => {
  event.preventDefault();
  //alert("conferma esami")
  //console.log("scattata la confermaEsami");

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
    objEsame.idRicetta = localStorage.idRicetta;
    objEsame.tEsame = li.getAttribute("tariffa");
    arrayEsami.push(objEsame)


     //li.parentNode.removeChild(li);
    //console.log(li.getAttribute("id"));
  }
  console.log("verifico arraylength " + arrayEsami.length);
  if (arrayEsami.length > 0) {
    console.log("ok arraylength");
    model.aggiungiEsamiRicetta(arrayEsami)
    }
    else{
      console.log(" arraylength vuoto");
    }
    clearulEsami();


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



const onClickClosebtn = () => {

  document.querySelector('.message-modal').style.display = "none";
};

const showEsamiModal = ( msg ) => {

  const message_html = `
    <div id="id01" class="message-modal">
      <div class="message-modal-content">
        <span class="message-modal-closebtn">&times;</span>
        <p id="message-modal-text">${ msg }</p>
      </div>
    </div>
  `;
  
  
  document.querySelector('.shell-modal').innerHTML = message_html;
  const form = document.forms.searchEsamiModal;
  form.addEventListener ('submit', searchEsami, false);
  const btn_confermaesami = document.getElementById("nuoviesami")
  btn_confermaesami.addEventListener('click', confermaEsami, false);
  
  document.querySelector('.message-modal').style.display = "block";
  document.querySelector('.message-modal-closebtn').addEventListener('click', onClickClosebtn );
};



// Export module initModule
const initModule = ( container ) => {
  console.log("initmodule esamiRicetta idRicetta " +localStorage.idRicetta)
  container.innerHTML = mainHTML;


  model.searchEsamiRicetta( localStorage.idRicetta );
};




export { initModule };
