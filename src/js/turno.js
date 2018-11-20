/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
import * as mdlTurno    from './mdlTurno.js';

/*
Body module
*/

// Module variables
let objPaziente={}
const mainHTML = `
<p>

  <br>
  <button class="btn-link btn-sm" id="assegnaturno" >Assegna turno</button>
<br>
<div id="subesa" class="elencoturni-sub"></div>'
`;

document.addEventListener( 'selezionePazienteTurno', ( event ) => {
  event.preventDefault;
  console.log('scattata la selezionePazienteTurno')
  const htmlPaziente = `
      <button class="btn btn-link btn-sm"  id="elencoturni" ><h6>Paziente selezionato: ${event.data.cognome}</h6></button>
`;
const pz  = document.getElementById( "cercapaziente" );
pz.innerHTML=""
const dtl  = document.getElementById( "dtlPazienti" );
dtl.innerHTML=""

const info_paziente  = document.getElementById( "info_paziente" );
info_paziente.innerHTML = htmlPaziente
const btn_turno  = document.getElementById( "elencoturni" );
btn_turno.addEventListener ('click', turni, false);
objPaziente = event.data
initModule( document.querySelector('.read-sub') );

});
const assegnaTurno =( ) => {
  const turnoHTML = `


    <fieldset>
      <form id="turnoPaziente">
      <p>
      <label for="turno">Seleziona turno</label><br>
      <select id="turno" name="turno">
        <option value="pm">Pari mattina</option>
        <option value="pp">Pari pomeriggio</option>
        <option value="dm">Dispari mattina</option>
        <option value="dp">Dispari pomeriggio</option>
      </select>
      <p>
      <p>
      <label for="stanza">Stanza</label><br>
      <input type="text" class="form-control"  name="stanza" >
      <p>
      <p>
      <label for="letto">Letto</label><br>
      <input type="text" class="form-control" name="letto" >
      <p>      
          <input type='submit' value='Conferma'></input>
        </p>
      </form>
    </fieldset>
  `;

  document.querySelector('.elencoturni-sub').innerHTML = turnoHTML;

  const form = document.forms[ 'turnoPaziente' ];
  form.addEventListener( 'submit', ( event ) => {
      event.preventDefault();
      console.log("scattata submit per turnoPaziente")
      console.log(objPaziente)
      console.log("scattata submit per turnoPaziente")

      let objTurno ={};
      localStorage.turno = form.turno.value;
      objTurno.turno = form.turno.value;
      objTurno.idPaziente = objPaziente.idanagrafica;
      objTurno.stanza = form.stanza.value;
      objTurno.letto = form.letto.value;

      mdlTurno.assegnaTurno(objTurno);
  });

};

const visualizzaTurno =( ) => {
  event.preventDefault();
  mdlTurno.elencoPazientiPerTurno("pm")
};

document.addEventListener( 'eliminaTurno', ( event ) => {
  event.preventDefault();
  console.log("passo dalla eventlistener assegnaTurno... " )
  mdlTurno.elencoPazientiPerTurno(localStorage.turno)
});

document.addEventListener( 'assegnaTurno', ( event ) => {
  event.preventDefault();
  console.log("passo dalla eventlistener assegnaTurno... " )
  mdlTurno.elencoPazientiPerTurno(localStorage.turno)
});
document.addEventListener( 'elencoPazientiPerTurno', ( event ) => {
  console.log("passo dalla eventlistener elencoPazientiPerTurno... " )
  if (event.data != undefined) {
    //console.log("searchEsamiDescrizione creo lista da elenco" + event.data)

      list( event.data );
  }
  else {
    console.log("elencoPazientiPerTurno event.data undefined!!!!!!")
    message.show("Nessun turno   presente.")
    list([])
  }
});


const list = ( rows ) => {
  console.log("funzione elenco turno: " + rows)
  const listaTurnoHtml = `
  <p>

  <div id="searchturno" >
  <form id="frmturno">
    <div class="form-group">
      <label for="elencoturno">Seleziona turno da visualizzare</label><br>
      <select id="elencoturno" name="turno">
      <option value="pm">Pari mattina</option>
      <option value="pp">Pari pomeriggio</option>
      <option value="dm">Dispari mattina</option>
      <option value="dp">Dispari pomeriggio</option>
    </select>
      </div>
      <button type="submit" class="btn-sm btn-link">Visualizza pazienti per il turno</button>
  </div>
  </form>
  </div>
  <h6 align="center"> Elenco pazienti per il turno ${localStorage.turno}</h6>
  <table id="turnoList"  class="table table-sm" >
    <thead>
      <tr>
      <th scope="col">turno</th>
      <th scope="col">Cognome</th>
      <th scope="col">Nome</th>
      <th scope="col">Stanza</th>
      <th scope="col">Letto</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    ${rows.map(row => `
      <tr id=${row.idturnopaziente}  >
        <td ><p>${row.turno}</p></td>
        <td ><p>${row.cognome}</p></td>
        <td ><p>${row.nome}</p></td>
        <td ><p>${row.stanza}</p></td>
        <td ><p>${row.letto}</p></td>
        <td><p><sel id="del">Elimina</sel></p></td>
        <td><p><sel id="upd">Modifica</sel></p></td>
      </tr>`
    ).join('')}
    </tbody>
  </table>
`;
  document.querySelector('.elencoturni-sub').innerHTML = listaTurnoHtml;
const form = document.forms[ 'frmturno' ];
  form.addEventListener( 'submit', ( event ) => {
      event.preventDefault();
      localStorage.turno=form.elencoturno.value
      mdlTurno.elencoPazientiPerTurno(form.elencoturno.value)
  });
  const table  = document.getElementById( "turnoList" );
  //const tableRows = table.querySelectorAll(".row");
  const tableRows =table.getElementsByTagName( "tr" );
  for( let row of tableRows ) {
    row.addEventListener('click', ( event ) => {
      if (event.target.tagName == 'SEL') {
        switch( event.target.id ) {
          case "del" : {
            console.log("scattato delete della riga")


            let objTurno ={};
            objTurno.idturnopaziente = row.id;
            console.log("invio al erver elimina idturnopaziente = " + objTurno.idturnopaziente)
            mdlTurno.eliminaTurno(objTurno)
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

// Export module initModule
const initModule = ( container ) => {
  //console.log("initmodule esamiRicetta idRicetta " +localStorage.idRicetta)
  container.innerHTML = mainHTML;
  const btn_visualizzaTurno = document.getElementById("assegnaturno");
  btn_visualizzaTurno.addEventListener ('click', assegnaTurno, false);
  localStorage.turno="pm"
  mdlTurno.elencoPazientiPerTurno("pm")
};




export { initModule };
