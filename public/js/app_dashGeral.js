const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')
const subMenu = document.getElementById('subMenu')
const botaoSub = document.getElementById('botaoSub')


function toggleMenu(){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')

   if (sidebar.classList.contains('close')){
         subMenu.classList.remove('show')
         botaoSub.classList.remove('rotate')
     }
}


function abrirSubmenu(){
  if (sidebar.classList.contains('close')) {
    sidebar.classList.remove('close');
    toggleButton.classList.remove('rotate');}

    subMenu.classList.toggle('show')
    botaoSub.classList.toggle('rotate')
}

function logOut(){
  window.location.href="../index.html"
}
