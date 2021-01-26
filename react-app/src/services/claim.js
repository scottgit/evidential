import genericFetch from './genericFetch';

export const fetchClaim = async (claimId) => {
  const request = {path: `/claims/${claimId}`, errorMsg: 'Failed to load claim content.'}
  return genericFetch({...request});
}

export const createClaim = async (data) => {
  /* Expects data
      The "newArguments" key should go out as an array of objects,
      with statement and argumentNotes being keys.

      The "existingArguments" key should go out as an array of objects
      with an integer being the "id" of an existing Argument

      In both cases, they should have a "supports" value to indicate how the argument
      is to relate to this claim.

      So if argument data is new, newArguments should be sending these objects:

          {
              statement: "Blah!",
              argumentNotes: "Blah, blah.",
              supports: 1   // See further explanation
          }

      If argument data is existing, existingArguments should  be sending these objects:

          {
              id: 7,
              supports: 1
          }

      The "supports" needs to come as a digit 0/1 for false/true so that that wtforms can process it within the array (as apparently Booleans are not supported within a FieldSet). It will be converted to a boolean on DB save.
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
