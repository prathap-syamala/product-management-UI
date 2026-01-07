export const validateLogin = (values) => {
  const errors = {};

  if (!values.username || values.username.trim() === "") {
    errors.username = "Username is required";
  }

  if (!values.password || values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};
