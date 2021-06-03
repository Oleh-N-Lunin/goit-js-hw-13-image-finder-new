import refs from './refs';
import template from '../templates/template.hbs';

const updateMarkup = images => {
  let markup = template(images);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
};
export default updateMarkup;