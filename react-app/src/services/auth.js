export const authenticate = async() => {
  const response = await fetch('/api/auth',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const loginOrRecheckPassword = async (email, password, recheck=false) => {
  endPoint = recheck ? 'recheck' : 'login'
  const response = await fetch(`/api/auth/${endPoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      recheck
    })
  });
  return await response.json();
}

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
};


export const signUpOrEdit = async (lastName, firstName, email, password, confirmPassword, edit) => {
  endPoint = edit ? 'edit' : 'signup';
  const response = await fetch(`/api/auth/${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lastName,
      firstName,
      email,
      password,
      confirmPassword
    }),
  });
  return await response.json();
}
