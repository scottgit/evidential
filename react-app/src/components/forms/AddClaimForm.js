import React, { createContext, useContext, useState } from 'react';
import ClaimSection from './groupings/ClaimSection';
import ClaimArgumentsSections from './groupings/ClaimArgumentsSections';
import UIDProvider from '../includes/UIDProvider';
import {createClaim} from '../../services/claim';

const ClaimFormContext = createContext();

const ADD_CLAIM_FORM = ({currentUser, handleCloseModal}) => {
  const formContext = useContext(ClaimFormContext);
  const [showConfirm, setShowConfrim] = useState(false);
  const [errors, setErrors] = useState([]);
  formContext.errors = errors;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    // const fullForm = document.getElementById('create-claim');
    // console.log(fullForm)
    // let test = {'statement-0': [{statement: ["Test"], argumentNotes: [""], supports: [1]}], 'statement-1': [{statement: ["Test"], argumentNotes: [""], supports: [0]}] }
    // let formData = new FormData()
    // formData.append('assertion', formContext.assertion)
    // formData.append('claimNotes', formContext.notes)
    // formData.append('createdByUserId', currentUser.id)
    // formData.append('arguments', Object.values(formContext.argumentsSet))

    const data = {
      assertion: formContext.assertion,
      claimNotes: formContext.notes,
      createdByUserId: currentUser.id,
      arguments: Object.values(formContext.argumentsSet),
      // arguments: formContext.argumentsSet,
    }
    console.log(data)

    try {
      const res = await createClaim(data);
      if (res.errors) {
        throw res;
      }
      // TODO redirect to NEWLY created Claim
      console.log(res);
      alert('submitted');
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
