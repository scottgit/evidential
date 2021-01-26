import React from 'react'

const AddKeysForm = (claim) => {
  return (
    <form id="ev-add-keys">
      <label>
        Add Hit Keys for claim:
        <p className="ev-info">{claim.assertion}</p>
        <div className="ev-instructions">When defining Hit Keys, keep the following in mind:
        <ul>
          <li>Use single words or short (approx. two to four word) phrases that are commonly used when discussing the claim</li>
          <li>Hits are only made for a <em>whole</em> match (e.g. if the hit key is the phrase "hot dog",)</li>
          <li>They <strong>are not</strong> case sensitive (e.g. bug = Bug = BUG)</li>
          <li>If abbreviations are keywords, <strong>input just the form <em>with</em> periods</strong> (e.g. N.A.S.A. rather than NASA; the program will check for <em>both</em>)</li>
          <li>Entered in a comma separated format between keys (e.g. New York, Mets, )</li>
        </ul>
        </div>

      </label>
    </form>
  )
}

export default AddKeysForm
