import React, { createContext, useContext, useState } from 'react';
import {useHistory} from 'react-router-dom';
import ClaimSection from './groupings/ClaimSection';
import ClaimArgumentsSections from './groupings/ClaimArgumentsSections';
import UIDProvider from '../includes/UIDProvider';
import {createClaim} from '../../services/claim';
import { updateCurrentUserInfo } from '../../services/user';

const ClaimFormContext = createContext();

const ADD_CLAIM_FORM = ({currentUser, setCurrentUser, handleCloseModal}) => {
  const formContext = useContext(ClaimFormContext);
  const [showConfirm, setShowConfrim] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const data = {
      assertion: formContext.assertion,
      claimNotes: formContext.notes,
      createdByUserId: currentUser.id,
      newArguments: Object.values(formContext.argumentsSet),
      existingArguments: [] //TODO implement ability to link existing arguments as well
    }

    try {
      const claim = await createClaim(data);
      if (!claim.errors) {
        handleCloseModal();
        updateCurrentUserInfo(setCurrentUser, currentUser.id);
        setTimeout(() => history.push(`/claim/view/${claim.id}`), 400)
      }
    } catch (err) {
      console.log('errors', formContext)
      setErrors(err.errors)
    }
  }

  const toggleShowConfirm = (e) => {
    setShowConfrim(!showConfirm);
  }

  const doCancel = (e) => {
    handleCloseModal()
  }

  return (
    <div className="ev-claim-create">
      <form id="create-claim" method="POST" onSubmit={handleSubmit}>
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
          { (!!errors.length) &&
            <div className="ev-form-errors">
              {errors.map((error) => (
                <div key={`${error}-${Date.now()}`}>{error}</div>
              ))}
            </div>
          }
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
      pairedArgIds: []
    }}>
      <ADD_CLAIM_FORM {...props} />
    </ClaimFormContext.Provider>
  )
}

export {AddClaimForm, ClaimFormContext};
