
const aggiungiesamiModale = `
<br>
<br>
<div class="row">
      <div class="col-lg-4">
        <form id="searchEsami">
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
<div class="row">
<div class="col">
  <div id="subesa" class="elencoesami-sub"></div>
</div>
</div>
`;
const onClickClosebtn = () => {

  document.querySelector('.message-modal').style.display = "none";
};

const show = ( msg ) => {

  const message_html = `
    <div id="id01" class="message-modal">
      <div class="message-modal-content">
        <span class="message-modal-closebtn">&times;</span>
        <p id="message-modal-text">${ msg }</p>
      </div>
    </div>
  `;
  document.querySelector('.shell-modal').innerHTML = aggiungiesamiModale;
  document.querySelector('.message-modal').style.display = "block";
  document.querySelector('.message-modal-closebtn').addEventListener('click', onClickClosebtn );
};

export { show };
