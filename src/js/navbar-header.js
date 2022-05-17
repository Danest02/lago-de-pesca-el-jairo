const navbarHeader = document.getElementById("navbar-header"),
	mainScroll = document.querySelector("main").offsetTop,
	hamburguer = document.getElementById("hamburguer"),
	menuLinks = document.querySelectorAll(".menu__link");
const urlActual = window.location.href;
let initialScroll = window.pageYOffset;

// menuLinks.forEach(element => {
//         let href = element.getAttribute("href")
//         if(href !== "/"){
//             if (urlActual.includes(href)) {
//                 element.classList.add("menu__link--active")
//                 document.getElementById("menu__link--Inicio").classList.remove("menu__link--active")
//             } else {
//                 element.classList.remove("menu__link--active")
//             }
//         }

//     }
// )
hamburguer.addEventListener("click", () => {
	document.querySelector(".hamburguer__div-center").classList.toggle("hamburguer--simple");
	navbarHeader.classList.toggle("navbar-header--hamburguer");
	if (navbarHeader.classList.contains("navbar-header--hamburguer")) {
		disableScroll();
	} else {
		enableScroll();
	}
});

document.getElementById("menu").addEventListener("click", (e) => {
	if (e.target.matches(".menu__link")) {
		enableScroll();
		navbarHeader.classList.remove("navbar-header--hamburguer");
		document.querySelector(".hamburguer__div-center").classList.toggle("hamburguer--simple");
	}
});


const $sections = document.querySelectorAll(".section");

const callbackAnimation = (entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("aparecer");
		}
	});
};
const optionsAnimation = {
	rootMargin: "-120px",
};
let sectionAnimation = new IntersectionObserver(callbackAnimation, optionsAnimation);
$sections.forEach((el) => sectionAnimation.observe(el));

const callbackSection = (entries) => {
	entries.forEach((entry) => {
		let link = "link-" + entry.target.id;
		if (entry.isIntersecting) {
			document.getElementById(link).classList.add("animated-border--active");
		} else {
			document.getElementById(link).classList.remove("animated-border--active");
		}
	});
};
const optionsActividades = {
	rootMargin: "-120px",
	threshold: 0.1,
};
const optionsUbicacion = {
	threshold: 0.65,
};
const optionsContactanos = {
	threshold: 0.65,
};

let observerActividades = new IntersectionObserver(callbackSection, optionsActividades);
observerActividades.observe(document.getElementById("actividades"));
let observerUbicacion = new IntersectionObserver(callbackSection, optionsUbicacion);
observerUbicacion.observe(document.getElementById("ubicacion"));
let observerContactanos = new IntersectionObserver(callbackSection, optionsContactanos);
observerContactanos.observe(document.getElementById("contactanos"));
