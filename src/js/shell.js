
import * as pazienti from './pazienti.js';
import * as login from './login.js';
import * as message from './message.js';
import * as configurazione from './configurazione.js';
import * as turno from './turno.js';
import * as laterale from './laterale.js';
// Module variables
const main_html = `

<nav class="navbar navbar-expand-lg navbar-dark bg-primary"  media="screen">
<a class="navbar-brand" href="#">GlacWeb ver.2.0.0 pg</a>
  <div class="navbar-nav"  ></div-->
</nav>
<div align="center" class="display-5 d-print-none" id="sottotitolo"></div>
<div class="container-fluid amain-content" ></div>
<div class="shell-modal"></div>
<div class="container-fluid oldmain-content" ></div>
<div class="row shellcontainer">

  <div class="col-80">
    <div id="centrale" class="container  container-centrale ">
    
    </div>
  </div>
  <div class="col-20">
    <div id="laterale" class="container container-destro">
    
    </div>
  </div>
</div>
`;


const navbar_html = `
<ul >
<li class="menuitem" id="home"><a href="#">Home</a></li>
<li class="menuitem"  id="anagrafica"><a href="#anagrafica" id="anagrafica" >Anagrafica</a></li>
<li class="menuitem"  id="turni"><a href="#turni" id="turni" >Gestione Turni Dialisi</a></li>
<li class="menuitem"  id="certificazioni"><a href="#certificazioni" id="certificazioni" >Certificazioni</a></li>
<li class="menuitem"  id="rendiconto"><a href="#rendiconto" id="rendiconto" >Rendiconto</a></li>
<li class="menuitem"  id="statistiche"><a href="#statistiche" id="statistiche" >Statistiche</a></li>
<li class="menuitem"  id="configurazione"><a href="#configurazione" id="configurazione" >Configurazione</a></li>
<li class="dropdown">
<a href="javascript:void(0)" class="dropbtn">Accettazione</a>
<div class="dropdown-content">
  <a class="menuitem" href="#accettazioni" id="accettazioni" >Nuova</a>
  <a class="menuitem" href="#accettazionidata" id="accettazionidata" >Ricerca</a></li>
</div>
</li>
<li class="dropdown">
<a href="javascript:void(0)" class="dropbtn">Ricette</a>
<div class="dropdown-content">
  <a class="menuitem" href="#ricettepaziente" id="ricettepaziente" >Ricerca per data</a>
  <a class="menuitem" href="#ricettedata" id="accettazionidata" >Ricette per paziente</a></li>
</div>
</li>
<li class="menuitem" style="float:right"><a id="logout" class="active" href="#">Logout</a></li>
</ul>
<br>
<a href="#anagrafica" id="anagraficaOld" class="menuitem">Anagrafica</a>
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
        document.querySelector('.container-centrale ').innerHTML = "Rendiconto"

        break;
      }
      case "statistiche": {

        document.getElementById('sottotitolo').innerHTML="Statistiche"
        document.querySelector('.container-centrale ').innerHTML = "Statistiche"
        break;
      }
      case "turni": {
        localStorage.contesto = "dialisi"
        document.getElementById('sottotitolo').innerHTML="Turni Dialisi"
        pazienti.initModule( document.querySelector('.container-centrale ') );

        break;
      }
      case "certificazioni": {
        localStorage.contesto = "certificazioni"
        document.getElementById('sottotitolo').innerHTML="Certificazioni"
        pazienti.initModule( document.querySelector('.container-centrale ') );

        break;
      }
      case "anagrafica": {
        localStorage.contesto = "anagrafica"
        document.getElementById('sottotitolo').innerHTML="Anagrafica"
        pazienti.initModule( document.querySelector('.container-centrale ') );
        break;
      }
      case "accettazioni": {
        console.log("chiamo la pazienti initmodule")
        localStorage.contesto = "accettazioni"
        document.getElementById('sottotitolo').innerHTML="Accettazione - Gestione"
        pazienti.initModule( document.querySelector('.container-centrale ') );
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
  //const li = document.getElementsByClassName( 'shell-nav-li' );
  const li = document.getElementsByClassName( 'menuitem' );
  for (let _li of li) {
        _li.addEventListener(
          "click", ( event ) => {
          //console.log("aggiunto  onClickmenuitem per ")
          //alert("aggiunto  onClickmenuitem per " + event.currentTarget.id)
          onClickMenuitem( event.currentTarget.id );
          }
      );
  }
  laterale.initModule();
}  


export { initModule };
