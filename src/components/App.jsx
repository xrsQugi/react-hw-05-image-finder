import React, { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';


export class App extends Component {
  state = {
    request: '',
  };

  //! Get value from form input 
  handleFormSubmit = request => {
    this.setState({ request });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery request={this.state.request} />
      </>
    );
  }
}