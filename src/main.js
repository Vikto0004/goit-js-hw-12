import { returnPromise } from './js/pixabay-api';
import { returnMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const elSearchForm = document.querySelector('.js-search-form');
const elSearchList = document.querySelector('.js-search-list');
const elLoader = document.querySelector('.js-loader');
const elLoaderMore = document.querySelector('.js-loader-more');
const elBtnSearchMore = document.querySelector('.js-search-more');

let page = 1;
let totalPage = 1;
let query = '';

elSearchForm.addEventListener('submit', async event => {
  event.preventDefault();

  query = elSearchForm.elements.enterForSearsh.value.trim();
  if (!query) return;
  if (elBtnSearchMore.classList.contains('is-active')) {
    elBtnSearchMore.classList.remove('is-active');
  }
  elSearchList.innerHTML = '';
  elLoader.classList.add('is-active');
  page = 1;

  try {
    const { data } = await returnPromise(query, page);
    if (!data.total) {
      elLoader.classList.remove('is-active');
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      elSearchForm.reset();
      return;
    }

    elSearchList.innerHTML = `${returnMarkup(data.hits)}`;
    elLoader.classList.remove('is-active');
    elBtnSearchMore.classList.add('is-active');

    if (data.totalHits < 15) {
      elBtnSearchMore.classList.remove('is-active');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
});

elBtnSearchMore.addEventListener('click', async () => {
  elLoaderMore.classList.add('is-active-more');
  elBtnSearchMore.classList.remove('is-active');

  try {
    const { data } = await returnPromise(query, ++page);
    elSearchList.insertAdjacentHTML('beforeend', `${returnMarkup(data.hits)}`);

    elLoaderMore.classList.remove('is-active-more');
    elBtnSearchMore.classList.add('is-active');
    lightbox.refresh();

    window.scrollBy({
      top: elSearchList.firstChild.getBoundingClientRect().height * 2,
      behavior: 'smooth',
    });

    totalPage = Math.ceil(data.totalHits / 15);
    if (totalPage === page) {
      elBtnSearchMore.classList.remove('is-active');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});
