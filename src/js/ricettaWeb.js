/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
import * as model    from './mdlRicette.js';
import * as prestazioni    from './prestazioniRicetta.js';
import * as esami   from './esamiRicetta.js';
/*
Body module
*/
let userID;
// Module variables
const mainHTML = `
<div align="center" class="display-4">Ricette - Gestione</div>

<br>


<div class="elencoric-sub"></div>
</div>


`;

const ricettaHTML = `
  <fieldset>
    <legend> Nuova ricetta </legend>
    <form id="ricetta" class="form">
    <p>
      <label for="dataRFruizione">Data fruizione ricetta</label><br>
      <input type="date" name="dataFruizione" required>
    <p>
      <label for="nRicetta">N. ricetta</label><br>
      <input type="text" class="form-control" name="nRicetta" required>
    <p>
      <label for="dataRicetta">Data compilazione ricetta da parte del medico</label><br>
      <input type="date" name="dataRicetta" required>
    <p>
    <p>
      <label for="ssn">Servizio saniario nazionale (S/N : SSN o Privato) </label><br>
      <!--input type="text" class="form-control"  name="ssn2" -->
      <select id="ssn" name= "ssn" >
        <option value="S">Servizio sanitario nazionale</option>
        <option value="P">Privato</option> 
      </select>       
     <p>
    <p>
      <label for="esente">Esente (S/N) </label><br>
      <!--input type="text" class="form-control"  name="esente2" -->
      <select id="esente" name= "esente" >
        <option value="S">Esente</option>
        <option value="N">Non esente</option> 
      </select>          
    <p>
    <p>
      <label for="codice_esenzione">Codice Esenzione</label><br>
      <input type="text" class="form-control"  name="codice_esenzione" >
    <p>
    <p>
      <label for="diagnosi">Diagnosi</label><br>
      <input type="text" class="form-control"  name="diagnosi" >
    <p>

    <p>
        <input type='submit' class="btn-xs btn-link" value="Conferma" ></input>
    </p>
    </form>
  </fieldset>
`;


const ricettaDemHTML = `
  <fieldset>
    <legend> Ricetta dematerializata </legend>
    <form id="searchricette">
    <div class="search__wrapper">
      <p>
        <label for="s" class="search__label">N.ricetta: </label>
        <input type="search" id="name" class="search__input" placeholder="nricetta">
        <label for="s" class="search__label">CF: </label>
        <input type="search" id="cf" class="search__input" placeholder="codice fiscale assisitito" disabled>
        <button type="submit" class="search__submit">Prendi in carico</button>
      </p>
    </div>
  </form>
  </fieldset>
`;
/*
 Event handlers
*/


document.addEventListener( 'aaselezioneRicetta', ( event ) => {
  const htmlRicetta = `
  <button id="ricettaselezionata"class="btn btn-link btn-sm"><h6> Ricetta N. ${localStorage.nRicetta}</h6></button>
  <br>
  <button  class="btn-link btn-sm" id="elencoesamiricetta" >Esami della ricetta</button>
  <button  class="btn-link btn-sm" id="riepilogoricetta" >Conferma</button>
`;

//document.querySelector( '.elencoric-sub' ).innerHTML = '';
//const info_ricetta  = document.getElementById( "info_ricetta" );
//info_ricetta.innerHTML = htmlRicetta
const btn_confermaricetta  = document.getElementById( "riepilogoricetta" );
btn_confermaricetta.addEventListener ('click', riepilogoricetta, false);
const btn_esami  = document.getElementById( "elencoesamiricetta" );
btn_esami.addEventListener ('click', esamiricetta, false);
const btn_ricettaselezionata  = document.getElementById( "ricettaselezionata" );
btn_ricettaselezionata.addEventListener ('click', ricettaselezionata, false);
esamiricetta(localStorage.idRicetta)
});

