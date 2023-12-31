//! Компоненти
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import ImageFetch from './ImageFetch';
//! Стилі
import style from './ImageGallery.module.css';
//! Нотифікашки
import Notiflix from 'notiflix';
//! PropTypes
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    images: [],
    error: false,
    status: 'idle',
    page: 1,
    totalHits: 0,
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.request !== this.props.request) {
      //! Оновлюємо інформацію
      await this.reset();
      //! Оновлюємо статус
      this.setState({ status: 'pending' });
      this.fetchImages(this.props.request);
    }
  }

  fetchImages = nextQuery => {
    const { page } = this.state;

    ImageFetch(nextQuery, page)
      .then(images => {
        if (images.hits.length === 0) {
          //! Якщо нічого не прийшло у відповідь
          Notiflix.Notify.failure('Sorry, nothing found', {
            ID: 'MKA',
            timeout: 2000,
            showOnlyTheLastOne: true,
            clickToClose: true,
          });
          return Promise.reject(new Error('Sorry, nothing found'));
        }

        //! Якщо вдалося щось знайти
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          status: 'resolved',
          totalHits: images.totalHits,
        }));
        this.scrollDown();
      })

      //! Якщо все погано
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  reset = () => {
    this.setState({ page: 1, images: [] });
  };

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  scrollDown = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 0);
  };

  loadMore = async () => {
    await this.incrementPage();
    this.fetchImages(this.props.request);
    this.scrollDown();
  };

  render() {
    const { images, error, status } = this.state;

    if (status === 'pending') {
      return (
        <div className={style.loading_container}>
          <Loader></Loader>
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className={style.loading_container}>
          <h3 className={style.error_text}>{error.message}</h3>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={style.ImageGallery}>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                imageLinkSmall={image.webformatURL}
                imageLinkBig={image.largeImageURL}
                imageTag={image.tags}
              />
            ))}
          </ul>
          {this.state.totalHits > 12 &&
            this.state.totalHits > images.length && (
              <div className={style.loading_container}>
                <Button onClick={this.loadMore}></Button>
              </div>
            )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  key: PropTypes.string,
  imageLinkSmall: PropTypes.string,
  imageLinkBig: PropTypes.string,
  imageTag: PropTypes.string,
  onClick: PropTypes.func,
};