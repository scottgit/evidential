import React, { createContext, useContext } from 'react';
import ClaimSection from './groupings/ClaimSection';
import ClaimArgumentsSections from './groupings/ClaimArgumentsSections';
import UIDProvider from '../includes/UIDProvider';

const ClaimFormContext = createContext();

const ___AddClaimForm = ({currentUser}) => {

  const formContext = useContext(ClaimFormContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      assertion: formContext.assertion,
      notes: formContext.notes,
      createdByUserId: currentUser.id,
      arguments: [Object.values(formContext.argumentsSet)],
    }
    console.log('submit', data)
  }

  // const memoFn = useMemo(() => _setArgumentsData, [_setArgumentsData])
  // console.log(argumentsData);
  // const setArgumentsData = useCallback((data) => memoFn(data), [memoFn])


  return (
    <div className="ev-claim-create">
      <form onSubmit={handleSubmit}>
        <h2>Create Claim <button type='submit'>Submit</button></h2>
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
      balanced: [null, null], // Only used for frontend check
    }}>
      <___AddClaimForm {...props} />
    </ClaimFormContext.Provider>
  )
}

export {AddClaimForm, ClaimFormContext};
