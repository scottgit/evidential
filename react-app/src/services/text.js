const genericFetch = async ({path, errorMsg, data, method='GET'}) => {

  try {
    let response;
    if (method === 'GET') {
      response = await fetch(`/api/texts/${path}`)
    }
    else {
      response = await fetch(`/api/texts/${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    }

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.errors) {
        throw responseData;
      } else {
        return responseData;
      }
    } else {
      const errorData = {errors: [errorMsg]};
      throw errorData
    }
  } catch (err) {
    return err
  }
}

export const fetchText = async (textId) => {
  const request = {path: textId, errorMsg: 'Failed to load text content.'}
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
  const request = {path: 'upload', errorMsg: 'Failed to upload text.', data, method: 'POST'}
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
  const request = {path: `upload/${textId}`, errorMsg: 'Failed to edit text.', data, method: 'POST'}
  return genericFetch({...request});
}

export const deleteText = async (textId, data) => {
  /* Expects data
    {
      createdByUserId (which is the current user's id and must match the text creator)
    }
  */
  const request = {path: `delete/${textId}`, errorMsg: 'Failed to delete text.', data, method: 'DELETE'}
  return genericFetch({...request});
}
