import React, { Component } from 'react';
import style from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export default class Searchbar extends Component {

    state = {
        images: [],
        error: false,
        status: 'idle',
        API_KEY: '30848266-1a3122c07315d6e3a00656f38',
        per_page: 12,
        page: 1
      };

      increasePage = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }));
        console.log('this.state.page :>> ', this.state.page);
      }

      componentDidUpdate(prevProps) {
        if (prevProps.request !== this.props.request) {
          this.setState({status: "pending"})
    
          setTimeout(() => {
            fetch(`https://pixabay.com/api/?key=${this.state.API_KEY}&q=${this.props.request.toLowerCase()}&image_type=image&orientation=horizontal&safesearch=true&per_page=${this.state.per_page}`)
              .then(res => {
                if(res.ok){
                  return res.json();
                }
              })
              .then(images => {
                if(images.hits.length === 0){
                  return (
                    Promise.reject(new Error(`Sorry, there are no images matching your "${this.props.request}" query. Please try again.`))
                  )
                }
                this.setState({
                  images: images.hits,
                  error: false,
                  status: 'resolved',
                });
              })
              .catch(error => this.setState({error, status: "rejected"}))
          }, 1000)
        }
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
            <div className={style.loading_container}>
              <h3 className={style.error_text}>{error.message}</h3>
            </div>
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
              <Button onClick={this.increasePage}></Button>
            </>
          )
        }
      }
}
