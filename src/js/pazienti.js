/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
import * as model    from './model.js';
import * as mdlPazienti    from './mdlPazienti.js';
import * as accettazione from './accettazione.js';
import * as turno from './turno.js';
import * as certificato from './certificazioni.js';
import * as comuni from './comuni.js';
import * as utility from './utility.js';

/*
Body module
*/
let userID;
let objPaziente = {};
// Module variables

const userHTMLTemplate = `
<div class="contanier-fluid" style="margin-left:20px">
<fieldset>
  <legend> Paziente </legend>
  <form id="user">
    <div class="form-group">
    <label for="idanagrafica">Codice paziente</label><br>
    <input id="idPaziente" class="text-info" type="text" name="idanagrafica" disabled>
    <br>
      <label for="nome">Nome</label><br>
      <input id="nome"class="text-info"type="text" name="nome" required>
      <br>
      <label for="cognome">Cognome</label><br>
      <input id="cognome"  class="text-info" type="text" name="cognome" required>
      <br>
    <label for='comunenascita'>Comune di nascita:</label><br>
    <input list="comuni"  class="text-info" name='comunenascita' id='comuneNascita' autocomplete=off>
    <datalist id="comuni"></datalist>
    </br>
    </br>
      <label for='dataNascita'>Data di nascita (AAAA-MM-GG):</label><br>
      <input id="dataNascita"   type="date" name="datanascita" required>
      <br>
      <label for='sesso'>Sesso</label><br>
      <select id=sesso" name='sesso'>
        <option value="M">M</option>
        <option value="F">F</option>
      </select>
      <br>
      <br>
      <label for="cf">Codice Fiscale <span><button class="btn" id="calcolaCF1" >Calcola codice fiscale</button><span></label><br>
      <input id="cf"  class="text-info" type="text" name="cf" maxlength="16" required>
      <br>
    <label for='comuneResidenza'>Comune di residenza:</label><br>
    <input list="comuniresidenza"  class="text-info" name='comuneresidenza' id='comuneResidenza' autocomplete=off>
    <datalist id="comuniresidenza"></datalist>
    <br>
    <label for="indirizzo">Indirizzo</label><br>
    <input id="indirizzoResidenza" class="text-info"  type="text" name="indirizzoresidenza" maxlength="100" required><br>
    <label for="telefono">Contatti telefonici</label><br>
    <input id="telefono"  class="text-info"  type="text" name="telefono" maxlength="50" required><br>
    <label for="email">Contatti email</label><br>
    <input id="email"  class="text-info"  type="text" name="email" maxlength="50" required><br>
    <label for="distrettoasl">Distretto sanitario ASL di appartenenza</label><br>
    <input id="distrettoasl"  class="text-info" type="text" name="distrettoasl" maxlength="50" required><br>
    <label for="documento">N. Documento (CI, Pat....)</label><br>
    <input id="documento"  class="text-info"  type="text" name="ndocumento" maxlength="50" required><br>          
    <input type='submit'></input>
    </p>
  </form>
</fieldset>
</div>
`;


const mainHTML = `
<div class="container-fluid">
<div id="cercapaziente" >
<form id="search">
  <div class="form-group">
    <label for="name">Paziente da cercare</label>
    <input type="text" class="form-control" id="name"  placeholder="digita per cercare il paziente (min 3 caratteri).." minlength>
    </div>
    <button type="submit" class="btn-sm btn-link">Cerca paziente</button>
    <button id="nuovoPaziente" type="button" class="btn-sm btn-link" >Registra un nuovo paziente</button>
</div>
</form>
</div>
<div id="headerpaziente" class="d-print-none">
  <div class="row" >
    <div class="col" id="info_paziente"></div>
  </div>
</div>
<div id="dtlPazienti" class="read-sub">  </div>
</div>
`;

