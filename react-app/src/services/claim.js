import genericFetch from './genericFetch';

export const fetchClaim = async (claimId) => {
  const request = {path: `/claims/${claimId}`, errorMsg: 'Failed to load claim content.'}
  return genericFetch({...request});
}

export const createClaim = async (data) => {
  /* Expects data
      {
        assertion,
        notes,
        createdByUserId,
        arguments,       //See further explanation
      }

      The "arguments" should be coming in as an array of paired arrays,
      the pair being the "id" of an existing Argument (or null if needing creation),
      and a "settings" object for the data being set (null if the "id" was provided). So if argument data is new, it should be sending this "settings" object:

          {
            statement: "Blah!",
            argumentNotes: "Blah, blah.",
            supports: 1   // See further explanation
          }

      The "supports" needs to come as a digit 0/1 for false/true so that that wtforms can process it within the array (as apparently Booleans are not supported within a FieldSet). It will be converted to a boolean on DB save.

      So a final example of what an "arguments" array might look like:
      [
          [id, settings], // representative names shown
          [7, None],      // expecting to pull an existing argument
          [None, {"statement": "Blah!", "argumentNotes": "Blah, blah.", "supports": 1}] // setting up a new argument
      ]
  */
  const request = {path: `/claims/create`, errorMsg: 'Failed to create claim.', data, method: 'POST'}
  return genericFetch({...request});
}

export const editClaim = async (claimId, data) => {
  /* Expects data
    Same as createClaim, but fields may be empty
  */
  const request = {path: `/claims/edit/${claimId}`, errorMsg: 'Failed to edit claim.', data, method: 'POST'}
  return genericFetch({...request});
}
