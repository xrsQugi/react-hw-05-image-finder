import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {

    state = {
        isVisible: false,
    };
    
    toggleModal = () => {
        this.setState(({ isVisible }) => ({ isVisible: !isVisible }))
    }

    render() {

        const { imageLinkSmall, imageLinkBig, imageTag} = this.props;
        const { isVisible } = this.state;

        return (
            <>
                <li className={style.ImageGalleryItem}>
                    <img src={imageLinkSmall} alt={imageTag} className={style.ImageGalleryItem_image} onClick={this.toggleModal}/>
                </li>
                {isVisible && <Modal imgSrc={imageLinkBig} imgTag={imageTag} onClose={this.toggleModal}/>}
            </>
        )
    }
}

ImageGalleryItem.propTypes = {
    imageLinkSmall: PropTypes.string.isRequired,
    imageLinkBig: PropTypes.string.isRequired,
    imageTag: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
};