const headePazientePulitoHTML=`
<div id="headerpaziente" >
<div class="row">
<div class="col-lg-1" id="info_paziente"></div>
</div>
<div class="row">
<div class="col-lg-3" id="info_accettazione"></div>
</div>
<!--div  class="panel panel-primary" id="info_esami"></div-->
<div  class="panel panel-primary" id="info_esami"></div>
<div class="panel panel-info" id="info_ricetta"></div>
</div>
 <div></div>
 <div></div>
 <div></div>
</div>
`;
/*
 Event handlers
*/
document.addEventListener( 'selezioneEsami', ( event ) => {
  const htmlEsami = `
  `;
const dtl  = document.getElementById( "dtlPazienti" );
dtl.innerHTML=""
const info_esami  = document.getElementById( "info_esami" );
info_esami.innerHTML = htmlEsami
});

document.addEventListener( 'modificaPaziente', ( event ) => {
  const elencocomuni = comuni.fncomuni();
  const datanascita = event.data.datanascita;
  document.getElementById('headerpaziente' ).innerHTML = headePazientePulitoHTML
  document.querySelector( '.read-sub' ).innerHTML = userHTMLTemplate;
  const form = document.forms['user'];
  dm.JSONToForm( form , event.data)
  form.dataNascita.value = event.data.datanascita.substring(0,10)
  const btn_cf = document.getElementById('calcolaCF1')
  btn_cf.addEventListener('click',fncalcolaCF,false);
  const aa = `
      ${elencocomuni.map(row => `
      <option value="${row.Descrizione}" selected></option>`
      ).join('')}`
  document.getElementById('comuni' ).innerHTML = aa;
  document.getElementById('comuniresidenza' ).innerHTML = aa;
  let verifica = true
  form.addEventListener( 'submit', ( event ) => {
    event.preventDefault();
    console.log("scattata submit per update paziente");
    
    if (verificaComuneInlista(form.comunenascita.value)){
        verifica=true
    }
    else   {
      message.show("Attenione selezionare una voce dall'elenco per il comune di nascita")
      verifica  = false;
    }
    if (verificaComuneInlista(form.comuneresidenza.value)){
      verifica=true
    }
    else   {
      message.show("Attenione selezionare una voce dall'elenco per il comune di residenza")
      verifica  = false;
    }
    if (verifica==true) {
      mdlPazienti.updatePaziente(  dm.formToJSON( form )  );
    }

  });
});

document.addEventListener( 'selezionePazienteAccNO', ( event ) => {
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
accettazioni(event.data.idPaziente);
});

document.addEventListener( 'selezionePazienteTurno', ( event ) => {
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
turni();
});



document.addEventListener( 'selezionePazienteCertificatiOld', ( event ) => {
  console.log('scattata la selezionePazienteCertificati')
  const htmlPaziente = `
      <button class="btn btn-link btn-sm"  id="elencocertificati" ><h6>Paziente selezionato: ${event.data.cognome}</h6></button>
`;
const pz  = document.getElementById( "cercapaziente" );
pz.innerHTML=""
const dtl  = document.getElementById( "dtlPazienti" );
dtl.innerHTML=""

const info_paziente  = document.getElementById( "info_paziente" );
info_paziente.innerHTML = htmlPaziente
const btn_certificati  = document.getElementById( "elencocertificati" );
btn_certificati.addEventListener ('click', certificati, false);
certificati();
});

const verificaComuneInlista = (comune) => {
  console.log("sono nella verificaComuneInlista")
  const elencocomuni = comuni.fncomuni()
  let trovato = false;
  for (let k=0 ; k<elencocomuni.length; k++){
    //console.log("verifico: " + comune + " - "+ elencocomuni[k].Descrizione)
    if (elencocomuni[k].Descrizione == comune){
      trovato = true;
    }
  }
  console.log("fine verifica elenco: "  + trovato)
  return trovato;

}
/*document.addEventListener( 'selezioneAccettazione', ( event ) => {

  const htmlAcc = `
      <p> ${event.data}
      </p>
`;
});*/

