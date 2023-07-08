import React from 'react';
import style from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({imageLinkSmall, imageLinkBig, imageTag}) {
    return(
        <li className={style.ImageGalleryItem}>
            <img src={imageLinkSmall} alt={imageTag} className={style.ImageGalleryItem_image}/>
        </li>
    )
}