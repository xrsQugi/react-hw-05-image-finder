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
        page: 1
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
          .then(({ hits }) => {
            if (hits.length === 0) {
              //! Якщо нічого не прийшло у відповідь
              toast.error('Sorry, nothing found');
              return Promise.reject(new Error('Sorry, nothing found'))
            }
            
            //! Якщо вдалося щось знайти
            this.setState(prevState => ({
              images: [...prevState.images, ...hits],
              status: 'resolved',
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
        await this.incrementPage();
        this.fetchImages(this.props.request);
        await this.scrollDown();
      }
    
      // setTimeout(() => {
      //   fetch(`https://pixabay.com/api/?key=${this.state.API_KEY}&q=${this.props.request.toLowerCase()}&image_type=image&orientation=horizontal&safesearch=true&per_page=200`)
      //     .then(res => {
      //       if(res.ok){
      //         return res.json();
      //       }
      //     })
      //     .then(images => {
      //       if(images.hits.length === 0){
      //         return (
      //           Promise.reject(new Error(`Sorry, there are no images matching your "${this.props.request}" query. Please try again.`))
      //         )
      //       }
      //       this.setState(prevState => ({
      //         images: [...prevState.images, ...images.hits],
      //         error: false,
      //         status: 'resolved',
      //       }));
      //     })
      //     .catch(error => this.setState({error, status: "rejected"}))
      // }, 1000)

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
              <div className={style.loading_container}>
                <Button onClick={this.loadMore}></Button>
              </div>
            </>
          )
        }
      }
}
