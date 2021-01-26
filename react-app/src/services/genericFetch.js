export default async function genericFetch({path, errorMsg, data, method='GET'}) {

  try {
    let response;
    if (method === 'GET') {
      response = await fetch(`/api${path}`)
    }
    else {
      response = await fetch(`/api${path}`, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
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
