import itemsDefault from './gallery-items.js';

// 1

const refs = {
  galleryList: document.querySelector('.js-gallery'), //общий родитель картинок
  modal: document.querySelector('.js-lightbox'), //модальное окно
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'), //кнопка закрытия модального окна
  modalImage: document.querySelector('.lightbox__image'),
  modalOverlay: document.querySelector('.lightbox__overlay'), //серый фон в модалке
};

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const galleryMarkup = createGalleryMarkup(itemsDefault);
refs.galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(elements) {
  return elements
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

refs.galleryList.addEventListener('click', onOpenModal);

function onOpenModal(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  evt.preventDefault(); //отмена перехода по ссылке

  refs.modal.classList.add('is-open'); // Открытие модального окна по клику на элементе галереи.
  refs.modalImage.src = evt.target.dataset.source; // Подмена значения атрибута src элемента img.lightbox__image.
  refs.modalImage.alt = evt.target.alt;

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowLeftPress);
  window.addEventListener('keydown', onArrowRightPress);
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
refs.modalCloseBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.modal.classList.remove('is-open');
  refs.modalImage.src = ''; // Очистка значения атрибута src элемента img.lightbox__image.
  refs.modalImage.alt = '';
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowLeftPress);
  window.removeEventListener('keydown', onArrowRightPress);
}



