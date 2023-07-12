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
    
    toggleModal = () => {
        this.setState(({ isVisible }) => ({ isVisible: !isVisible }))
    }

    render() {

        const { imageLinkSmall, imageLinkBig, imageTag, toggleModal } = this.props;
        const { isVisible } = this.state;

        return (
            <>
                <li className={style.ImageGalleryItem}>
                    <img src={imageLinkSmall} alt={imageTag} className={style.ImageGalleryItem_image} onClick={toggleModal}/>
                </li>
                {isVisible && <Modal imgSrc={imageLinkBig} imgTag={imageTag} onClose={toggleModal}/>}
            </>
        )
    }
}
