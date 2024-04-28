// Obtener los enlaces de los meses dentro de container
const meses = document.querySelectorAll('#container .mes');

// Obtener el span del mes dentro de la ventana modal
const mdlMes = document.querySelector('#mdl-mes');

// Obtener la ventana modal 
// Obtener la ventana modal 
// Obtener la ventana modal 
const ventanaModal = document.querySelector('.ventana-modal');

//Obtener el enlace del boton cerrar
//Obtener el enlace del boton cerrar
const enlc_cerrar = document.getElementById('btn-cerrar');

// Agregar un evento de clic a cada enlace de mes
meses.forEach(mes => {
  mes.addEventListener('click', e => {
      e.preventDefault();
      // Obtener el texto del mes
      const mesSeleccionado = mes.textContent;
      
      // Asignar el texto del mes al span de la ventana modal
      mdlMes.textContent = mesSeleccionado;
      activarOverlay();
      // Mostrar la ventana modal
      ventanaModal.style.display = 'grid'; 
      
  });

});

//Cerrar la ventana emergente
enlc_cerrar.onclick=cerrar;

function cerrar(){
    ventanaModal.style.display='none';
    desactivarOverlay();
}

function activarOverlay() {
    var container = document.getElementById('container');
    container.classList.add('container-overlay');
  }
  
  function desactivarOverlay() {
    var container = document.getElementById('container');
    container.classList.remove('container-overlay');
  }

