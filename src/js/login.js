
import * as message from './message.js';
import * as model from './model.js';
import * as shell from './shell.js';


//import * as user from './user.js';

// Module variables




const login_html = `
<body>
    <div id="login">
        <h3 class="text-center text-white pt-5">Login form</h3>
        <div class="container-fluid">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" name='search' class="form" action="" method="post">
                            <h3 class="text-center text-info">Login - Gestionale D</h3>
                            <div class="form-group">
                                <label for="username" class="text-info">Username:</label><br>
                                <input type="text" name="username" id="username" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br>
                                <input type="password" name="password" id="password" class="form-control">
                            </div>
                            <div class="form-group">                                
                                <input type="submit" name="submit" class="btn btn-info btn-md" value="submit">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


</body>
`;




document.addEventListener( 'oklogin', ( event ) => {
    event.preventDefault();
    console.log("Login - event okLogin: conservo username appena connesso")
    console.log(event.data)
    //console.log(event.data[0])
    //console.log(event.data[0].ragionesociale)
    console.log("Login - event okLogin: numero righe trovate " + event.data.length)
    localStorage.username = document.getElementById('username').value;
    localStorage.ragionesociale = event.data[0].ragionesociale;
    localStorage.indirizzo = event.data[0].indirizzo;
    localStorage.comune = event.data[0].comune;
    localStorage.telefono = event.data[0].telefono;
    localStorage.telefono = event.data[0].telefono;
    localStorage.pincode = event.data[0].dempcode;
    localStorage.codregioneerogatore = '190'
    localStorage.codaslerogatore = '206'
    localStorage.codssaerogatore = event.data[0].demssa;
    localStorage.utenteerogatore = event.data[0].demusr;
    localStorage.pwerogatore = event.data[0].dempw;
    
    console.log("ragione sociale : " + localStorage.ragionesociale)
    console.log(" username: " + localStorage.username);
    initModule(document.getElementById('spa'));
});
  document.addEventListener( 'kologin', ( event ) => {
    event.preventDefault();
    alert("Username o password errati o servizio non disponibile.")
    });



// Export module initModule


const login = ( event ) => {
  console.log('passo dalla submit del bottone LOGIN');
  event.preventDefault();
  console.log(event)
  const datilogin =  {}
  datilogin.username = event.target.username.value;
  datilogin.password = event.target.password.value;
  model.login(JSON.stringify(datilogin));
};
const initModule = ( container ) => {
  console.log("passo dalla initmodule login")
  console.log("verifico se login session è ancora attiva")
  console.log(localStorage.username)
  if (localStorage.username != undefined) {
      console.log("username definita allora disegno il menu a destra")
      console.log(localStorage.username)
      shell.initModule(container)
  }
  else {
    console.log("utente non ancora connesso")
    console.log("Init module login.js")
    container.innerHTML = login_html;
    //document.querySelector('.shell-main-content-body').innerHTML = login_html;
    //document.querySelector('.shell-head-acct').innerHTML ='[]';
    const form = document.forms.search;
    form.addEventListener ('submit', login, false);
    const li = document.querySelectorAll('.filippo' );
    //const li = document.getElementsByClassName('filippo' );
    for (let _li of li) {
      _li.addEventListener( "click", ( event ) => {onClickMenuitem( event.currentTarget.id );});
    }
  }
};

export { initModule };
