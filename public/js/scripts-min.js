"use strict";
function _classCallCheck(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, t) {
	for (var i = 0; i < t.length; i++) {
		var n = t[i];
		(n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
	}
}
function _createClass(e, t, i) {
	return t && _defineProperties(e.prototype, t), i && _defineProperties(e, i), e;
}
var navbarHeader = document.getElementById("navbar-header"),
	mainScroll = document.querySelector("main").offsetTop,
	hamburguer = document.getElementById("hamburguer"),
	menuLinks = document.querySelectorAll(".menu__link"),
	urlActual = window.location.href,
	initialScroll = window.pageYOffset;
hamburguer.addEventListener("click", function () {
	document.querySelector(".hamburguer__div-center").classList.toggle("hamburguer--simple"), navbarHeader.classList.toggle("navbar-header--hamburguer"), navbarHeader.classList.contains("navbar-header--hamburguer") ? disableScroll() : enableScroll();
}),
	document.getElementById("menu").addEventListener("click", function (e) {
		e.target.matches(".menu__link") && (enableScroll(), navbarHeader.classList.remove("navbar-header--hamburguer"), document.querySelector(".hamburguer__div-center").classList.toggle("hamburguer--simple"));
	});
var $sections = document.querySelectorAll(".section"),
	callbackAnimation = function (e) {
		e.forEach(function (e) {
			e.isIntersecting && e.target.classList.add("aparecer");
		});
	},
	optionsAnimation = { rootMargin: "-120px" },
	sectionAnimation = new IntersectionObserver(callbackAnimation, optionsAnimation);
$sections.forEach(function (e) {
	return sectionAnimation.observe(e);
});
var callbackSection = function (e) {
		e.forEach(function (e) {
			var t = "link-" + e.target.id;
			e.isIntersecting ? document.getElementById(t).classList.add("animated-border--active") : document.getElementById(t).classList.remove("animated-border--active");
		});
	},
	optionsActividades = { rootMargin: "-120px", threshold: 0.1 },
	optionsUbicacion = { threshold: 0.65 },
	optionsContactanos = { threshold: 0.65 },
	observerActividades = new IntersectionObserver(callbackSection, optionsActividades);
observerActividades.observe(document.getElementById("actividades"));
var observerUbicacion = new IntersectionObserver(callbackSection, optionsUbicacion);
observerUbicacion.observe(document.getElementById("ubicacion"));
var observerContactanos = new IntersectionObserver(callbackSection, optionsContactanos);
observerContactanos.observe(document.getElementById("contactanos"));
var disableScroll = function () {
		var e = window.scrollX,
			t = window.scrollY;
		window.onscroll = function () {
			window.scrollTo(e, t);
		};
	},
	enableScroll = function () {
		window.onscroll = null;
	};
window.addEventListener("load", function () {
	var e = new ((function () {
		function e(t) {
			_classCallCheck(this, e), (this.nameSlider = t), (this.$mySlider = document.querySelector(t)), (this.$mySliderSlides = document.querySelector("".concat(t, " .my-slider__slides"))), (this.$mySliderSlide = document.querySelector("".concat(t, " .my-slider__slide"))), (this.$mySliderNextButtom = document.querySelector("".concat(t, " .my-slider__navegation-button--next"))), (this.$mySliderBackButtom = document.querySelector("".concat(t, " .my-slider__navegation-button--back"))), (this.mySliderDifference = 0), (this.numberOfColumns = Math.floor(parseInt(getComputedStyle(document.querySelector("".concat(t))).getPropertyValue("--column")))), (this.slideWidth = document.querySelector("".concat(this.nameSlider, " .my-slider__slide")).offsetWidth);
		}
		return (
			_createClass(e, [
				{
					key: "scroll",
					value: function () {
						this.mySliderDifference < 0 ? (Math.abs(this.mySliderDifference) < this.slideWidth ? (this.$mySliderSlides.scrollLeft -= this.slideWidth) : (this.$mySliderSlides.scrollLeft += this.mySliderDifference)) : this.mySliderDifference < this.slideWidth ? (this.$mySliderSlides.scrollLeft += this.slideWidth) : (this.$mySliderSlides.scrollLeft += this.mySliderDifference);
					},
				},
				{
					key: "mouseMove",
					value: function () {
						var e = this;
						this.$mySliderSlides.scrollLeft = 0;
						var t = !1,
							i = 0,
							n = 0;
						this.$mySlider.addEventListener("mousedown", function (n) {
							n.target.matches(".my-slider__event-none") || ((e.slideWidth = document.querySelector("".concat(e.nameSlider, " .my-slider__slide")).offsetWidth), (t = !0), (i = n.offsetX + n.target.getBoundingClientRect().left - n.target.parentElement.getBoundingClientRect().left));
						}),
							this.$mySliderSlides.addEventListener("mousemove", function (r) {
								t && ((n = r.offsetX + r.target.getBoundingClientRect().left - r.target.parentElement.getBoundingClientRect().left), (e.mySliderDifference = i - n), (e.$mySliderSlides.style.cursor = "grabbing"), e.setSemaphoreInterval(!1));
							}),
							window.addEventListener("mouseup", function () {
								(t = !1), (e.$mySliderSlides.style.cursor = "grab");
							}),
							this.$mySliderSlides.addEventListener("mouseup", function (t) {
								0 != e.mySliderDifference && e.scroll(), (e.mySliderDifference = 0);
							});
					},
				},
				{
					key: "navegationButton",
					value: function () {
						var e = this;
						this.$mySlider.addEventListener("click", function (t) {
							t.target == e.$mySliderNextButtom ? (e.$mySliderSlides.scrollLeft >= e.$mySliderSlides.scrollWidth - e.$mySliderSlides.offsetWidth && (e.$mySliderSlides.scrollLeft = 0), (e.$mySliderSlides.scrollLeft += e.slideWidth * e.numberOfColumns)) : t.target == e.$mySliderBackButtom && (e.$mySliderSlides.scrollLeft -= e.slideWidth * e.numberOfColumns);
						});
					},
				},
			]),
			e
		);
	})())(".slider-top");
	e.mouseMove(), e.navegationButton();
});
var getScrollBarWidth = function () {
	return innerWidth - document.documentElement.clientWidth;
};
document.documentElement.style.setProperty("--scroll-bar", getScrollBarWidth());
