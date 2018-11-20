/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
//import * as model    from './model.js';
import * as ricettaweb from './ricettaWeb.js';
import * as mdlAccettazioni    from './mdlAccettazioni.js';
import * as esamepaziente   from './esamiPaziente.js';
import * as esameprivato   from './esamiPrivato.js';
import * as esame   from './esamiRicetta.js';
import * as utility   from './utility.js';


/*
Body module
*/
let userID;
let objPaziente;
let objAccettazione ={}
// Module variables

const chiusuraAccettazioneHTML = `
    <div id="chiusuraacc" class="d-print-none">
    <br>
       <button class="btn-xs btn-link" id="riepilogocontabile">Riepilogo contabile</button>
       <button class="btn-xs btn-link" id="riepilogo">Riepilogo esami</button>

    <br>
    </div>
    <br>
    <br>
    <div id="dtlchiusura" class="riepilogo-sub"></div>
`;

const ripilogoContabileHTML =`
    <div  id="intestazione"></div>

    <div  id="totaleRicette">Costo delle ricette</div>
    <div  id="totaleAssistito">Dovuto dal paziente</div>
    <div  id="totaleLordo">Totale lordo</div>
    <div  id="totaleNetto">Totale netto</div>
`;
const mainHTMLNew = `
<div id="headeraccettazione" class="d-print-none">
  <div class="row">
    <div class="col" id="info_accettazione"></div>
  </div>
  <div class="row">
    <div  class="col" id="info_esami"></div>
  </div>
</div>
</br>
<div id="dtl" class="elencoacc-sub"></div>
`;

const mainHTML = `
</br>
<div class="row">
  <div class="col-lg-3">
  <input id="nuovaAccettazione" class="btn-xs btn-link" type="button" value="Nuova accettazione"></input>
  </div>
</div>
</br>
<div class="elencoacc-sub">  </div>
</br>
`;

const accettazioneHTML = `
  <fieldset>
    <form id="accettazione">
    <p>
    <label for="idAccettazione">Numero accettazione</label><br>
    <input type="text" name="idAccettazione" id="idAccettazione" disabled>
    <p>
    <p>
        <label for="dataAccettazione">Data accettazione</label><br>
        <input type="date" name="dataAccettazione" required>
      <p>
      <p>
        <input type='submit' value='Conferma'></input>
      </p>

    </form>
  </fieldset>
`;
/*
 Event handlers
*/


document.addEventListener( 'selezionePazienteAcc', ( event ) => {
  event.preventDefault;
  console.log('scattata la selezionePazienteAcc')
  const htmlPaziente = `
      <button class="btn btn-link btn-sm"  id="elencoaccettazioni" ><h6>Paziente selezionato: ${event.data.cognome}</h6></button>
`;
const pz  = document.getElementById( "cercapaziente" );
pz.innerHTML=""
const dtl  = document.getElementById( "dtlPazienti" );
dtl.innerHTML=""
//const info_ricette  = document.getElementById( "info_ricetta" );
//info_ricette.innerHTML = ''
const info_paziente  = document.getElementById( "info_paziente" );
info_paziente.innerHTML = htmlPaziente
const btn_accettazioni  = document.getElementById( "elencoaccettazioni" );
btn_accettazioni.addEventListener ('click', accettazioni, false);
objPaziente = event.data
//console.log(document)
initModule( document.querySelector('.read-sub') );
});


document.addEventListener( 'totaleRicetteAccettazione', ( event ) => {
  document.querySelector('.riepilogo-sub').innerHTML = ripilogoContabileHTML
  const intestazione  = document.getElementById( "intestazione" );
  intestazione.innerHTML = "Rieipilogo contabile accettazione";
  const totaleRicette  = document.getElementById( "totaleRicette" );
  totaleRicette.innerHTML = "totale Ricette: €" + event.data[0].TRICETTE;
  localStorage.totaleRicette = event.data[0].TRICETTE;
  const totaleAssistiito  = document.getElementById( "totaleAssistito" );
  totaleAssistiito.innerHTML = "Dovuto dal paziente: €" + event.data[0].TASSITITO;
  localStorage.totaleAssistito = event.data[0].TASSITITO;
  const totaleLordo  = document.getElementById( "totaleLordo" );
  //localStorage.totaleLordo= +localStorage.totaleRicette - +localStorage.totaleAssistito;
  //let num = +localStorage.totaleLordo;
  //totaleLordo.innerHTML = "totale lordo: €"+ num.toFixed(2);
  totaleLordo.innerHTML = "totale lordo: € 0"
  const totaleNetto  = document.getElementById( "totaleNetto" );
  totaleNetto.innerHTML = "totale netto: € 0"
});


