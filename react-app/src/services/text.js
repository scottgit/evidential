export const uploadText = async (title, content, source, wordCount) => {
  const endPoint = edit ? 'edit' : 'signup';
  const response = await fetch(`/api/auth/${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    }),
  });
  return await response.json();
}
