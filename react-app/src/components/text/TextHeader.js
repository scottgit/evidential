import React from 'react';
import Loader from "../includes/Loader";

const TextHeader = ({display, itemData, handleRetry, title, handleTitleInput, contentDisplayed}) => {
  const formName = {
    "VIEW-TEXT": "View",
    "EDIT-TEXT": "Edit",
    "ANALYZE-TEXT": "Analyze"
  }[display.main];


  const headingClass = display.main !== "EDIT-TEXT" ? "" : "ev-heading-input-wrapper";

  const titleText = () => (
      (display.main !== "EDIT-TEXT" && `${itemData.title}`)
      ||
      <div className={headingClass}>
        <input type="text" className="ev-edit-title-input" value={title} onChange={handleTitleInput} required={true} maxLength="200" />
      </div>

  )

  return (
    <header><h1><span className={headingClass}>Text ({formName}):&nbsp;</span>
    {
      ((!itemData || !contentDisplayed) && <> Loading <Loader className="in-text" /></>)
      ||
      (itemData === {} && <><span className="ev-error"> **ERROR!**</span> <button type="button" onClick={handleRetry} className="ev-button in-text">Retry?</button></>)
      ||
      titleText()
    }
    </h1></header>
  )
}

export default TextHeader