document.addEventListener( 'searchCognomeAcc', ( event ) => {
  console.log("Pazienti - event searchCognomeAcc: passo dalla eventlistener searchCognome....pazienti " + event.data)
  if (event.data != undefined) {
    console.log("Pazienti - event searchCognomeAcc:  creo lista da elenco" + event.data)

      listCard( event.data );
  }
  else {
    console.log("Pazienti - event searchCognomeAcc:  event.data undefined!!!!!!")

    message.show("Pazienti - event searchCognomeAcc: Nessun paziente presente.")
    list([])
  }
});

document.addEventListener( 'searchCognome', ( event ) => {
  
  console.log("Pazienti - event searchCognome: passo dalla eventlistener searchCognome....numero pazienti individuati " + event.data.length)
  //console.log(event.data)
  if (event.data != undefined) {
    console.log("searcPazienti - event searchCognome: creo lista da elenco: n.elementi: " + event.data.length)
    listCard( event.data );
  }
  else {
    console.log("Pazienti - event searchCognome:  event.data undefined!!!!!!")
    message.show("Pazienti - event searchCognome: Nessun paziente presente.")
    list([])
  }
});

document.addEventListener( 'createpaziente', ( event ) => {
  console.log("Pazienti - event createpaziente: passo dal ritorno della createpaziente e presento lista pazienti")
  //alert("Paziente aggiunto con successo")
  mdlPazienti.searchPazientiCognome('');
});

document.addEventListener( 'updatepaziente', ( event ) => {
  console.log("Pazienti - event updatepaziente: passo dal ritorno della updatepaziente e presento lista pazienti")
  alert("Paziente modificato correttamente")
  mdlPazienti.searchPazientiCognome('');
});

const nuovo = () => {
  event.preventDefault();
  console.log("Pazienti - function nuovo: chiamo la nuovo paziente e verifico utente connesso: " + localStorage.username);
  const elencocomuni = comuni.fncomuni()
  const userHTML1 = `
  <fieldset>
    <legend> Nuovo paziente </legend>
    <form id="user">
      <div class="form-group">
        <label for="nome">Nome</label><br>
        <input id="nome" class="text-info" type="text" name="nome" required>
        <label for="cognome">Cognome</label><br>
        <input id="cognome"  class="text-info" type="text" name="cognome" required>
        <input type="date"   name="dataNascita" required>
        <br>
        <br>
        <label for="cf">Codice Fiscale <span><span></label><br>
        <input id="cf" class="text-info"  type="text" name="cf" maxlength="16" required>
        <button class="form-control" id="calcolaCF1" >Calcola codice fiscale</button>
        <p>Sesso</p>
        <label for='male'>M</label>
        <input type='radio' name='sesso' value='M' id='male' checked/>
        <label for='female'>F</label>
        <input type='radio' name='sesso' value='F' id='female'/>
        </br>
      <label for='citta'>Comune di nascita:</label>
      <input list="comuni"  name='citta' id='citta' autocomplete=off>
      <datalist id="comuni">
        ${elencocomuni.map(row => `
        <option value=${row.Descrizione} selected></option>`
        ).join('')}
      </datalist>
      </br>
      </br>
      <label for='comuniresidenza'>Comune di residenza:</label>
      <input list="comuniresidenza"  name='residenza' id='residenza' autocomplete=off>
      <datalist id="comuniresidenza">
        ${elencocomuni.map(row => `
        <option value=${row.Descrizione} selected></option>`
        ).join('')}
      </datalist>
     -- </br>
      <label for="indirizzo">Indirizzo</label>
      <input id="indirizzo"  class="form-control"  type="text" name="indirizzo" maxlength="100" required>
      <label for="telefono">Contatti telefonici</label><br>
      <input id="telefono"  class="form-control"  type="text" name="telefono" maxlength="50" required>
      <label for="email">Contatti email</label><br>
      <input id="email"  class="form-control"  type="text" name="email" maxlength="50" required>
        <input type='submit'></input>
      </p>
    </form>
  </fieldset>
`;
  document.getElementById('headerpaziente' ).innerHTML = headePazientePulitoHTML
  document.querySelector( '.read-sub' ).innerHTML = userHTMLTemplate;
  const aa = `
        ${elencocomuni.map(row => `
        <option value="${row.Descrizione}" selected></option>`
        ).join('')}`
  document.getElementById('comuni' ).innerHTML = aa;
  document.getElementById('comuniresidenza' ).innerHTML = aa;
  const form = document.forms[ 'user' ];

  form.addEventListener( 'submit', ( event ) => {
      event.preventDefault();
      mdlPazienti.createPaziente(  dm.formToJSON( form )  );
  });
  const btn_cf = document.getElementById('calcolaCF1')
  btn_cf.addEventListener('click',fncalcolaCF,false);

};

