const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


const bodyEl = document.querySelector('body');
const galleryContainer = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const overlay = document.querySelector('.lightbox__overlay');
const modalImg = document.querySelector('.lightbox__image');
const modalBtnClose = document.querySelector('[data-action="close-lightbox"]');


function galleryImgMarkup ({ preview, original, description }) {
  return ` <li class = "gallery__item">
  <a class = "gallery__link" href = ${original}>
  <img class = "gallery__image" src = "${preview}" data-source = "${original}" alt = "${description}" />
  </a>
  </li>`;

};

const pictures = galleryItems.map(galleryImgMarkup).join('');
// console.log(pictures);

galleryContainer.insertAdjacentHTML('afterbegin', pictures);
galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(event) {
  event.preventDefault();
  
  const isGalleryImg = event.target.classList.contains('gallery__image');
  if (!isGalleryImg) {
    return;
  }

  modal.classList.add("is-open");
  bodyEl.classList.add('is-open');//убирает скролл при открытой модалке
  modalImg.src = event.target.dataset.source;
  // console.log(modalImg.src);
  modalImg.alt = event.target.alt;
  // console.log(modalImg.alt);
  
 
};

modalBtnClose.addEventListener("click", modalClose);
overlay.addEventListener('click', modalClose);
window.addEventListener('keydown', modalCloseByEscape);
window.addEventListener('keydown', onLeftRightArrow);


function modalClose(event) {
  modal.classList.remove("is-open");
  bodyEl.classList.remove('is-open');//добавляет скролл при закрытой модалке
  modalImg.src = "";
  modalImg.alt = "";
  };

function modalCloseByEscape(event) {
  if (event.code === "Escape") {
    modalClose();
  }
};

function onLeftRightArrow(event) {
  const isModalOpen = modal.classList.contains("is-open");//проверка открыто ли модальное окно
  if (!isModalOpen) {
    return;
  }
//находим индекс картинки
    let imgIndex = galleryItems.findIndex(img => img.original === modalImg.src);
  
//Пролистывание изображений галереи в открытом модальном окне клавишей "влево".
    if (event.code === 'ArrowLeft') {
        if (imgIndex === 0) {
            imgIndex += galleryItems.length;
        }
        imgIndex -= 1;
    };
//Пролистывание изображений галереи в открытом модальном окне клавишей "вправо".
    if (event.code === 'ArrowRight' ) {
        if (imgIndex === galleryItems.length - 1) {
            imgIndex -= galleryItems.length;
        }
        imgIndex += 1;
    };

    modalImg.src = galleryItems[imgIndex].original;
    modalImg.alt = galleryItems[imgIndex].description;

};





//перелистывание через цикл - но картинки не листаются постоянно, а останавливаются на первой и последней
//   if (event.code === "ArrowRight") {

//     for (let i = 0; i < galleryItems.length; i++) {
//       if (modalImg.src === galleryItems[i].original) {
//         modalImg.src = galleryItems[(i += 1)].original
//       }
//     }
//   }

//     if (event.code === "ArrowLeft") {

//       for (let i = 0; i < galleryItems.length; i++) {
//         if (modalImg.src === galleryItems[i].original) {
//           modalImg.src = galleryItems[(i-=1)].original
//         }
      
//       }
//       }
// };