document.addEventListener( 'selezioneAccettazione', ( event ) => {
//alert("selezione accettazione")
  const htmlAccettazione = `
      <button id="acccselezionata" class="btn btn-link btn-sm"><h6>Accettazione N.  ${localStorage.idAccettazione} del ${localStorage.dataAccettazione} </h6> </button>
      <br>
      <button class="btn-link btn-sm" id="elencoricette" >Ricette</button>
      <button class="btn-link btn-sm" id="confermaaccettazione" >Chiudi accettazione</button>

      <!--button class="btn-link btn-sm" id="stampacertificazioni" >Stampa certificazioni</button-->
`;

const info_accettazione  = document.getElementById( "info_accettazione" );
info_accettazione.innerHTML = htmlAccettazione
const btn_accselezionata  = document.getElementById( "acccselezionata");
btn_accselezionata.addEventListener ('click', accettazioneselezionata, false);
const dtl  = document.getElementById( "dtl" );
dtl.innerHTML= ''
const btn_ricette  = document.getElementById( "elencoricette" );
btn_ricette.addEventListener ('click', ricetteAccettazione, false);
const btn_conferma  = document.getElementById( "confermaaccettazione" );
btn_conferma.addEventListener ('click', confermaAccettazione, false);

/*const btn_stampacertificazioni  = document.getElementById( "stampacertificazioni" );
btn_stampacertificazioni.addEventListener ('click', stampaCertificazioni, false);
*/
ricetteAccettazione();
});


document.addEventListener( 'selezioneRicetta', ( event ) => {

  const htmlRicetta = `
  <!--h5>Ricetta N. ${event.data.nRicetta}<h5-->
  <button  class="btn-link btn-sm" id="elencoesamiricetta" >Esami della ricetta</button>
  <button  class="btn-link btn-sm" id="riepilogoricetta" >Conferma</button>
`;
const htmlAccettazione = `
    <button id="accselezionata" class="btn btn-link btn-sm"><h6>Accettazione N.  ${localStorage.idAccettazione} del ${localStorage.dataAccettazione}</h6> </button>
    -> <button id="ricettaselezionata"class="btn btn-link btn-sm"><h6> Ricetta N. ${localStorage.nRicetta} (${localStorage.ssn}) (${localStorage.esente}) </h6></button>
`;


const info_accettazione  = document.getElementById( "info_accettazione" );
info_accettazione.innerHTML = htmlAccettazione
document.querySelector('.elencoacc-sub').innerHTML = htmlRicetta
const btn_accselezionata  = document.getElementById( "accselezionata");
btn_accselezionata.addEventListener ('click', accettazioneselezionata, false);
const btn_ricettaselezionata  = document.getElementById( "ricettaselezionata" );
btn_ricettaselezionata.addEventListener ('click', ricettaselezionata, false);
esamiricetta(localStorage.idRicetta)
});


document.addEventListener( 'riepilogoContabileAccettazione', ( event ) => {
  console.log("scattata la riepilogoContabileAccettazione: " + event.data);
  if (event.data === 'OK' ) {
    console.log("chiamo la riepilogoContabileAccettazione......" );
    //mdlAccettazioni.searchAccettazioniPaziente( localStorage.idPaziente );
    document.querySelector('.elencoacc-sub').innerHTML = chiusuraAccettazioneHTML;
  }
  else {
    alert("errore riepilogoContabileAccettazione !")
  }
});

document.addEventListener( 'modificaaccettazione', ( event ) => {
  modifica();
});

document.addEventListener( 'createaccettazione', ( event ) => {
  console.log("ritorno della createaccettazione");
  console.log("chiamo la searchAccettazioniPazienti......" );
  mdlAccettazioni.searchAccettazioniPaziente( objPaziente.idanagrafica );
});

document.addEventListener( 'searchAccettazioniPaziente', ( event ) => {
  console.log("passo dalla eventlistener searchAccettazionepaziente " + event.data)
  if (event.data != undefined) {
    console.log("searchAccettazioniPaziente creo lista da elenco" + event.data)

      list( event.data );
  }
  else {
    console.log("searchAccettazioniPaziente event.data undefined!!!!!!")
    message.show("Nessuna accettazione presente per il paziente selezionato.")
    list([])
  }

});



const esamiricetta = ( idRicetta ) => {
  //alert("chiamo la esami ricetta")
  console.log("chiamo la iniit module esame per elenco esami per ricetta")
  event.preventDefault();
  esame.initModule( document.querySelector('.elencoacc-sub') );
};



