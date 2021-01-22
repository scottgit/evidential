import React from 'react';
import FormTextAreaInputPackage from '../fields/FormTextAreaInputPackage';


const ClaimSection = ({uniqueIdRef, setClaimAssertion, setClaimNotes}) => {

  const AddClaimAssertionComponent = (uniqueId = ++uniqueIdRef.current) => (
    <FormTextAreaInputPackage
    uniqueId={uniqueId}
    formSetterFn={setClaimAssertion}
    settings={
      {
        label: 'Assertion',
        explanation: 'The assertion should be a concise sentence, singularly focused (use multiple claims if a text makes more than one), stating what is being put forward as true, but open to challenge (i.e. there should at least be two sides to an assertion).',
        maxLength: 200,
        placeholder: "(Required) What's being claimed now...",
        required: true
      }
    }/>
  )

  const AddClaimNotesComponent = (uniqueId = ++uniqueIdRef.current) => (
    <FormTextAreaInputPackage
    uniqueId={uniqueId}
    formSetterFn={setClaimNotes}
    settings={
      {
        label: 'Notes',
        explanation: `The assertion's notes allow some optional space to add a few details relevant to the claim's assertion. History behind the claim; importance in a field of study, etc.`,
        maxLength: 1000,
        placeholder: "(Optional)",
        rows: 6
      }
    }/>
  )

  return (
    <section >
      <h3>Claim Info</h3>
      <div className="ev-claim-info">
        {AddClaimAssertionComponent()}
        {AddClaimNotesComponent()}
      </div>
    </section>
  )
}

export default ClaimSection
