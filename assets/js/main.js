// MODAL FUNCTION
const reportBtn = document.querySelector('.reportThis');
const closeBtn = document.querySelector('.close');
const modalForm = document.querySelector('#reportThis');

const modalFunction = () => {
modalForm.classList.add('block');
}
reportBtn.addEventListener('click', modalFunction);

const modalClose = () => {
  modalForm.classList.remove('block');
}
closeBtn.addEventListener('click', modalClose);


//  MOBILE SLIDE NAVIGATION
$(document).ready(function() {
  $('#sidebar-toggle').click(function(i) {
    i.preventDefault();
    $('#main-wrapper').toggleClass('toggled');
  $('body').toggleClass('body-out');
    $('#overlay').toggle();
  });

  $('#overlay').click(function() {
    $('#overlay').hide('200');
    $('#main-wrapper').removeClass('toggled');
  $('body').removeClass('body-out');
});	  
});


