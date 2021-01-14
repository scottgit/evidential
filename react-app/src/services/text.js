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
