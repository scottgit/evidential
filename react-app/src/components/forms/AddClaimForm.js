import React, {useState} from 'react';
import ClaimSection from './groupings/ClaimSection';
import RequiredArgumentSection from './groupings/ClaimRequiredArgumentsSection';
import UIDProvider from '../includes/UIDProvider';

const AddClaimForm = () => {
  const [claimAssertion, setClaimAssertion] = useState('');
  const [claimNotes, setClaimNotes] = useState('');
  const [argStatements, setArgStatements] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

  }





  return (
    <div className="ev-claim-create">
      <form onSubmit={handleSubmit}>
        <h2>Create Claim</h2>
          <UIDProvider passToGroup={true}>
            <ClaimSection setClaimAssertion={setClaimAssertion} setClaimNotes={setClaimNotes}/>
            <RequiredArgumentSection argStatements={argStatements} setArgStatements={setArgStatements}/>
          </UIDProvider>
      </form>
    </div>
  )
}

export default AddClaimForm
