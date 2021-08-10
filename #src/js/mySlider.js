


//========== very Alpha v0.0.0 ============ //



class Slider {
    constructor({dots = null, infinity = false, slidesToShow = 1, autoHeight = false , id = null}){
        this.dots = dots,
        this.infinity = infinity,
        this.slidesToShow = slidesToShow,
        this.autoHeight = autoHeight,
        this.id = id 
    }

    init() {

        const sliderBlock = document.querySelector(this.id ? `#${this.id}` : '#slider');

        if(sliderBlock) {

            this.slidesBlock = sliderBlock.children.slides;
            this.slides = this.slidesBlock.children
            this.numberOfSlides = this.slides.length;      
            this.curentSlide = 0;

            this.prepareSlides();
            this.dots && this.prepareDots(sliderBlock);
            this.noEvents = true;
            this.tuchSlide();
            this.autoHeight && this.autoHeightHandler(this.infinity, 0);

        }    
    }
    
    prepareSlides() {

        this.slidesArray = [];
        this.heightArray = [];
        for (const slide of this.slides) { 
            this.slidesArray.push(slide);
            this.heightArray.push( parseInt(getComputedStyle(slide.children[0]).getPropertyValue('height')) + 20);
            
        }
        for (let i = 0; i < this.numberOfSlides; i++) {
            this.slides[0].remove();
        }
        this.showSlides();

    }

    showSlides() {

        this.infinity ? this.slideOffset = -100 : this.slideOffset = 0;
        for (const slide of this.slidesArray) {
            (slide.style.transform = `translate(${this.slideOffset}%, 0)`);
            slide.style.transition = '0.3s';
            this.slidesBlock.append(slide);
        } 
        
    }

    prepareDots(sliderBlock) {

        this.dotsBlock = sliderBlock.children.dots;
        const dot = this.dotsBlock.children;
        
        for (let i = 0; i < this.numberOfSlides; i++) {
            const customDot = dot[0].cloneNode(true);
            customDot.children[0].setAttribute('data-id', i);
            (i === 0) && (customDot.children[0].checked = true);
            customDot.addEventListener('change', this.shiftSlide.bind(this));
            this.dotsBlock.append(customDot)
        }

        dot[0].remove();

    }

    shiftSlide(e, nextSlide) {
        
        if (!nextSlide && nextSlide !==0) {
            nextSlide = e.target.dataset.id
        }

        let isForward = null;
        

        if ( nextSlide - this.curentSlide === 1 ) {

            this.slideOffset = this.slideOffset - 100;
            isForward = true;

        } else if ( nextSlide - this.curentSlide === -1 ) {

            this.slideOffset = this.slideOffset + 100;
            isForward = false;

        } else if( nextSlide - this.curentSlide === -2 ) {

            this.infinity ? this.slideOffset = this.slideOffset - 100 : 
                this.slideOffset = this.slideOffset + 200;

            isForward = true;

        } else if( nextSlide - this.curentSlide === 2 ) {

            this.infinity ? this.slideOffset = this.slideOffset + 100 : 
                this.slideOffset = this.slideOffset - 200;
            
            isForward = true;

        }

        for (const slide of this.slidesArray) {      
        
            slide.style.transform = `translate(${this.slideOffset}%, 0)`;  

        }  

        if (nextSlide >= 3) {
            nextSlide = 0
        }
        if (nextSlide <= -1) {
            nextSlide = 2
        }

        this.curentSlide = nextSlide;

        for (const dot of this.dotsBlock.children) {
    
            if(+this.curentSlide === +dot.children[0].dataset.id) {
                dot.children[0].checked = true; 
                
                
                this.autoHeight && this.autoHeightHandler(this.infinity, +dot.children[0].dataset.id);
            }
        }
        this.infinity && setTimeout(() => this.updateSlides(isForward), 300);
        
        
    
    }
     
    tuchSlide() {
        
        
        let offset = 0;
        let startCords;  
        let movebind = move.bind(this);

        if (this.noEvents) {
            this.slidesBlock.addEventListener('pointerdown', keypress.bind(this));
            this.slidesBlock.addEventListener('pointerup', clearEvents.bind(this));
            this.noEvents = false;
        }
        
        function clearEvents() {
            document.removeEventListener('pointermove', movebind);
            
            
            for (const slide of this.slidesArray) {      
                slide.style.transform = `translate(${this.slideOffset}%, 0)`;  
            }   
        }

        function keypress(e) {
            e.preventDefault();
            startCords = e.clientX; 
            document.addEventListener('pointermove', movebind);  
        }

        function move(e) {

            let scale = (window.innerWidth < 768) ? 3 : 5; 
            offset = -Math.round((startCords - e.clientX) / scale);
             
            for (const slide of this.slidesArray) {      
                slide.style.transform = `translate(${this.slideOffset + offset}%, 0)`;  
            }  

            if(offset === -70) {
                this.shiftSlide.bind(this)(null, this.curentSlide + 1);
                clearEvents.bind(this)();
            }   

            if(offset === 70) {
                
                
                this.shiftSlide.bind(this)(null, this.curentSlide - 1);
                clearEvents.bind(this)();
            }

            
            
        }
    }

    updateSlides(isForward) {

        let element = null;

        if (isForward) {
            element = this.slidesArray.shift();
            this.slidesArray.push(element);
        } else if (isForward === false) {
            element = this.slidesArray.pop();
            this.slidesArray.unshift(element);
        }

        this.showSlides();
    }

    autoHeightHandler(infiniti, index) { 
        infiniti && index++;
        (index === 3) && (index = 0)
        this.slidesBlock.style.maxHeight = `${this.heightArray[index]}px`;       
    }
}