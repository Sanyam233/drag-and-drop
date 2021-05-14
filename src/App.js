import { useState, useReducer, useEffect } from 'react';

import styles from './App.module.css';
import DropZone from './components/DropZone/DropZone';
import MetadataDisplay from './components/MetadataDisplay/MetadataDisplay';
import Alert from './components/UI/Alert';

const initialState = { isAdded : false, isRemoved : false, error : false };

const alertReducer = (state = initialState, action) => {

  switch (action.type) {
    case ('ADDED') : return { isAdded : true, isRemoved : false, error : false };
    case ('REMOVED') : return { isAdded : false, isRemoved : true, error : false };
    case ('RESET') : return { isAdded : false, isRemoved : false, error : false };
    case ('ERROR') : return { isAdded : false, isRemoved : false, error : true };
    default : return initialState;
  }

}

function App() {

  //manages metadata state
  const [metadata, setMetadata] = useState({});

  //manages metadata display state
  const [isMetaVisible, setIsMetaVisible] = useState(false);

  //manages alert state using a reducer
  const [alert, dispatchAlert] = useReducer(alertReducer, initialState);

  //manages disabling of the showMetadata button
  const isDisabled = Object.keys(metadata).length === 0;

  //sets metadata 
  const MetadataHandler = (data) => {

    if (data) {
      setMetadata(data);
      dispatchAlert({ type : 'ADDED'});
    } else {
      setMetadata({});
      dispatchAlert({ type : 'ERROR' });
      setIsMetaVisible(false);
    }


  }

  //toggles metadata display
  const visibilityToggler = () => {
    setIsMetaVisible((prevState) => !prevState);
  }

  //clears the metadata state
  const clearMetadata = () => {
    setMetadata({});
    setIsMetaVisible(false);
    dispatchAlert({ type : 'REMOVED'});
  }

  const dismissAlert = () => {
    dispatchAlert({ type : 'RESET' });
  }

  let alertText = 'File has been successfully uploaded';

  if (alert.isRemoved) {
    alertText = 'File has been successfully removed';
  }

  if (alert.error) {
    alertText = 'Upload one file at a time';
  }

  const alertDisplay = alert.isAdded || alert.isRemoved || alert.error;

  return (
    <div className = {styles.App}>
      {
      alertDisplay && 
      <Alert onDismiss = {dismissAlert} isError = {alert.error} >
        {alertText}
      </Alert>
      }
      <DropZone onSetMetadata = {MetadataHandler} />
      <button 
      disabled = {isDisabled} 
      className = {styles.showButton} 
      onClick = {visibilityToggler}>
        Show Metadata
      </button>
      <button 
      disabled = {isDisabled} 
      className = {styles.showButton} 
      onClick = {clearMetadata}>
        Clear File
      </button>
      {isMetaVisible && <MetadataDisplay {...metadata} />}
    </div>
  );
}

export default App;
