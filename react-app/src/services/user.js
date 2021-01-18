export const updateCurrentUserInfo = async (setCurrentUser, id) => {

  try {
    const response = await fetch(`/api/users/${id}`);

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.errors) {
        throw responseData;
      } else {
        setCurrentUser(responseData);
      }
    } else {
      const errorData = {errors: ['Failed to update user.']};
      throw errorData
    }
  } catch (err) {
    return err
  }
}
