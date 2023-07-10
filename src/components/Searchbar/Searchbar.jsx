import React, { Component } from 'react';
import style from './Searchbar.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        if (this.state.request.trim() === '') {
            return toast.error('Please, enter search query.');
        }
        
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
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="coloured"
                    />
                    <ToastContainer />
                </form>
            </header>
        )
    }
}
