import React, {useCallback} from 'react';

import styles from './DropZone.module.css';
import {useDropzone} from 'react-dropzone';


const DropZone = (props) => {

    const {onSetMetadata} = props;
    
    const onDrop = useCallback((acceptedFiles) => {
        const data = acceptedFiles[0];
        let modifiedData = null;

        if (data) {

            modifiedData =  {
                name : data.name,
                size : data.size,
                lastModifiedDate : data.lastModifiedDate.toString(),
                type : data.type
            }     

        }

        onSetMetadata(modifiedData);

    }, []);

    const {getRootProps, getInputProps} = useDropzone({onDrop, maxFiles : 1});

    return (
        <div {...getRootProps()} className = {styles.DropZone}>
            <input {...getInputProps()} />
            <p>Drag 'n' Drop or select your file to enable the buttons</p>
        </div>
    );

}

export default DropZone;