const esamiprivato = (  ) => {
  event.preventDefault();
  //const info_ricetta  = document.getElementById( "info_ricetta" );
  //info_ricetta.innerHTML = '';
  esameprivato.initModule( document.querySelector('.elencoacc-sub') );
};

const esamipaziente = (  ) => {
  event.preventDefault();
  //const info_ricetta  = document.getElementById( "info_ricetta" );
  //info_ricetta.innerHTML = '';
  esamepaziente.initModule( document.querySelector('.riepilogo-sub') );
};

const totaleAccettazione = (  ) => {
  let objAccettazione ={}
  objAccettazione.idAccettazione =localStorage.idAccettazione
  //mdlAccettazioni.riepilogoContabileAccettazione(objAccettazione)
  mdlAccettazioni.totaleRicette(objAccettazione)
};





const stampaCertificazioni =( ) => {
  document.querySelector('.elencoacc-sub').innerHTML = "Gestione stampe certificazioni"
};
const confermaAccettazione = (  ) => {
  event.preventDefault();
  const a= confirm("Hai aggiunto tutte le ricette alla accettazione ?")
  if (a==true) {
    const dtl  = document.getElementById( "dtl" );
    dtl.innerHTML= chiusuraAccettazioneHTML;
    const btn_riepilogocontabile  = document.getElementById( "riepilogocontabile");
    btn_riepilogocontabile.addEventListener ('click', totaleAccettazione, false);
    const btn_riepilogo  = document.getElementById( "riepilogo");
    btn_riepilogo.addEventListener ('click', esamipaziente, false);
  }
};



const ricetteAccettazione = (  ) => {
  
  console.log ("passo dalla ricetteAccettazione")
  const info_esami  = document.getElementById( "info_esami" );
  info_esami.innerHTML = '';
  //const info_ricetta  = document.getElementById( "info_ricetta" );
  //info_ricetta.innerHTML = '';
  const event = new CustomEvent('elencoRicetteAccettazione', {bubbles: true, cancelable: true})
  event.data = objAccettazione
  document.dispatchEvent( event )
  //ricettaweb.initModule( document.querySelector('.elencoacc-sub') );

};

const accettazioneselezionata = () => {
  const event = new CustomEvent('selezioneAccettazione', {bubbles: true, cancelable: true})
  let objAccettazione ={}
  objAccettazione.idAccettazione =localStorage.idAccettazione;
  event.data=  objAccettazione
  document.dispatchEvent( event )
  };

  const pazienteselezionato = () => {
  accettazioni(localStorage.idPaziente);
  };

const modifica = () => {
  console.log("scattata form modifica accettazione")
  document.querySelector( '.elencoacc-sub' ).innerHTML = accettazioneHTML;

  const form = document.forms[ 'accettazione' ];

  const now = new Date()

  const dStr = now.getFullYear().toString() +"-" + (now.getMonth()+1).toString().padStart(2, '0') + "-" + (now.getDate().toString().padStart(2,'0'))
  console.log(dStr)

  form.dataAccettazione.value = dStr
  //form.dataAccettazione.value = '2018-09-05'

  form.addEventListener( 'submit', ( event ) => {
      console.log("scattata submit per modifica accettazione")
      console.log(form.dataAccettazione.value);
      event.preventDefault();
      let objAccettazione ={};
      objAccettazione.dataAccettazione = form.dataAccettazione.value;
      objAccettazione.idPaziente = localStorage.idPaziente;
      objAccettazione.idErogatore = 1;
      console.log(form.dataAccettazione.value);
      mdlAccettazioni.modificaAccettazione(objAccettazione);
  });
};

const nuovo = () => {
    console.log("scattata form nuova accettazione")
    document.querySelector( '.elencoacc-sub' ).innerHTML = accettazioneHTML;
    const form = document.forms[ 'accettazione' ];

    const now = new Date()

    const dStr = now.getFullYear().toString() +"-" + (now.getMonth()+1).toString().padStart(2, '0') + "-" + (now.getDate().toString().padStart(2,'0'))
    alert(dStr);
    console.log(dStr)

    form.dataAccettazione.value = dStr
    //form.dataAccettazione.value = '2018-09-05'



    form.addEventListener( 'submit', ( event ) => {
        console.log("scattata submit per nuova accettazione")
        console.log(form.dataAccettazione.value);
        event.preventDefault();
        let objAccettazione ={};
        objAccettazione.dataAccettazione = form.dataAccettazione.value;
        objAccettazione.idanagrafica = objPaziente.idanagrafica;
        objAccettazione.idErogatore = 1;
        console.log(form.dataAccettazione.value);
        mdlAccettazioni.createAccettazione(objAccettazione);

    });
  };

