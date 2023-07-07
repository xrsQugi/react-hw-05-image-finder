import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    request: '',
  };

  handleFormSubmit = request => {
    this.setState({ request });
  };

  render() {
    return <Searchbar onSubmit={this.handleFormSubmit}/>;
  }
}