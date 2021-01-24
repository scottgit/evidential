import React, { createContext, useContext, useState } from 'react';
import ClaimSection from './groupings/ClaimSection';
import ClaimArgumentsSections from './groupings/ClaimArgumentsSections';
import UIDProvider from '../includes/UIDProvider';

const ClaimFormContext = createContext();

const ADD_CLAIM_FORM = ({currentUser, handleCloseModal}) => {
  const formContext = useContext(ClaimFormContext);
  const [showConfirm, setShowConfrim] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      assertion: formContext.assertion,
      notes: formContext.notes,
      createdByUserId: currentUser.id,
      arguments: [Object.values(formContext.argumentsSet)],
    }
    console.log(data);
  }

  const toggleShowConfirm = (e) => {
    setShowConfrim(!showConfirm);
  }

  const doCancel = (e) => {
    handleCloseModal()
  }

  return (
    <div className="ev-claim-create">
      <form onSubmit={handleSubmit}>
        <h2>
          <button type='submit' className='ev-button --safe'>Submit</button>
          Create Claim
          <div className='ev-claim-cancel'>
            { showConfirm &&
              <div className="ev-claim-cancel-confirm">
                <span className="ev-error">Cancel and lose data?</span>
                <button className="ev-button --warning" type='button' onClick={doCancel}>Yes</button>
                <button className="ev-button --safe" type='button' onClick={toggleShowConfirm}>No</button>
              </div>
            }
            <button type='button' className='ev-button --warning' onClick={toggleShowConfirm}>Cancel</button>
          </div>
          </h2>
          <UIDProvider passToGroup={true}>
            <ClaimSection />
            <ClaimArgumentsSections />
          </UIDProvider>
      </form>
    </div>
  )
}

const AddClaimForm = (props) => {
  return (
    <ClaimFormContext.Provider value={{
      assertion: '',          // Sent to database
      notes: '',              // Sent to database
      argumentsSet: {},       // Modified to array of values and sent to database
    }}>
      <ADD_CLAIM_FORM {...props} />
    </ClaimFormContext.Provider>
  )
}

export {AddClaimForm, ClaimFormContext};
