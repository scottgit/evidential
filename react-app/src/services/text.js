import genericFetch from './genericFetch';

export const fetchText = async (textId) => {
  const request = {path: `/texts/${textId}`, errorMsg: 'Failed to load text content.'}
  return genericFetch({...request});
}

export const uploadText = async (data) => {
  /* Expects data
      {
        title,
        content,
        source,
        wordCount,
        createdByUserId
      }
  */
  const request = {path: `/texts/upload`, errorMsg: 'Failed to upload text.', data, method: 'POST'}
  return genericFetch({...request});
}

export const editText = async (textId, data) => {
  /* Expects data
    {
      title,
      content,
      source,
      wordCount,
      createdByUserId
    }
  */
  const request = {path: `/texts/upload/${textId}`, errorMsg: 'Failed to edit text.', data, method: 'POST'}
  return genericFetch({...request});
}

export const deleteText = async (textId, data) => {
  /* Expects data
    {
      createdByUserId (which is the current user's id and must match the text creator)
    }
  */
  const request = {path: `/texts/delete/${textId}`, errorMsg: 'Failed to delete text.', data, method: 'DELETE'}
  return genericFetch({...request});
}
