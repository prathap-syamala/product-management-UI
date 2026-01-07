export const validateUser = (values) => {
  const errors = {};

  if (!values.username || values.username.trim() === "") {
    errors.username = "Username is required";
  }

  if (!values.password || values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.roleId) {
    errors.roleId = "Role is required";
  }

  return errors;
};
