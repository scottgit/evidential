import React from 'react';
import FormTextAreaInputPackage from './FormTextAreaInputPackage';

const AddKeys = ({uniqueId=1, formSetterFn, required, placeholder="(Optional) But highly recommended"}) => {

  return (
    <FormTextAreaInputPackage
    key={`HitKeys-${uniqueId}`}
    fieldType='Hit Keys'
    uniqueId={uniqueId}
    formSetterFn={formSetterFn}
    settings={
      {
        label: 'Hit Keys',
        explanation: <div className="ev-nested-explanation">When defining Hit Keys, keep the following in mind:
        <ul>
          <li>Use single words or short (approx. two to four word) phrases that are commonly used when discussing the claim</li>
          <li>Hits are only made for a <em>whole</em> match (e.g. if the hit key is the phrase "hot dog", it would not match "hot" or "dog or "hotdog")</li>
          <li>They <strong>are not</strong> case sensitive (e.g. bug = Bug = BUG)</li>
          <li>If abbreviations are keywords, <strong>input just the form <em>with</em> periods</strong> (e.g. N.A.S.A. rather than NASA; the program will check for <em>both</em>)</li>
          <li>Enter the hit keys in a <strong><em>comma separated</em></strong> format between keys (e.g. University of Oregon, football, Ducks), which also means avoid commas in hit keys.</li>
        </ul>
        </div>,
        maxLength: 200,
        placeholder: "(Optional) But highly recommended",
        required,
        rows: 2
      }
    }/>
  )
}

export default AddKeys
