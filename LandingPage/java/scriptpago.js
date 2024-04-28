const select = document.querySelector('#select');
const opciones = document.querySelector('#opciones');

select.addEventListener('click', () => {
	select.classList.toggle('active');
	opciones.classList.toggle('active');
});