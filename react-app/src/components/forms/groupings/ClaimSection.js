import React, {useContext} from 'react';
import FormTextAreaInputPackage from '../fields/FormTextAreaInputPackage';
import {ClaimFormContext} from '../AddClaimForm';


const ClaimSection = ({uniqueIdRef}) => {
  const formContext = useContext(ClaimFormContext);

  const claimId = 'claimId' in formContext ? formContext.claimId : (formContext['claimId'] = ++uniqueIdRef.current);

  const setClaimAssertion = (data) => {formContext.assertion = data}
  const AddClaimAssertionComponent = (uniqueId = claimId) => (
    <FormTextAreaInputPackage
    key={`Assertion-${uniqueId}`}
    fieldType='Assertion'
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
  const setClaimNotes = (data) => {formContext.notes = data}
  const AddClaimNotesComponent = (uniqueId = claimId) => (
    <FormTextAreaInputPackage
    key={`ClaimNotes-${uniqueId}`}
    fieldType='Claim Notes'
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
      <h3>Claim Settings</h3>
      <div className="ev-claim-settings">
        {AddClaimAssertionComponent()}
        {AddClaimNotesComponent()}
      </div>
    </section>
  )
}

export default ClaimSection
