import React, {useState} from 'react';
import ClaimSection from './groupings/ClaimSection';
import ClaimArgumentsSections from './groupings/ClaimArgumentsSections';
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
            <ClaimArgumentsSections argStatements={argStatements} setArgStatements={setArgStatements}/>
          </UIDProvider>
      </form>
    </div>
  )
}

export default AddClaimForm
