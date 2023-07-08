import React, { Component } from 'react';
import style from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ThreeDots } from  'react-loader-spinner'

export default class Searchbar extends Component {

    state = {
        images: [],
        error: false,
        status: 'idle',
        API_KEY: '30848266-1a3122c07315d6e3a00656f38',
        per_page: 12,
        page: 1
      };


      componentDidUpdate(prevProps) {
        if (prevProps.request !== this.props.request) {
          this.setState({status: "pending"})
    
          setTimeout(() => {
            fetch(`https://pixabay.com/api/?key=${this.state.API_KEY}&q=${this.props.request.toLowerCase()}&image_type=image&orientation=horizontal&safesearch=true&per_page=${this.state.per_page}`)
              .then(res => {
                if(res.ok){
                  return res.json();
                } else{
                  return Promise.reject(new Error('Sorry, there are no images matching your search query. Please try again.'));
                }
              })
              .then(images => {
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
                <ThreeDots 
                    height="80" 
                    width="80" 
                    radius="9"
                    color="#3f51b5" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            </div>
          )
        } 
        if(status === "rejected"){
          return <h3 className={style.error_text}>{error.message}</h3>
        }
        if(status === "resolved"){
          return (
            <ul className={style.ImageGallery}>
                {images.map(image => (
                    <ImageGalleryItem  key={image.id} imageLinkSmall={image.webformatURL} imgaBig={image.largeImageURL} imageTag={image.tags}/>
                ))}
            </ul>
          )
        }
      }
}
