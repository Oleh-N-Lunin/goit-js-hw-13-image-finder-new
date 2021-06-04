import markup from './markup';
import apiService from './apiService';
import refs from './refs';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const KEY = '21886908-2dadc690508cf849d5de61581';

let inputValue = '';
let page = 1;

refs.loader.style.display = 'none';

export const getImages = e => {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  inputValue = e.target.elements.query.value;
  if (inputValue.length) {
    apiService(inputValue, page, KEY)
      .then(images => {
        images.length
          ? (refs.loader.style.display = 'block')
          : (refs.loader.style.display = 'none');
          markup(images);
      })
      .catch(error => console.log(error));
  }
};

export const moreImages = () => {
  page += 1;
  apiService(inputValue, page, KEY)
    .then(images => {
      markup(images);
      refs.loader.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    })
    .catch(error => console.log(error));
};

export default function onOpenModal(event) {

  if (event.target.nodeName !== 'IMG') {
      return;
  }
  const instance = basicLightbox.create(`<img src="${event.target.dataset.src}" alt="" />`);
  instance.show();
}

refs.gallery.addEventListener('click', onOpenModal);
refs.form.addEventListener('submit', getImages);
refs.loader.addEventListener('click', moreImages);