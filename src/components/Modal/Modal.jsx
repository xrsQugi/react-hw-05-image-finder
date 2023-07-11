import React from 'react';
import styles from './Modal.module.css'

export default function Modal ({ imgSrc, imgTag }) {
  return (
    <div className={styles.Overlay}>
      <img src={imgSrc} alt={imgTag} className={styles.Modal}/>
    </div>
  );
}
