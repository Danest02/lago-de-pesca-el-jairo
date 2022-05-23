window.addEventListener("load", function () {
	class MySlider {
		constructor(nameSlider) {
			this.nameSlider = nameSlider;
			this.$mySlider = document.querySelector(nameSlider);
			this.$mySliderSlides = document.querySelector(`${nameSlider} .my-slider__slides`);
			this.$mySliderSlidesArray = Array.from(document.querySelectorAll(`${nameSlider} .my-slider__slide`));
			this.$mySliderSlide = document.querySelector(`${nameSlider} .my-slider__slide`);
			this.slideWidth;
			this.isDragging = false;
			this.startPosition = 0;
			this.currentTranslate = 0;
			this.prevTranslate = 0;
			this.currentIndex = 0;
			this.index = 0;
			this.currentPosition = 0;
			this.animationID = null;
			this.movedBy;
			this.slideWidth = document.querySelector(`${this.nameSlider} .my-slider__slide`).offsetWidth;
			this.numberOfColumns = Math.floor(parseInt(getComputedStyle(document.querySelector(`${nameSlider}`)).getPropertyValue("--column")));
			this.direction;
			this.$mySliderNextButtom = document.querySelector(`${nameSlider} .my-slider__navegation-button--next`);
			this.$mySliderBackButtom = document.querySelector(`${nameSlider} .my-slider__navegation-button--back`);
		}
		initialize() {
			window.addEventListener("resize", () => {
				this.slideWidth = document.querySelector(`${this.nameSlider} .my-slider__slide`).offsetWidth;
			});
			this.$mySliderSlidesArray.forEach((slide) => {
				slide.querySelector("img").addEventListener("dragstart", (e) => {
					e.preventDefault();
				});
			});
			this.$mySlider.oncontextmenu = function (e) {
				e.preventDefault();
				e.stopPropagation();
			};
			this.$mySliderSlides.addEventListener("touchstart", (e) => {
				this.touchStart(e);
			});
			this.$mySliderSlides.addEventListener("touchend", (e) => {
				this.touchEnd(e);
			});
			this.$mySliderSlides.addEventListener("touchmove", (e) => {
				this.touchMove(e);
			});
			this.$mySliderSlides.addEventListener("mousedown", (e) => {
				this.touchStart(e);
			});
			this.$mySliderSlides.addEventListener("mousemove", (e) => {
				this.touchMove(e);
			});
			this.$mySliderSlides.addEventListener("mouseup", (e) => {
				this.touchEnd(e);
			});
			this.$mySliderSlides.addEventListener("mouseleave", (e) => {
				this.touchEnd(e);
			});
		}
		setSlidesPosition() {
			console.log(this.currentTranslate);
			if (this.currentTranslate > 0) {
				return;
			} else {
				this.$mySliderSlides.style.transform = `translateX(${this.currentTranslate}px)`;
			}
		}

		getPositionX(e) {
			return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
		}

		animation() {
			this.setSlidesPosition();
			// if(this.isDragging){
			// 	reguestAnimationFrame(this.animation())
			// }
		}
		setPositionByIndex() {
			this.currentTranslate = this.currentIndex * -this.slideWidth;
			this.prevTranslate = this.currentTranslate;
			this.setSlidesPosition();
		}

		touchStart(e) {
			this.isDragging = true;
			this.startPosition = this.getPositionX(e);
		}
		touchMove(e) {
			if (this.isDragging) {
				this.$mySliderSlides.style.cursor = "grabbing";
				this.currentPosition = this.getPositionX(e);
				this.currentTranslate = this.prevTranslate + this.currentPosition - this.startPosition;
				this.animation();
			}
		}
		touchEnd() {
			this.isDragging = false;
			this.movedBy = this.currentTranslate - this.prevTranslate;
			this.movedBy > 0 ? (this.direction = -1) : (this.direction = 1);
			if (Math.abs(this.movedBy) > this.slideWidth * 2.5) {
				this.currentIndex += 3 * this.direction;
			} else if (Math.abs(this.movedBy) > this.slideWidth * 1.5) {
				this.currentIndex += 2 * this.direction;
			} else if (Math.abs(this.movedBy) > 50) {
				this.currentIndex += 1 * this.direction;
			}
			if (this.currentIndex > this.$mySliderSlidesArray.length - this.numberOfColumns) {
				this.currentIndex = this.$mySliderSlidesArray.length - this.numberOfColumns;
			} else if (this.currentIndex < 0) {
				this.currentIndex = 0;
			}
			this.setPositionByIndex();
			this.$mySliderSlides.style.cursor = "grab";
		}

		setPositionByIndex() {
			if (this.currentIndex > this.$mySliderSlidesArray.length - this.numberOfColumns) {
				this.currentIndex = this.$mySliderSlidesArray.length - this.numberOfColumns;
			} else if (this.currentIndex < 0) {
				this.currentIndex = 0;
			}
			this.currentTranslate = this.currentIndex * -this.slideWidth;
			this.prevTranslate = this.currentTranslate;
			this.setSlidesPosition();
		}
		navegationButton() {
			this.$mySlider.addEventListener("click", (e) => {
				if (e.target == this.$mySliderNextButtom) {
					this.currentIndex += 1;
				} else if (e.target == this.$mySliderBackButtom) {
					this.currentIndex -= 1;
				}
				this.setPositionByIndex();
				if(this.currentIndex == 0){
					this.$mySliderBackButtom.classList.toggle("my-slider__navegation-button--opacity-none")
				}else{
					this.$mySliderBackButtom.classList.remove("my-slider__navegation-button--opacity-none")
				}
				if(this.currentIndex == this.$mySliderSlidesArray.length - this.numberOfColumns){
					this.$mySliderNextButtom.classList.toggle("my-slider__navegation-button--opacity-none")
				}else{
					this.$mySliderNextButtom.classList.remove("my-slider__navegation-button--opacity-none")
				}
			});
		}
	}
	const sliderTop = new MySlider(".slider-top");
	sliderTop.initialize();
	sliderTop.navegationButton();
});