document.addEventListener( 'riepilogoContabileRicetta', ( event ) => {
  console.log("scattata la riepilogoContabileRicetta: " + event.data);
  if (event.data === 'OK' ) {
    //model.searchRicetteAccettazione( localStorage.idAccettazione );
    const event = new CustomEvent('selezioneAccettazione', {bubbles: true, cancelable: true})
    let objAccettazione ={}
    objAccettazione.idAccettazione =localStorage.idAccettazione;
    event.data=  objAccettazione
    document.dispatchEvent( event )
  }
  else {
    alert("errore riepilogoContabileRicetta ricetta!")
  }
});
document.addEventListener( 'deletericetta', ( event ) => {
  console.log("scattata la deletericetta: " + event.data);
  if (event.data === 'OK' ) {
    console.log("chiamo la searchRicettePerAccettazione......" );
    model.searchRicetteAccettazione( localStorage.idAccettazione );
  }
  else {
    alert("errore salvataggio ricetta!")
  }
});


document.addEventListener( 'searchRicetteAccettazione', ( event ) => {
  console.log("passo dalla eventlistener searchRicetteAccettazione [" + event.data+"]")
  //(typeof image_array !== 'undefined' && image_array.length > 0)
  if (typeof event.data != 'undefined' && event.data.length > 0) {
    console.log("searchRicetteAccettazione creo lista da elenco" + event.data)
      list( event.data );
  }
  else {
    console.log("searchRicetteAccettazione event.data undefined!!!!!!")
    //message.show("Nessuna ricetta presente per la accettazione selezionata.");
    //message.show("Nessuna ricetta presente per la accettazione selezionata.");
    list([]);
  }

});

document.addEventListener( 'searchRicettaWeb', ( event ) => {
  console.log("passo dalla eventlistener searchRicettaWeb " + event.data)
  list( event.data );
});
document.addEventListener( 'createricetta', ( event ) => {
  console.log("scattata la createricetta: " + event.data);
  if (event.data === 'OK' ) {
    console.log("chiamo la searchRicettePerAccettazione......" );
    model.searchRicetteAccettazione( localStorage.idAccettazione );
  }
  else {
    alert("errore salvataggio ricetta!")
  }
});