const fncalcolaCF = () => {
  event.preventDefault();

  const form = document.forms[ 'user' ];
  alert(form.dataNascita.value);
  form.dataNascita.value = "1974-07-28"
  alert(form.dataNascita.value);

};

const show = ( data ) => {
  document.querySelector( '.read-sub' ).innerHTML = userHTML;
  const form = document.forms[ 'user' ];
  dm.JSONToForm( form, data );

  form.addEventListener( 'submit', ( event ) => {

    event.preventDefault();

    console.log ( "submit " + data );

    //user.update(  data._id, dm.formToJSON( form ) );

  });

};




  const listCard = ( rows ) => {
  
    console.log("Pazienti - function list: costruisco lista pazienti ")
    console.log( rows )
    console.log( rows[0])
    //console.log( rows[0].cognome)
  
  
    const html = `
    <style>
      #grid { 
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1vw;
        }
      #grid > div {
        font-size: 2vw;
        padding: .5em;
        background: lightgray;
        text-align: center;
      }
     </style>
      <p>
      <div class="container-fluid">
          <div id="grid">
          ${rows.map(row => `
            <div id="${row.idanagrafica}" class="cardpazienti">${row.cognome} ${row.nome }</div>
            `
            ).join('')}
            </div>
        </div>
        `

      document.querySelector('.read-sub').innerHTML = html;
      console.log("selezione righe tabella")
      //const table = document.getElementById( "userList" );
      //alert(table)
      //console.log(table);
          
      const tableRows =document.getElementsByClassName( "cardpazienti" );
      console.log("seleziono le card per aggiungere event selezione")
      console.log(tableRows)
          //for (let mmm = 0, row; row = table.rows[mmm]; mmm++) {
          for (let row of tableRows) {
          row.addEventListener('click', ( event ) => {
          console.log(event);
          alert("selezionato paziente: " + row.id)
          if (event.target.tagName == 'SEL') {
          //if (event.target.id == 'SEL') {
            //alert("scattato click bottone")
            const rowCols = row.getElementsByTagName( "td" );

           console.log("verifica obj Paziente ************** :")
           for (let h=0; h<rows.length; h++){
             console.log(row.id+"("+row.id.length+") "+rows[h].idanagrafica+"("+rows[h].idanagrafica.toString().length+")");
             if (rows[h].idanagrafica == row.id) {
               console.log("TROVATO");
               objPaziente = rows[h]
             }
  
           }
           console.log("verifica obj Paziente 0 :")
           console.log(objPaziente)          
 
            switch( event.target.id ) {
              case "sel" : {
                console.log("scattato select della riga")
  
                //alert("scattato select della riga SEL: contesto: " + localStorage.contesto)
                switch (localStorage.contesto) {
                    case "dialisi" : {
                      const event = new CustomEvent('selezionePazienteTurno', {bubbles: true, cancelable: true})                  
                      event.data=  objPaziente
                      document.dispatchEvent( event )
                    break;
                    }
                    case "accettazioni" : {
                      const event = new CustomEvent('selezionePazienteAcc', {bubbles: true, cancelable: true})
                      event.data=  objPaziente
                      document.dispatchEvent( event )
                    break;
                    }
                    case "certificazioni" : {
                      const htmlPaziente = `
                      <button class="btn btn-link btn-sm"  id="elencocertificati" ><h6>Paziente selezionato: ${objPaziente.cognoem}</h6></button>
                      `;
                      const pz  = document.getElementById( "cercapaziente" );
                      pz.innerHTML=""
                      const dtl  = document.getElementById( "dtlPazienti" );
                      dtl.innerHTML=""              
                      const info_paziente  = document.getElementById( "info_paziente" );
                      info_paziente.innerHTML = htmlPaziente
                      const btn_certificati  = document.getElementById( "elencocertificati" );
                      btn_certificati.addEventListener ('click', certificatiNew, false);
                      certificatiNew();
  
                    break;
                    }
                    case "anagrafica" : {
                      const event = new CustomEvent('modificaPaziente', {bubbles: true, cancelable: true})
                      console.log(objPaziente)
                      event.data=  objPaziente
                      console.log(event.data)
                      document.dispatchEvent( event )        
                    break;
                    }
  
                }
              break;
            }
  
            case "del" : {
              alert("scattato select della riga DEL: contesto: " + localStorage.contesto)
              user.destroy( row.id );
              const parent = row.parentNode;
              parent.removeChild(row);
              break;
            }
            case "upd" : {
              alert("scattato select della riga SEL: contesto: " + localStorage.contesto)
              const event = new CustomEvent('modificaPaziente', {bubbles: true, cancelable: true})
              event.data=  objPaziente
              document.dispatchEvent( event )
              //user.searchById( row.id );
              break;
            }
          }
        }
      });
  
    }
    
   
    //window.scrollTo(0,document.body.scrollHeight);
  };



