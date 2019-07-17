// MODAL FUNCTION
const modalBtn = document.querySelector('.reportThis');
const closeBtn = document.querySelector('.close');
const modalForm = document.querySelector('#reportThis');

if(modalBtn){
  modalBtn.addEventListener('click', () => modalFunction());

  closeBtn.addEventListener('click', () => modalClose());

  const modalFunction = () => modalForm.classList.add('block');
  const modalClose = () => modalForm.classList.remove('block');
}

//  MOBILE SLIDE NAVIGATION
const toggleBtn = document.querySelector('#sidebar-toggle');
const mainContent = document.querySelector('#main-wrapper');
const body = document.querySelector('body');
const overlay = document.querySelector('#overlay');

if(toggleBtn){
  toggleBtn.addEventListener('click', () => {
    mainContent.classList.toggle('toggled');
    body.classList.toggle('body-out');
    overlay.classList.toggle('block');
  });
}
