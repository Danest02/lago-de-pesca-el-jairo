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
})

document.getElementById("menu").addEventListener("click", (e) => {
    if(e.target.matches('.menu__link')){
        enableScroll();
        navbarHeader.classList.toggle("navbar-header--hamburguer");
    }
})

const $sections = document.querySelectorAll("[data-scroll-spy]");

let options = {
    // root: document.querySelectorAll(".scroll-spy"),
	rootMargin: "-100px",
	threshold: 0,
};
const callback = (entries) => {
	entries.forEach((entry) => {
		let link = "link-" + entry.target.id;
		if (entry.isIntersecting) {
			document.getElementById(link).classList.add("animated-border--active");
			document.getElementById(entry.target.id).classList.add("aparecer");
		}else{
			document.getElementById(link).classList.remove("animated-border--active");
        }
	});
};

let observer = new IntersectionObserver(callback, options);

$sections.forEach((el) => observer.observe(el));

