//Que cuando toquemos el btn aparezca y desaparezca el menu
// eslint-disable-next-line no-undef
menubtn.addEventListener("click", () => {
	// eslint-disable-next-line no-undef
	nav.classList.toggle("desplegar");
});
// eslint-disable-next-line no-undef
menuFilter.addEventListener("click", () => {
	// eslint-disable-next-line no-undef
	filter.classList.toggle("mostrarFiltro");
	console.log("Hiciste");
});
