// import React from 'react';
import style from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

// export default function ImageGalleryItem({imageLinkSmall, imageLinkBig, imageTag}) {
//     return(
//         <li className={style.ImageGalleryItem}>
//             <img src={imageLinkSmall} alt={imageTag} className={style.ImageGalleryItem_image}/>
//         </li>
//     )
// }
import React, { Component } from 'react';

export default class ImageGalleryItem extends Component {

    state = {
        isVisible: false,
    };
    
    componentDidMount = () => {
        window.addEventListener('keydown', this.CloseModal)
    }
    
    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.CloseModal)
    }
    
    OpenModal = () => {
        this.setState({ isVisible: true });
    };
    
    CloseModal = (e) => {
        if (e.code === 'Escape'){
          this.setState({ isVisible: false });
        } else if (e.code === 'Enter'){
            this.setState({ isVisible: false });
        }
    };


    render() {

        const { imageLinkSmall, imageLinkBig, imageTag } = this.props;
        const { isVisible } = this.state;

        return (
            <>
                <li className={style.ImageGalleryItem}>
                    <img src={imageLinkSmall} alt={imageTag} className={style.ImageGalleryItem_image} onClick={this.OpenModal}/>
                </li>
                {isVisible && <Modal imgSrc = {imageLinkBig} imgTag={imageTag}/>}
            </>
        )
    }
}
