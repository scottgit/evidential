export default async function genericFetch({path, errorMsg, data, method='GET', type='JSON'}) {

  let contentType;
  switch(type) {
    case 'FORM':
      contentType = "multipart/form-data";
      break;
    default:
      contentType = "application/json";
  }

  try {
    let response;
    if (method === 'GET') {
      response = await fetch(`/api${path}`)
    }
    else {
      response = await fetch(`/api${path}`, {
        method,
        headers: {
          "Content-Type": contentType
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
