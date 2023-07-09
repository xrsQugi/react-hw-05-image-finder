import style from './Button.module.css';

export default function Button({onClick}) {
    return (
        <button type="button" onClick={onClick} className={style.Button}>
            Load more
        </button>
    )
}