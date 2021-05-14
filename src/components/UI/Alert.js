import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import styles from './Alert.module.css';

const AlertOverlay = (props) => {

    const alertStyles = [styles.alert, styles.success];

    if (props.isError) {
        alertStyles[1] = styles.error;
    }

    return (
    <div className = {alertStyles.join(' ')}>
        {props.children}
        <button className = {styles.dismissButton} onClick = {props.onDismiss}>
            <FontAwesomeIcon icon = { faTimes }/>
        </button>
    </div>);
}

const Alert = (props) => {
    return ReactDOM.createPortal(<AlertOverlay {...props} />, document.getElementById('alert-root'));
}

export default Alert;