const list = ( rows ) => {
  
  console.log("Pazienti - function list: costruisco lista pazienti ")
  console.log( rows )
  console.log( rows[0])
  //console.log( rows[0].cognome)


  const html = `
    <p>
    <h6 align="center"> ELENCO PAZIENTI</h6>

    <table id="userList" width="100%" style="font-size:80%;">
        <thead>
        <tr >
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Cognome</th>
          <th scope="col">CF</th>
          <th scope="col">Sesso</th>
          <th scope="col">Comune di nascita</th>
          <th scope="col">Data di nascita</th>
          <th scope="col">Comune di residenza</th>
          <th scope="col">Indirizzo</th>
          <th scope="col">Documento</th>          
          <th scope="col">Telefono</th>
          <th scope="col">Email</th>
          <th scope="col">DistrettoASL</th>          
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
      ${rows.map(row => `
        <!--tr id=${row.idanagrafica} class="row" info="${row.cognome} ${row.nome}" cf="${row.cf}" -->
        <tr id=${row.idanagrafica}>          
          <td ><p><sel id="sel">seleziona</sel></p></td>
          <td><p>${row.nome}</p></td>
          <td><p>${row.cognome}</p></td>
          <td><p>${row.cf}</p></td>
          <td><p>${row.sesso}</p></td>
          <td><p>${row.comunenascita}</p></td>
          <td><p>${row.datanascita}</p></td>
          <td><p>${row.comuneresidenza}</p></td>
          <td><p>${row.indirizzoresidenza}</p></td>
          <td><p>${row.ndocumento}</p></td>
          <td><p>${row.telefono}</p></td>
          <td><p>${row.email}</p></td>
          <td><p>${row.distrettoasl}</p></td>
          <td><p><sel id="upd">modifica</sel></p></td>
          <td><p><sel id="del">elimina paziente</sel></p></td>
        </tr>`
      ).join('')}
      </tbody>
    </table>

    </p>
    <div class="accettazioni-sub"></div>
  `;

  //<td ><p><sel id="sel">seleziona</sel></p></td>
  //<td ><p><sel id="sel"><button class="btn-primary">seleziona</button></sel></p></td>
    document.querySelector('.read-sub').innerHTML = html;
    console.log("selezione righe tabella")
    const table = document.getElementById( "userList" );
    //alert(table)
    console.log(table);
    //const tableRows = table.querySelectorAll(".row");
    const tableRows =table.getElementsByTagName( "tr" );
    console.log(tableRows)
    //alert(tableRows.length)
 
    
    /*let kkk = 0;
    for (let mmm = 0, row; row = table.rows[mmm]; mmm++) {
      kkk = kkk +1
    }
    alert(kkk)
    */

    //for (let mmm = 0, row; row = table.rows[mmm]; mmm++) {
      var pppp = 0;
        //for (let mmm = 0, row; row = table.rows[mmm]; mmm++) {
        for (let row of tableRows) {
        row.addEventListener('click', ( event ) => {
        console.log(event);
        if (event.target.tagName == 'SEL') {
        //if (event.target.id == 'SEL') {
          //alert("scattato click bottone")
          const rowCols = row.getElementsByTagName( "td" );
         /* localStorage.paziente = rowCols[1].innerText + " " + rowCols[2].innerText
          localStorage.idPaziente = row.id;
          localStorage.cf = rowCols[3].innerText          
          localStorage.comuneNascita = rowCols[5].innerText;
          localStorage.dataNascita = rowCols[6].innerText;
          localStorage.comuneResidenza = rowCols[7].innerText;
          localStorage.indirizzoPaziente = rowCols[8].innerText;
          localStorage.ndocumentoPaziente = rowCols[9].innerText
          localStorage.telefonoPaziente = rowCols[10].innerText
          localStorage.emailPaziente = rowCols[11].innerText
          localStorage.distrettoaslPaziente = rowCols[12].innerText
          */
         console.log("verifica obj Paziente ************** :")
         for (let h=0; h<rows.length; h++){
           console.log(row.id+"("+row.id.length+") "+rows[h].idanagrafica+"("+rows[h].idanagrafica.toString().length+")");
           if (rows[h].idanagrafica == row.id) {
             console.log("TROVATO");
             objPaziente = rows[h]
           }

         }
         console.log("verifica obj Paziente 0 :")
         console.log(objPaziente)          
          /*objPaziente.nome = rowCols[1].innerText 
          objPaziente.cognome =  rowCols[2].innerText
          objPaziente.paziente = rowCols[1].innerText + " " + rowCols[2].innerText
          objPaziente.nominativo = rowCols[1].innerText + " " + rowCols[2].innerText
          objPaziente.idPaziente = row.id;
          objPaziente.IDANAGRAFICA = row.id
          objPaziente.cf = rowCols[3].innerText          
          objPaziente.comuneNascita = rowCols[5].innerText;
          objPaziente.dataNascita = rowCols[6].innerText;
          objPaziente.comuneResidenza = rowCols[7].innerText;
          objPaziente.indirizzoResidenza = rowCols[8].innerText;
          objPaziente.ndocumento = rowCols[9].innerText
          objPaziente.telefono = rowCols[10].innerText
          objPaziente.email = rowCols[11].innerText
          objPaziente.distrettoasl = rowCols[12].innerText*/
          switch( event.target.id ) {
            case "sel" : {
              console.log("scattato select della riga")

              //alert("scattato select della riga SEL: contesto: " + localStorage.contesto)
              switch (localStorage.contesto) {
                  case "dialisi" : {
                    const event = new CustomEvent('selezionePazienteTurno', {bubbles: true, cancelable: true})                  
                    event.data=  objPaziente
                    document.dispatchEvent( event )
                  break;
                  }
                  case "accettazioni" : {
                    const event = new CustomEvent('selezionePazienteAcc', {bubbles: true, cancelable: true})
                    event.data=  objPaziente
                    document.dispatchEvent( event )
                  break;
                  }
                  case "certificazioni" : {
                    const htmlPaziente = `
                    <button class="btn btn-link btn-sm"  id="elencocertificati" ><h6>Paziente selezionato: ${objPaziente.cognoem}</h6></button>
                    `;
                    const pz  = document.getElementById( "cercapaziente" );
                    pz.innerHTML=""
                    const dtl  = document.getElementById( "dtlPazienti" );
                    dtl.innerHTML=""              
                    const info_paziente  = document.getElementById( "info_paziente" );
                    info_paziente.innerHTML = htmlPaziente
                    const btn_certificati  = document.getElementById( "elencocertificati" );
                    btn_certificati.addEventListener ('click', certificatiNew, false);
                    certificatiNew();

                  break;
                  }
                  case "anagrafica" : {
                    const event = new CustomEvent('modificaPaziente', {bubbles: true, cancelable: true})
                    console.log(objPaziente)
                    event.data=  objPaziente
                    console.log(event.data)
                    document.dispatchEvent( event )        
                  break;
                  }

              }
            break;
          }

          case "del" : {
            alert("scattato select della riga DEL: contesto: " + localStorage.contesto)
            user.destroy( row.id );
            const parent = row.parentNode;
            parent.removeChild(row);
            break;
          }
          case "upd" : {
            alert("scattato select della riga SEL: contesto: " + localStorage.contesto)
            const event = new CustomEvent('modificaPaziente', {bubbles: true, cancelable: true})
            event.data=  objPaziente
            document.dispatchEvent( event )
            //user.searchById( row.id );
            break;
          }
        }
      }
    });

  }
  
 
  //window.scrollTo(0,document.body.scrollHeight);
};


