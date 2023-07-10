import React, { Component } from 'react';

import style from './ImageGallery.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import ImageFetch from './ImageFetch';

export default class Searchbar extends Component {

    state = {
        images: [],
        error: false,
        status: 'idle',
        page: 1,
        totalHits: 0,
      };

      increasePage = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }));
        console.log('this.state.page :>> ', this.state.page);
      }

      componentDidUpdate(prevProps) {
        if (prevProps.request !== this.props.request) {
          //! Оновлюємо інформацію
          this.setState({ page: 1, images: [] });

          //! Оновлюємо статус
          this.setState({status: "pending"});
          this.fetchImages(this.props.request);
        }
      }

      fetchImages = (nextQuery) => {
        const { page } = this.state;

        ImageFetch(nextQuery, page)
          .then(( images ) => {

            // const total = Math.ceil(images.totalHits / 12);
            // if(total < page){
            //   return toast.info('You reached the end of results');
            // }

            if (images.hits.length === 0) {
              //! Якщо нічого не прийшло у відповідь
              toast.error('Sorry, nothing found');
              return Promise.reject(new Error('Sorry, nothing found'))
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
        this.incrementPage();
        this.fetchImages(this.props.request);
        // this.scrollDown();
      }

      render() {
        const {images, error, status} = this.state;
    
        //!----- State machine -----
        //? ("idle")
        //? ("pending")
        //? ("resolved")
        //? ("rejected")
    
        if(status === "pending"){
          return (
            <div className={style.loading_container}>
              <Loader></Loader>
            </div>
          )
        } 
        if(status === "rejected"){
          return (
            <>
              <div className={style.loading_container}>
                <h3 className={style.error_text}>{error.message}</h3>
              </div>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="coloured"
              />
              <ToastContainer />
            </>
          )
        }
        if(status === "resolved"){
          return (
            <>
              <ul className={style.ImageGallery}>
                {images.map(image => (
                    <ImageGalleryItem  key={image.id} imageLinkSmall={image.webformatURL} imgaBig={image.largeImageURL} imageTag={image.tags}/>
                ))}
              </ul>
              {this.state.totalHits > 12 && this.state.totalHits > images.length && (
                <div className={style.loading_container}>
                  <Button onClick={this.loadMore}></Button>
                </div>
              )}
              
            </>
          )
        }
      }
}
