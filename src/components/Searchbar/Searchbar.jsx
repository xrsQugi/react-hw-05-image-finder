import React, { Component } from 'react';
import style from './Searchbar.module.css'

export default class Searchbar extends Component {

    state = {
        request: '',
    }

    inputChange = (event) => {
        this.setState({
          request: event.target.value,
        });
      };

    formSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.request);
        this.setState({ request: '' });
      };

    render() {
        return (
            <header className={style.Searchbar}>
                <form className={style.SearchForm} onSubmit={this.formSubmit}>
                    <button type="submit" className={style.SearchForm_button}>
                        <span className={style.SearchForm_button_label}>Search</span>
                    </button>
                    <input
                        className={style.SearchForm_input}
                        type="text"
                        autoComplete="off"
                        onChange={this.inputChange}
                        value={this.state.request}
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}
