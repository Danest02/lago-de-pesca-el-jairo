window.addEventListener("load", function () {
	class MySlider {
		constructor(nameSlider) {
			this.nameSlider = nameSlider;
			this.$mySlider = document.querySelector(nameSlider);
			this.$mySliderSlides = document.querySelector(`${nameSlider} .my-slider__slides`);
			this.$mySliderSlide = document.querySelector(`${nameSlider} .my-slider__slide`);
			this.$mySliderNextButtom = document.querySelector(`${nameSlider} .my-slider__navegation-button--next`);
			this.$mySliderBackButtom = document.querySelector(`${nameSlider} .my-slider__navegation-button--back`);
			this.mySliderDifference = 0;
			this.numberOfColumns = Math.floor(parseInt(getComputedStyle(document.querySelector(`${nameSlider}`)).getPropertyValue("--column")));
			this.slideWidth = document.querySelector(`${this.nameSlider} .my-slider__slide`).offsetWidth;
			this.slidesWidth = document.querySelector(`${this.nameSlider} .my-slider__slides`).offsetWidth;
			this.mySliderSlidesArray = document.querySelectorAll(`${this.nameSlider} .my-slider__slide`);
			this.semaphoreInterval = true;
			this.mySliderFirstClone = false;
			this.mySliderLastClone = false;
		}
		setSemaphoreInterval(a){
			this.semaphoreInterval = a
		}
		scroll() {
			if (this.mySliderDifference < 0) {
				if (this.mySliderFirstClone) {
					if (this.$mySliderSlides.scrollLeft > this.slideWidth / 1.2 && this.$mySliderSlides.scrollLeft < this.slideWidth * 1.2) {
						this.$mySliderSlides.style.scrollBehavior = "unset";
						this.$mySliderSlides.scrollLeft = this.$mySliderSlides.scrollWidth;
						this.$mySliderSlides.style.scrollBehavior = "smooth";
						this.$mySliderSlides.scrollLeft -= this.slideWidth;
					} else {
						this.$mySliderSlides.scrollLeft -= this.slideWidth;
					}
				} else {
					this.$mySliderSlides.scrollLeft -= this.slideWidth;
				}
			} else {
				if (this.mySliderFirstClone) {
					if (this.$mySliderSlides.scrollLeft > this.$mySliderSlides.scrollWidth - this.slideWidth * 1 - this.slideWidth / 2) {
						this.$mySliderSlides.style.scrollBehavior = "unset";
						this.$mySliderSlides.scrollLeft = this.slideWidth;
						this.$mySliderSlides.style.scrollBehavior = "smooth";
						this.$mySliderSlides.scrollLeft += this.slideWidth;
					} else {
						this.$mySliderSlides.scrollLeft += this.slideWidth;
					}
				} else {
					this.$mySliderSlides.scrollLeft += this.slideWidth;
				}
			}
		}
		infinity() {
			this.mySliderFirstClone = this.mySliderSlidesArray[0].cloneNode(true);
			this.mySliderLastClone = this.mySliderSlidesArray[this.mySliderSlidesArray.length - 1].cloneNode(true);
			this.mySliderSlidesArray = document.querySelectorAll(`${this.nameSlider} .my-slider__slide`);
			this.mySliderFirstClone.classList.add("first-clone");
			this.mySliderLastClone.classList.add("last-clone");
			document.querySelector(`${this.nameSlider} .my-slider__slides`).append(this.mySliderFirstClone);
			document.querySelector(`${this.nameSlider} .my-slider__slides`).prepend(this.mySliderLastClone);
		}
		interval(time) {
			setInterval(() => {
				if(this.semaphoreInterval){
					this.scroll();
				}
			}, time);
		}
		mouseMove() {
			let mySliderPressed = false;
			let mySliderStartX = 0;
			let mySliderEndX = 0;
			this.$mySlider.addEventListener("mousedown", (e) => {
				if (e.target.matches(".my-slider__event-none")) {
					return;
				}
				this.slideWidth = document.querySelector(`${this.nameSlider} .my-slider__slide`).offsetWidth;
				mySliderPressed = true;
				mySliderStartX = e.offsetX + e.target.getBoundingClientRect().left - e.target.parentElement.getBoundingClientRect().left;
			});
			this.$mySliderSlides.addEventListener("mousemove", (e) => {
				if (!mySliderPressed) return;
				mySliderEndX = e.offsetX + e.target.getBoundingClientRect().left - e.target.parentElement.getBoundingClientRect().left;
				this.mySliderDifference = mySliderStartX - mySliderEndX;
				this.$mySliderSlides.style.cursor = "grabbing";
				this.setSemaphoreInterval(false)
			});
			window.addEventListener("mouseup", () => {
				mySliderPressed = false;
				this.$mySliderSlides.style.cursor = "grab";
			});
			this.$mySliderSlides.addEventListener("mouseup", (e) => {
				if (this.mySliderDifference != 0) {
					this.scroll();
				}
				this.mySliderDifference = 0;
			});
		}
		navegationButton() {
			this.$mySlider.addEventListener("click", (e) => {
				if (e.target == this.$mySliderNextButtom) {
					if (this.$mySliderSlides.scrollLeft >= this.$mySliderSlides.scrollWidth - this.$mySliderSlides.offsetWidth) {
						this.$mySliderSlides.scrollLeft = 0;
					}
					this.$mySliderSlides.scrollLeft += this.slideWidth * this.numberOfColumns;
				} else if (e.target == this.$mySliderBackButtom) {
					this.$mySliderSlides.scrollLeft -= this.slideWidth * this.numberOfColumns;
				}
			});
		}
		scrollBefore() {
			document.querySelector(`${this.nameSlider} .my-slider__container-slides `).classList.add("my-slider__container-slides--before");
			this.$mySliderSlides.addEventListener("scroll", () => {
				if (this.$mySliderSlides.scrollLeft >= this.$mySliderSlides.scrollWidth - this.$mySliderSlides.offsetWidth) {
					document.querySelector(`${this.nameSlider} .my-slider__container-slides`).classList.add("my-slider__container-slides--before-hiden");
				} else {
					document.querySelector(`${this.nameSlider} .my-slider__container-slides`).classList.remove("my-slider__container-slides--before-hiden");
				}
			});
		}
	}

	const SliderTop = new MySlider(".slider-top");
	SliderTop.mouseMove();
	SliderTop.navegationButton();
	// SliderTop.infinity();
	// SliderTop.interval(1000);

});
