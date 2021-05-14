import styles from './MetadataDisplay.module.css';

const MetadataDisplay = (props) => {
    return (
    <ul className = {styles.displayContainer}>
        <li> <span>Name :</span> {props.name}</li>
        <li> <span>Type :</span> {props.type}</li>
        <li> <span>Size : </span>{props.size}</li>
        <li> <span>Last modified date :</span> {props.lastModifiedDate}</li>
    </ul>
    );
};


export default MetadataDisplay;