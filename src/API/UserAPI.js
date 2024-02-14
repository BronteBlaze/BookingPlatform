import API from ".";

export const SignUpAPI = (userData) =>
  API.post("/auth-user/signup", { userData });

export const SignInAPI = (email, password) =>
  API.post("/auth-user/signin", { email, password });

export const EditUserAPI = (userData) => API.put("/profile", { userData });
