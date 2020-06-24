import axios from "axios";

export const SignInWithEmail = async (email, password) => {
  const response = await axios("http://localhost:5000/auth/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      email,
      password,
    }),
  });
  return response;
};

export const onSignup = async (data) => {
  console.log(data);

  const response = await axios("auth/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  });
  return response;
};
