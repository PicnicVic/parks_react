import picnicAPI from "../config/api"

export const signInUser = async (logInDetails) => {
  try {
    const response = await picnicAPI.post("/auth/signin", logInDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const retrieveUserFromJWT = async () => {
  const jwt = sessionStorage.getItem("jwt");
  const response = await picnicAPI.post("/auth/signed_in_user", { jwt });
  return response.data;
};


export const createNewUser = async (userObject) => {
  try {
    const response = await picnicAPI.post("auth/signup", userObject);
    return response.data;
  } catch (err) {
    throw err;
  }
};