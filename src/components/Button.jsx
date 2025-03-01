/* eslint-disable react/prop-types */
import styles from "./Button.module.css";




function Button({ children, type, onClickEvent }) {
  return (
    <button
      onClick={onClickEvent}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
