@@include('mySlider.js');



let burger = document.querySelector('.burger'),
    headerTop = document.querySelector('.header__top'),
    headerNav = document.querySelector('.header-top__nav'),
    headerBtn = document.querySelector('.header-top__btn'),
    headerLogo = document.querySelector('.header-top__logo')
    
burger.addEventListener('click', () => {
    burger.classList.toggle('_active')
    headerTop.classList.toggle('_active')
    headerNav.classList.toggle('_active')
    headerBtn.classList.toggle('_active')
    headerLogo.classList.toggle('_active')
})





let list = document.querySelector('.header-nav__list');
let header = document.querySelector('.header-top__content');
let width = window.innerWidth;
if(window.innerWidth < 576) {
    list.appendChild(headerBtn);
} else {
    window.addEventListener('resize', () => {
        if(window.innerWidth < 576) {
            list.appendChild(headerBtn);
        } else {
            header.appendChild(headerBtn);
        }
    })
}


const slider = new Slider({
    dots: true,
    infinity: true,
    autoHeight: true,
    
});

slider.init();



