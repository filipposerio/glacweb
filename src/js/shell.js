
import * as pazienti from './pazienti.js';
import * as login from './login.js';
import * as message from './message.js';
import * as configurazione from './configurazione.js';
import * as turno from './turno.js';
// Module variables
const main_html = `
<nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: #e3f2fd;" >
<a class="navbar-brand" href="#">GlacWeb ver.2.0.0</a>
  <div class="navbar-nav" style="background-color: #e3f2fd;" ></div-->
</nav>
<div align="center" class="display-4 d-print-none" id="sottotitolo"></div>
<div class="container-fluid main-content"></div>
<div class="shell-modal"></div>
`;


const navbar_html = `

<a href="#anagrafica" id="anagrafica" class="shell-nav-li nav-item nav-link">Anagrafica</a>
<a id="turni" class="shell-nav-li nav-item nav-link" href="#">Gestione Turni Dialisi</a>
<a href="#accettazioni" id="accettazioni" class="shell-nav-li nav-item nav-link">Accettazioni</a>
<a id="certificazioni" class="shell-nav-li nav-item nav-link" href="#">Certificazioni</a>
<a id="rendiconto" class="shell-nav-li nav-item nav-link" href="#">Rendiconto</a>
<a id="statistiche" class="shell-nav-li nav-item nav-link" href="#">Statistiche</a>
<a id="configurazione" class="shell-nav-li nav-item nav-link" href="#">Configurazione</a>
<a id="message" class="shell-nav-li nav-item nav-link" href="#">Message</a>
<a id="about" class="shell-nav-li nav-item nav-link" href="#">About</a>
<a id="logout" class="shell-nav-li nav-item nav-link" href="#">Logout</a>
`;
const onClickMenuitem = ( id ) => {
    console.log("SCATTATO ONCLICKMENUITEM")
    switch (id) {
      case "rendiconto": {

        document.getElementById('sottotitolo').innerHTML="Rendiconto"
        document.querySelector('.main-content').innerHTML = "Rendiconto"

        break;
      }
      case "statistiche": {

        document.getElementById('sottotitolo').innerHTML="Statistiche"
        document.querySelector('.main-content').innerHTML = "Statistiche"
        break;
      }
      case "turni": {
        localStorage.contesto = "dialisi"
        document.getElementById('sottotitolo').innerHTML="Turni Dialisi"
        pazienti.initModule( document.querySelector('.main-content') );

        break;
      }
      case "certificazioni": {
        localStorage.contesto = "certificazioni"
        document.getElementById('sottotitolo').innerHTML="Certificazioni"
        pazienti.initModule( document.querySelector('.main-content') );

        break;
      }
      case "anagrafica": {
        localStorage.contesto = "anagrafica"
        document.getElementById('sottotitolo').innerHTML="Anagrafica"
        pazienti.initModule( document.querySelector('.main-content') );
        break;
      }
      case "accettazioni": {
        console.log("chiamo la pazienti initmodule")
        localStorage.contesto = "accettazioni"
        document.getElementById('sottotitolo').innerHTML="Accettazione - Gestione"
        pazienti.initModule( document.querySelector('.main-content') );
        break;
      }
      case "risultati": {
        console.log("chiamo la esami initmodule")
        document.getElementById('sottotitolo').innerHTML="RISULTATI"
        document.querySelector('.main-content').innerHTML = "RISULTATI"
        fs.readdirSync('/static', (err, data) => {
            if (err) throw err;
            console.log(data);
          });
        //esami.initModule( document.querySelector('.shell-main-content') );
        break;
      }
      case "configurazione": {
        console.log("chiamo la configurazione initmodule")
        document.getElementById('sottotitolo').innerHTML="CONFIGURAZIONE"
        configurazione.initModule( document.querySelector('.main-content') );
        break;
      }
      case "message": {
          console.log("scattato bottone clik message")
        message.show( 'Benvenuti in GlacWeb 2.0');
        break;
      }
      case "logout": {
        console.log("passo dalla logout");
        localStorage.clear();
        login.initModule( document.getElementById('spa') );

        break;
      }
    }
};
// Export module initModule
const initModule = ( container ) => {

  console.log("Init module shell.js")
  //
  //document.querySelector('.shell-main-nav').innerHTML = nav_html;
  //document.querySelector('.shell-head-acct').innerHTML = "Utente collegato: Utente1";
  //container.innerHTML = main_html;
  //document.querySelector('.shell-head-acct').innerHTML ='utente connesso: [' + localStorage.username +']';
  //document.querySelector('main-content').innerHTML =  main_html;
  container.innerHTML = main_html;
  document.querySelector('.navbar-nav').innerHTML = navbar_html;
  const li = document.getElementsByClassName( 'shell-nav-li' );
  for (let _li of li) {
        _li.addEventListener(
          "click", ( event ) => {
          //console.log("aggiunto  onClickmenuitem per ")
          //alert("aggiunto  onClickmenuitem per " + event.currentTarget.id)
          onClickMenuitem( event.currentTarget.id );
          }
      );
  }
}  


export { initModule };
