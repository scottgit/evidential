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

export const fetchText = async (textId, stillMounted, setTextObj, setIsLoaded) => {
  try {
    const response = await fetch(`/api/texts/${textId}`);
    if (response.ok) {
      if (stillMounted) {
        const responseData = await response.json();
        setTextObj(responseData);
        setIsLoaded(1);
      }
    } else {
      throw Error('Failed to load content.');
    }
  } catch (e) {
    if (stillMounted) {
      console.error("Text loading error: ", e)
      setIsLoaded(-1);
    }
  }
}
