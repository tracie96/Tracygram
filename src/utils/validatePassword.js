const validatePassword = Password => {
  let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (Password.length < 8) {
    return 'Your password must be at least 8 characters';
  }
  if (Password.search(/[a-z]/i) < 0) {
    return 'Your password must contain at least one letter.';
  }
  if (Password.search(/[0-9]/) < 0) {
    return 'Your password must contain at least one digit.';
  }

  if (Password.search(/[A-Z]/) < 0) {
    return 'Your password needs an uppser case letter';
  }

  if (format.test(Password) == false) {
    return 'Your password needs a special character e.g #';
  }

  return true;
};

export default validatePassword;
