import React from 'react';
import Loader from "../includes/Loader";

const PageHeader = ({display, itemData, handleRetry, title, handleTitleInput, contentDisplayed}) => {
  const formName = {
    "VIEW-TEXT": "View",
    "EDIT-TEXT": "Edit",
    "ANALYZE-TEXT": "Analyze",
    "VIEW-CLAIM": "View"
  }[display.main];

  const titleLabel = display.main.substring(display.main.indexOf('-')+1);
  const pageName = `${titleLabel.toLowerCase().replace(/\b[a-z]/g, char => char.toUpperCase())}`

  const headingClass = display.main !== "EDIT-TEXT" ? "" : "ev-heading-input-wrapper";

  const titleText = () => (
      (display.main !== "EDIT-TEXT" && `${itemData.title ? ': '+itemData.title : ''}`)
      ||
      (display.main === "EDIT-TEXT" &&
      <div className={headingClass}>
        <input type="text" className="ev-edit-title-input" value={title} onChange={handleTitleInput} required={true} maxLength="200" />
      </div>
      )
  )


  return (
    <header>
      <h1>
        <span className={headingClass}>{pageName} ({formName})
        {display.main === "EDIT-TEXT" ? <>:&nbsp;</> : ''}
      </span>
      {
        ((!contentDisplayed) && <> &nbsp;Loading <Loader className="in-text" /></>)
        ||
        (!itemData && <><span className="ev-error">&nbsp;**ERROR!**</span> <button type="button" onClick={handleRetry} className="ev-button in-text">Retry?</button></>)
        ||
        titleText()
      }
      </h1>
    </header>
  )
}

export default PageHeader
