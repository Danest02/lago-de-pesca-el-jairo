

// var swiper = new Swiper('.swiper-container', {
//     //- cssMode: true,
//     centeredSlides: true,
//     slidesPerView: 1,
//     spaceBetween: 30,
//     grabCursor: true,
//     //- freeMode: true;

//     loop: true,
//     //- autoplay: {
//     //-     delay: 2500,
//     //-     disableOnInteraction: false,
//     //- },
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//         dynamicBullets: true,
//         type: "fraction",
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     mousewheel: false,
//     keyboard: true,
// });
const swiperHeader = document.querySelector(".swiper-header")
if(swiperHeader){
    var swiper = new Swiper(swiperHeader, {
        //- cssMode: true,
        centeredSlides: true,
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        //- freeMode: true;
    
        loop: true,
        //- autoplay: {
        //-     delay: 2500,
        //-     disableOnInteraction: false,
        //- },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        mousewheel: false,
        keyboard: true,
    });
    var swiper = new Swiper('.swiper-index-main', {
        //- cssMode: true,
        centeredSlides: true,
        slidesPerView: "auto",
        spaceBetween: 30,
        grabCursor: true,
        //- freeMode: true;
    
        loop: true,
        //- autoplay: {
        //-     delay: 2500,
        //-     disableOnInteraction: false,
        //- },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: "fraction",
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        mousewheel: false,
        keyboard: true,
    });
}