const search = ( event ) => {
  console.log('search pazienti' +  event.target.name.value );
  event.preventDefault();
  const info_paziente  = document.getElementById( "info_paziente" );
  info_paziente.innerHTML = '';
  console.log("chiamo la searchPazienti......: filtro: " +  event.target.name.value);
  document.querySelector( '.read-sub' ).innerHTML = "Waiting..."
  mdlPazienti.searchPazientiCognomeAcc( event.target.name.value );
};


const accettazioni = () => {
  event.preventDefault();
  accettazione.initModule( document.querySelector('.read-sub') );
};

const turni = () => {
  event.preventDefault()
  turno.initModule( document.querySelector('.read-sub') );
};

const certificatiOld = () => {
  event.preventDefault()
  certificato.initModule( document.querySelector('.read-sub') );
};

const certificatiNew = () => {
  console.log("alzo evento selezionePazienteCertificati ")
  const event = new CustomEvent('selezionePazienteCertificati', {bubbles: true, cancelable: true})
  event.data=  objPaziente
  document.dispatchEvent( event )
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
  console.log("initmodule pazienti")
  container.innerHTML = mainHTML;
  const form = document.forms.search;
  form.addEventListener ('submit', search, false);
  //document.querySelector("input[id='nuovoPaziente']").addEventListener('click', nuovo );
  const btn_nuovo  = document.getElementById( "nuovoPaziente" );
  btn_nuovo.addEventListener ('click', nuovo, false);
  
};


const aggiornaTotaliAccettazione =  (tariffa) => {
  const myinfoacc  = document.getElementById( "myinfoacc" );
  //myinfoacc.innerHTML = `Accettazione N. ${localStorage.idAccettazione} del ${localStorage.dataAccettazione} Totale lordo ${localStorage.totaleLordo} Totale netto ${localStorage.totaleNetto}`;
  myinfoacc.innerHTML = `Accettazione N. ${localStorage.idAccettazione} del ${localStorage.dataAccettazione}`;
}

export { initModule, aggiornaTotaliAccettazione};
