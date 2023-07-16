import style from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({onClick}) {
    return (
        <button type="button" onClick={onClick} className={style.Button}>
            Load more
        </button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
};