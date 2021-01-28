import React from 'react';
import FormTextAreaInputPackage from './FormTextAreaInputPackage';

const AddKeys = ({uniqueId=1, formSetterFn, required=false, placeholder="(Optional) But highly recommended"}) => {

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
          <li>For nouns, use the <strong><em>singular</em></strong> form of the word (plural and possessive will be checked for also)</li>
          <li>Hits are only made for a <strong><em>whole</em></strong> match (e.g. if the hit key is the phrase "hot dog", it would not match "hot" or "dog or "hotdog")</li>
          <li>They <strong><em>are not</em></strong> case sensitive (e.g. bug = Bug = BUG)</li>
          <li>If abbreviations are keywords, <strong>input just the form <em>without</em> periods</strong> (e.g. NASA rather than N.A.S.A.; the program will check for <em>both</em>)</li>
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
