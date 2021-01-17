export const fetchText = async (textId, stillMounted) => {
  try {
    const response = await fetch(`/api/texts/${textId}`);
    if (response.ok) {
      if (stillMounted) {
        const responseData = await response.json();
        return responseData;
      }
    } else {
      throw Error('Failed to load content.');
    }
  } catch (e) {
    if (stillMounted) {
      console.error("Text loading error: ", e)
      return {}
    }
  }
}

export const uploadText = async ({title, content, source, wordCount, createdByUserId}) => {
  const response = await fetch(`/api/texts/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      source,
      wordCount,
      createdByUserId
    }),
  });
  return await response.json();
}

export const editText = async ({id, title, content, source, wordCount, createdByUserId}) => {
  const response = await fetch(`/api/texts/upload/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      source,
      wordCount,
      createdByUserId
    }),
  });
  return await response.json();
}
