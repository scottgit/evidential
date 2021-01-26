import React from 'react'

const FormHeader = ({headerTitle, errors, doCancel, showConfirm, toggleShowConfirm}) => {
  return (
    <>
      <h2 className="ev-form-header">
      <button type='submit' className='ev-button --safe'>Submit</button>
      {headerTitle}
      <div className='ev-form-cancel'>
        { showConfirm &&
          <div className="ev-form-cancel-confirm">
            <span className="ev-error">Cancel and lose data?</span>
            <button className="ev-button --warning" type='button' onClick={doCancel}>Yes</button>
            <button className="ev-button --safe" type='button' onClick={toggleShowConfirm}>No</button>
          </div>
        }
        <button type='button' className='ev-button --warning' onClick={toggleShowConfirm}>Cancel</button>
      </div>
    </h2>
    { (!!errors.length) &&
      <div className="ev-form-errors">
        {errors.map((error) => (
          <div key={`${error}-${Date.now()}`}>{error}</div>
        ))}
      </div>
    }
  </>
  )
}

export default FormHeader