const ricetteAccettazione = ( idAccettazione ) => {
  event.preventDefault();
  //alert ("passo dalla ricetteAccettazione")
  const info_esami  = document.getElementById( "info_esami" );
  info_esami.innerHTML = '';
  //const info_ricetta  = document.getElementById( "info_ricetta" );
  //info_ricetta.innerHTML = '';
  ricettaweb.initModule( document.querySelector('.elencoacc-sub') );

};
const riepilogoricetta = () => {
  const a= confirm("Hai aggiunto tutti gli esmai alla ricetta?")
  if (a==true) {
    let objRicetta = {}
    objRicetta.idRicetta = localStorage.idRicetta;
    alert(localStorage.esenzioneRicetta)
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

const dem = () => {
  document.querySelector( '.elencoric-sub' ).innerHTML = ricettaDemHTML;
  const form = document.forms[ 'searchricette' ];
  form.cf.value = localStorage.cf;
  form.addEventListener ('submit', searchweb, false);
};

const searchweb = ( event ) => {
  console.log('scattata la search searchRicettaWeb' +  event.target.name.value );
  event.preventDefault();
  console.log("chiamo la searchRicettaWeb......" );
  let objRicetta = {}
  objRicetta.nricetta = event.target.name.value;
  objRicetta.cf = event.target.cf.value;
  objRicetta.idAccettazione = localStorage.idAccettazione;
  objRicetta.idPaziente = localStorage.idPaziente;

  model.searchRicettaWeb( objRicetta);

};

const esamiricetta = ( idRicetta ) => {
  console.log("chiamo la iniit module esame per elenco esami per ricetta")
  event.preventDefault();
  esami.initModule( document.querySelector('.elencoric-sub') );
};



const ricettaselezionata = () => {

  const event = new CustomEvent('selezioneRicetta', {bubbles: true, cancelable: true})
  let objRicetta ={}
  objRicetta.idRicetta =localStorage.idRicetta;
  event.data=  objRicetta
  document.dispatchEvent( event )
  };
const conferma = () => {
  prompt("Hai aggiunto tutti gli esmai alla ricetta?")
};

const nuovo = () => {
  document.querySelector( '.elencoric-sub' ).innerHTML = ricettaHTML;
  const form = document.forms[ 'ricetta' ];
  //form.idPaziente.value = localStorage.idPaziente
  //form.idAccettazione.value = localStorage.idAccettazione
  const now = new Date()


  const dFruizioneStr = now.getFullYear().toString() +"-" + (now.getMonth()+1).toString().padStart(2, '0') + "-" + (now.getDate().toString().padStart(2,'0'))
  form.dataFruizione.value = dFruizioneStr

  const dStr = now.getFullYear().toString() +"-" + (now.getMonth()+1).toString().padStart(2, '0') + "-" + (now.getDate().toString().padStart(2,'0'))
  form.dataRicetta.value = dStr
  form.addEventListener( 'submit', ( event ) => {
    console.log("scatta la submit per inserire una nuova ricetta non dematerializzata")
      let objRicetta = {}
      objRicetta = dm.formToJSON(form)
      'aggiungo elementi non presenti nella form ma necessari alla insert'

      objRicetta.idAccettazione = localStorage.idAccettazione
      objRicetta.idPaziente = localStorage.idPaziente

      console.log(objRicetta);
      event.preventDefault();

      model.createRicetta(objRicetta);
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


const list = ( rows ) => {
  console.log("funzione list")

  console.log(rows)
  //console.log("idRicetta prima riga: "  + rows[0].idRicetta)
  const html = `
    <p>
    <!--button class="btn-link btn-sm" id="elencoricette" >Ricette</button>
    <button class="btn-link btn-sm" id="confermaaccettazione" >Concludi accettazione</button-->
    <br>
    <button id="dem" class="btn-xs btn-link"  >Aggiungi una Ricetta dematerializata </button>
    <button id="nodem" class="btn-xs btn-link" >Aggiungi una Ricetta non dematerializzata </button>
    <br>
    <h6 align="center"> Elenco ricette della accettazione </h6>
    <fieldset>
    <table id="ricetteList"  class="table table-sm" style="font-size:80%;">
    <thead>
      <tr >
        <th scope="col">#</th>
        <th scope="col">#</th>
        <th scope="col">N. Ricetta</th>
        <th scope="col">Data di compilazione</th>
        <th scope="col">Data di fruizione</th>
        <th scope="col">TRICETTA</th>
        <th scope="col">TASSITITO</th>
        <th scope="col">TNETTO</th>
        <th scope="col">Esenzione</th>
        <th scope="col">SSN (S/N)</th>
        <th scope="col">Esente (S/N)</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
        ${rows.map(row => `
          <tr id=${row.IDRICETTA}>
            <td><p><sel id="sel">Selezione</sel></p></td>
            <td><p><sel id="rpl">Riepilogo contabile</sel></p></td>
            <td ><p>${row.NRICETTA}</p></td>
            <td ><p>${row.DATACOMPILAZIONE}</p></td>
            <td ><p>${row.DATAFRUIZIONE}</p></td>
            <td style="forecolor:grey;"><p><b>${row.TRICETTA}</b></p></td>
            <td style="forecolor:grey;"><p><b>${row.TASSISTITO}</b></p></td>
            <td style="forecolor:grey;"><p><b>${row.TNETTO}</b></p></td>
            <td ><p>${row.CODESENZIONE}</p></td>
            <td ><p>${row.SSN}</p></td>
            <td ><p>${row.ESENTE}</p></td>
            <td><p><sel id="del">Elimina ricetta</sel></p></td>
            <td><p><sel id="upd">Modifica</sel></p></td>
          </tr>`
        ).join('')}
      </tbody>
    </table>
    </fieldset>
    </p>
    <div class="prestazioni-sub"></div>
  `;

  //document.querySelector( '.elencoacc-sub' ).innerHTML = html;

  document.querySelector( '.elencoric-sub' ).innerHTML = html;
  const btn_dem  = document.getElementById( "dem" );
  btn_dem.addEventListener ('click', dem, false);
  const btn_nodem  = document.getElementById( "nodem" );
  btn_nodem.addEventListener ('click', nuovo, false);
  //const btn_ricette  = document.getElementById( "elencoricette" );
  //btn_ricette.addEventListener ('click', ricetteAccettazione, false);
  //const btn_conferma  = document.getElementById( "confermaaccettazione" );
  //btn_conferma.addEventListener ('click', confermaAccettazione, false);

  const table  = document.getElementById( "ricetteList" );

  //const tableRows = table.querySelectorAll(".row");
  const tableRows =table.getElementsByTagName( "tr" );
  for( let row of tableRows ) {
    console.log('stampo intera riga')

    console.log(row.id)
    row.addEventListener('click', ( event ) => {
      if (event.target.tagName == 'SEL') {
        switch( event.target.id ) {
          case "sel" : {
            localStorage.idRicetta = row.id;
            const rowCols = row.getElementsByTagName( "td" );
            localStorage.nRicetta = rowCols[2].innerText
            const event = new CustomEvent('selezioneRicetta', {bubbles: true, cancelable: true})
            let objRicetta ={}
            objRicetta.idRicetta =row.id
            objRicetta.nRicetta =localStorage.nRicetta

            localStorage.esenzioneRicetta = (rowCols[8].innerText.length > 0) ? "S" : "N";
            localStorage.ssn = rowCols[10].innerText == "S" ? "SSN" : "Privato"
            localStorage.esente = rowCols[11].innerText == "S" ? "Esente" : "Non esente"
            //alert(rowCols[8].innerText + "  "+localStorage.esenzioneRicetta);
            event.data=  objRicetta
            document.dispatchEvent( event )
            //prestazioni.initModule( document.querySelector('.prestazioni-sub') );
            break;
          }
          case "rpl" : {
            localStorage.idRicetta = row.id;
            localStorage.nRicetta = row.getAttribute("nRicetta")
            console.log("chiamo la prestazioniRicette initmodule per idRIcetta= " +localStorage.idRicetta)
            const rowCols = row.getElementsByTagName( "td" );
            let objRicetta ={}
            objRicetta.idRicetta =row.id
            objRicetta.codEsenzione = rowCols[8].innerText
            console.log("cod esenzione: " + objRicetta.codEsenzione)
            model.riepilogoContabileRicetta(objRicetta );
            break;
          }
          case "esa" : {
            localStorage.idRicetta = row.id;
            localStorage.nRicetta = row.getAttribute("nRicetta")
            console.log("chiamo la esami initmodule")
            esami.initModule( document.querySelector('.prestazioni-sub') );
            break;
          }
          case "del" : {
            console.log('eliminare la ricetta '+ row.id)
            localStorage.idRicetta = row.id;
            let objRicetta = {}
            objRicetta.idRicetta = row.id;
            model.deleteRicetta(objRicetta)
            break;
          }
        }
      }
    });
  }
  window.scrollTo(0,document.body.scrollHeight);
};

const confermaAccettazione = (  ) => {
  console.log("passo dalla confermaaccettazione")
  event.preventDefault();
  let objAccettazione ={}
  //objAccettazione.totaleLordo = localStorage.totalePrivato
  objAccettazione.idAccettazione =localStorage.idAccettazione
  //mdlAccettazioni.riepilogoContabileAccettazione(objAccettazione)

  mdlAccettazioni.totaleRicette(objAccettazione)
  mdlAccettazioni.totalePrivato(objAccettazione)

};


const serializeArray = ( fields ) => {
  const object = {};
  for( let field of fields ){
    object[ field.name ] = field.value;

  }

  return object;
};

const riepilogoContabile = (ricetta) => {
  alert("calcolo ripeilogo contabile ricetta")
}


// Export module initModule
const initModule = ( container ) => {
  console.log("initmodule ricettaweb")
  container.innerHTML = mainHTML;
  const form = document.forms.searchricette;
  console.log("initmodule ricettaweb aggingi listener search ricetta web")


  model.searchRicetteAccettazione( localStorage.idAccettazione );
};



export { initModule };
