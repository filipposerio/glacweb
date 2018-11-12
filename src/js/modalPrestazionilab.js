
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
  document.querySelector('.shell-modal').innerHTML = message_html;
  document.querySelector('.message-modal').style.display = "block";
  document.querySelector('.message-modal-closebtn').addEventListener('click', onClickClosebtn );
};

export { show };
