import React from 'react';
import FormTextAreaInputPackage from './FormTextAreaInputPackage';

const AddArgumentStatementFields = ({uniqueId, setArgListData, fixedSupport}) => {
  return (
    <FormTextAreaInputPackage
      fieldType="Argument Statement"
      uniqueId={uniqueId}
      formSetterFn={setArgListData}
      settings={
        {
          fixedSupport,
          label: 'Statement',
          explanation: `The argument's statement should be a sentence that succinctly conveys either a supporting reason to believe the claim is true and valid, or a rebuttal as to why the claim is erroneous or invalid. Statements should focus on a single aspect of support or rebuttal for a claim.`,
          maxLength: 250,
          placeholder: "(Required)",
          required: true,
          rows: 4
        }
    }/>
  )
}

export default AddArgumentStatementFields
