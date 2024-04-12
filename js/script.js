'use strict'
const navigation = document.querySelector('.navigation');
//Добавим прослушку на панель навигации
navigation.addEventListener("click", function(event){
  //Отменяем действия браузера по умолчанию
  event.preventDefault();
  //Отслеживаем клики на кнопках навигации
  const btnMain = event.target.closest('.btn-main');
  const btnServices = event.target.closest('.btn-services');
  const btnOurWorks = event.target.closest('.btn-ourWorks');

  if(btnMain) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    //document.querySelector('main').scrollIntoView({behavior: "smooth"});
  }

  if(btnServices) {
    document.querySelector('.section__do').scrollIntoView({behavior: "smooth"});
  }

  if(btnOurWorks) {
    document.querySelector('.section__work').scrollIntoView({behavior: "smooth"});
  }
  
});





//Добавим прослушку на панель меню footer
document.querySelector('.footer-menu').addEventListener("click", function(event){
  //сохраним в константу массив элементов(кнопок) меню footer
  const btnsFooter = Array.from(document.querySelector('.footer-menu').children);

  //сохраним в константу массив элементов(блоков) footer
  const blockFooter = Array.from(document.querySelector('.footer-description').children);

  //Отслеживаем клики на кнопках меню
  const btnAbout = event.target.closest('.footer-menu__about');
  const btnWhy = event.target.closest('.footer-menu__why');
  const btnContacts = event.target.closest('.footer-menu__contacts');

  if(btnAbout || btnWhy || btnContacts) {

  //удалим класс 'footer-menu__activ' (удаляем во всех кнопках, хотя по факту он есть только у одной)
  btnsFooter.forEach(item => item.classList.remove('footer-menu__activ'));

  //удалим класс 'footer-description__activ' (удаляем во всех блоках, хотя по факту он есть только у одного)
  blockFooter.forEach(item => item.classList.remove('footer-description__activ'));

  }


  if(btnAbout) {
    //Добавим класс 'footer-menu__activ' кнопке и класс 'footer-description__activ' блоку
    btnAbout.classList.add('footer-menu__activ');
    blockFooter[0].classList.add('footer-description__activ');
  }

  if(btnWhy) {
    //Добавим класс 'footer-menu__activ' кнопке и класс 'footer-description__activ' блоку
    btnWhy.classList.add('footer-menu__activ');
    blockFooter[1].classList.add('footer-description__activ');
  }

  if(btnContacts) {
    //Добавим класс 'footer-menu__activ' кнопке и класс 'footer-description__activ' блоку
    btnContacts.classList.add('footer-menu__activ');
    blockFooter[2].classList.add('footer-description__activ');
  }

});




//Анимация потускнения ссылок при наведении
//Добавим прослушки(наведение курсора мыши и выход курсора мыши) на панель навигации,
//но перед этим напишем функцию

function fadeOnHover(opacity) {
    if(event.target.classList.contains('link-nav')){
    const allLinks = event.target.closest('.navigation').querySelectorAll('li');
    allLinks.forEach(item => {
      if(item != event.target.parentElement) item.style.opacity = opacity;
    });
  }
}

navigation.addEventListener("mouseover", function(event){
  fadeOnHover(0.4);
});

navigation.addEventListener("mouseout", function(event){
  fadeOnHover(1);
});




/*
//Добавление навигации при прокрутке
window.addEventListener("scroll", function(event){
  if(document.querySelector('.section__do').getBoundingClientRect().top < window.scrollY) {
    navigation.parentElement.classList.add('sticky');
    document.querySelector('.navWhenSticky').style.display = "block";
  }
  if(document.querySelector('.section__do').getBoundingClientRect().top > window.scrollY) {
    navigation.parentElement.classList.remove('sticky');
    document.querySelector('.navWhenSticky').removeAttribute('style');
  }
});
*/


//Добавление навигации при прокрутке используя Intersection Observer API:
// Создадим объект с настройками:
const optionsNavigation = {
  root: null,
  threshold: 0.2,
};
// Создаём callback функцию:
const callbackNavigation = function (entries, observer) {
  entries.forEach( entry => {
    //console.log(entry);
    if(!entry.isIntersecting) {
      navigation.parentElement.classList.add('sticky');
      document.querySelector('.navWhenSticky').style.display = "block";
    }
    if(entry.isIntersecting) {
      navigation.parentElement.classList.remove('sticky');
      document.querySelector('.navWhenSticky').removeAttribute('style');
    }
  });
};
//Создаём объект-наблюдатель
const observerNavigation = new IntersectionObserver(callbackNavigation, optionsNavigation);
//Вызываем метод observe, только что созданного объекта-наблюдателя
observerNavigation.observe(document.querySelector('main'));



//ПОЯВЛЕНИЕ ЧАСТЕЙ САЙТА:

//Получим NodeList (коллекцию) частей сайта, которым мы добавим класс "section-hidden" и которые после, при прокрутке будут появляться
const allSection = document.querySelectorAll('section');

const optionsAppearentceSection = {
  root: null,
  threshold: 0.15,
};

const callbackAppearentceSection = function (entries, observer) {
  entries.forEach(entry => {
    //console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.remove('section-hidden');
      observer.unobserve(entry.target);
    }
  });
};

const observerAppearentceSection = new IntersectionObserver(callbackAppearentceSection, optionsAppearentceSection);

allSection.forEach(function(item) {
  item.classList.add('section-hidden');
  item.classList.add('section-animation');
  observerAppearentceSection.observe(item);
});



//Замена изображений на изображения с высоким разрешением:

// 1. Когда браузер загрузит HTML и внешние ресурсы(картинки, стили) - Поменяем фоновые изображения блоков main и footer на высококачественное:
window.addEventListener("load", function() {
  document.querySelector('main').style.background = "url('image/flat-main.jpg') 0 0 / cover no-repeat";
  document.querySelector('footer').style.background = "url('image/flat-footer.jpg') 0 0 / cover no-repeat";
});

// 2. Теперь будем менять изображения блока section__do на более высококачественные,
// но только после того, как они будут появляться во viewport на 90% (размытие картинок ещё не убираем):

//Получаем коллекцию элементов с картинками (элементы img с атрибутом data-src):
const pictures = document.querySelectorAll('img[data-src]');

//Создадим объект с настройками для Intersection Observer API:
const optionsReplacingPictures = {
  root: null,
  threshold: 0.9,
  rootMargin: "0px 0px -50px 0px"
};

//Создадим callback функцию
// в начале функции entries.forEach потому что entries - это массив threshold(даже если там одно число, то это число в массиве [0.5]) из объекта options
const callbackReplacingPictures = function(entries, observer) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return; //это пункт охраны, если isIntersecting false, то выходим из функции
    //console.log(entry.target.src);
    entry.target.src = entry.target.dataset.src;
    //console.log(entry.target.src);
    //Теперь установим слушатель событий, который будет срабатывать после загрузки картинки с высоким разрешением:
    entry.target.addEventListener("load", function(event){
      //console.log(event.target);
      //console.log(entry.target);
      event.target.classList.remove('lasy-image'); //удаляем размытие.
    });
    //Снимаем наблюдениуе с элемента, после того как поменяли картинку:
    observer.unobserve(entry.target);
  });
};

//Создаём объект-наблюдатель:
const observerReplacingPictures = new IntersectionObserver(callbackReplacingPictures, optionsReplacingPictures);

//Вызываем метод observe для каждой картинки
pictures.forEach(picture => {
  observerReplacingPictures.observe(picture);
});


//Створення точок для слайдера

document.querySelectorAll('.work').forEach(function(item, index){
  document.querySelector('.dots').insertAdjacentHTML('beforeend',`<button class="dot dot-${index+1}" data-slide="${index}"></button>`);
});


//  СТВОРЕННЯ СЛАЙДЕРА
const leftArroy = document.querySelector('.btn-arroyLeft');
const rightArroy = document.querySelector('.btn-arroyRight');

let slidePosition = 0;
let currentDot = 1;

document.querySelector(`.dot-${currentDot}`).classList.add('activ-dot');

const moveRight = function() {
  if (slidePosition == -500) return;
  document.querySelectorAll('.work').forEach(item => item.style.transform = `translateX(${slidePosition - 100}%)`);
  slidePosition -= 100;

  currentDot++;
  document.querySelectorAll('.dot').forEach(item => item.classList.remove('activ-dot'));
  document.querySelector(`.dot-${currentDot}`).classList.add('activ-dot');
}

const moveLeft = function() {
  if (slidePosition == 0) return;
  document.querySelectorAll('.work').forEach(item => item.style.transform = `translateX(${slidePosition + 100}%)`);
  slidePosition +=100;

  currentDot--;
  document.querySelectorAll('.dot').forEach(item => item.classList.remove('activ-dot'));
  document.querySelector(`.dot-${currentDot}`).classList.add('activ-dot');
}

rightArroy.addEventListener("click", moveRight);
leftArroy.addEventListener("click", moveLeft);
document.addEventListener("keydown", function(event){
  if (event.key == "ArrowLeft") moveLeft();
  if (event.key == "ArrowRight") moveRight();
});

document.querySelector('.dots').addEventListener("click", function(event) {
  if(event.target.classList.contains('dot')) {
    let n = (slidePosition - (event.target.dataset.slide * -100)) / 100;

    if (n > 0) {
      for(let i=0; i<n; i++) {
        moveRight();
      }
    }

    if (n < 0) {
      for(let i=0; i>n; i--) {
        moveLeft();
      }
    }

  }
})


