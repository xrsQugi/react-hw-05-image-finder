import styles from './Modal.module.css'
import React, { Component } from 'react'

export default class Modal extends Component {
  
  componentDidMount() {
    window.addEventListener('keydown', this.clickEsc);
  }
  componentWillUnmount() {
      window.removeEventListener('keydown', this.clickEsc);
  }

  clickBackdrop = (event) => {
      if (event.target === event.currentTarget) {
          this.props.onClose();
      }
  }

  clickEsc = (event) => {
      if (event.code === 'Escape' || event.code === 'Enter') {
          this.props.onClose();
      }
  }

  render() {
    return (
      <div className={styles.Overlay} onClick={this.clickBackdrop} >
        <img src={this.props.imgSrc} alt={this.props.imgTag} className={styles.Modal}/>
     </div>
    )
  }
}