const show = ( data ) => {

  document.querySelector( '.read1-sub' ).innerHTML = userHTML;
  const form = document.forms[ 'user' ];

  dm.JSONToForm( form, data );

  form.addEventListener( 'submit', ( event ) => {

    event.preventDefault();

    console.log ( "submit " + data );

    //user.update(  data._id, dm.formToJSON( form ) );

  });

};


const list = ( rows ) => {
  console.log("funzione list accettazione")



  const htmlCard = `
  <style>
  #grid { 
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1vw;
    }
  #grid > div {
    font-size: 3vw;
    padding: .5em;
    background: lightgray;
    text-align: center;
  }
  </style>
  <input id="nuovaAccettazione" class="btn-xs btn-link" type="button" value="Nuova accettazione"></input>
  <h4 align="center"> Elenco accettazioni</h4>
  <p>
  <div class="container-fluid">
      <div id="grid">
          ${rows.map(row => `
            <div id="${row.idaccettazione}" class="cardaccettazioni" >N. ${row.idaccettazione} del ${utility.dataItaliana(row.dataaccettazione)}</div>`
            ).join('')}
      </div>
  </div>
  <p>
  <div class="ricette-sub"></div>
`;
 
  const html = `
    <input id="nuovaAccettazione" class="btn-xs btn-link" type="button" value="Nuova accettazione"></input>
    <h4 align="center"> Elenco accettazioni</h4>
    <table id="accettazioneList" class="table table-sm" style="font-size:80%;">
    <thead>
    <tr >
      <th scope="col">#</th>
      <th scope="col">N. accettazione</th>
      <th scope="col">Data di accettazione</th>
      <th scope="col">Totale Lordo</th>
      <th scope="col">Totale Netto</th>
      <th scope="col">#</th>
      <th scope="col">#</th>
    </tr>
  </thead>
  <tbody>
      ${rows.map(row => `
        <tr id=${row.idaccettazione}  >
          <td><p><sel id="sel">Seleziona</sel></p></td>
          <td ><p>${row.idaccettazione}</p></td>
          <td ><p>${row.dataaccettazione}</p></td>
          <td style="forecolor:grey;"><p><b>${row.totalelordo}</b></p></td>
          <td style="forecolor:grey;"><p><b>${row.totalenetto}</b></p></td>
          <td><p><sel id="del">Elimina accettazione</sel></p></td>
          <td><p><sel id="upd">Modifica</sel></p></td>
        </tr>`
      ).join('')}
    </tbody>
    </table>
    </p>
    <div class="ricette-sub"></div>
  `;

  document.querySelector( '.elencoacc-sub' ).innerHTML = htmlCard
  console.log("aggiungo event listener nuova accettazione")
  document.getElementById('nuovaAccettazione').addEventListener('click', nuovo );

  const table  = document.getElementById( "accettazioneList" );
  //const tableRows = table.querySelectorAll(".row");
  const tableRows =document.getElementsByClassName( "cardaccettazioni" );
  for( let row of tableRows ) {
    console.log('stampo intera riga')
    //alert ("selezionata accettazione n." + row.id)
    row.addEventListener('click', ( event ) => {
            localStorage.nRicetta =
            localStorage.idAccettazione = row.id;
            localStorage.dataAccettazione= ""//rowCols[2].innerText;
            localStorage.totaleLordo= ""//rowCols[3].innerText;
            localStorage.totaleNetto= ""//rowCols[4].innerText;
            const event1 = new CustomEvent('selezioneAccettazione', {bubbles: true, cancelable: true})
            objAccettazione.idaccettazione =row.id
            objAccettazione.objPaziente = objPaziente;
            event1.data=  objAccettazione
            document.dispatchEvent( event1 )
      
    });
  }
  window.scrollTo(0,document.body.scrollHeight);
};




const search = ( event ) => {
  console.log('search accettazioni paziente' +  event.target.name.value );
  event.preventDefault();
  let objPaziente = event.data
  console.log("chiamo la searchAccettazioniPazienti......per idanagrafica=" + objPaziente.idanagrafica);
  mdlAccettazioni.searchAccettazioniPaziente( objPaziente.idanagrafica );

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
  console.log("initmodule accettazione " +  objPaziente.idanagrafica)
  console.log(container)

  container.innerHTML = mainHTMLNew;
  //const form = document.forms.search;
  //form.addEventListener ('submit', search, false);
  //document.getElementById('info').innerHTML = ''

  mdlAccettazioni.searchAccettazioniPaziente( objPaziente.idanagrafica );
};



export { initModule };
