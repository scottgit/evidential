import React from 'react';
import Loader from "../includes/Loader";

const TextHeader = ({display, textObj, handleRetry, isLoaded}) => {
  const formName = {
    "VIEW-TEXT": "View",
    "EDIT-TEXT": "Edit",
    "ANALYZE-TEXT": "Analyze"
  }[display.main];

  return (
    <header><h1>Text ({formName}):
    {
      (!isLoaded && <> Loading <Loader className="in-text" /></>)
      ||
      (isLoaded === -1 && <><span className="ev-error"> **ERROR!**</span> <button type="button" onClick={handleRetry} className="in-text">Retry?</button></>)
      ||
      ` ${textObj.title}`
    }
  </h1></header>
  )
}

export default TextHeader
