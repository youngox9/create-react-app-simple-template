const rules = (form = {}) => {
  return {
    email: [
      (value) => {
        if (!value) return "please enter email";
      },
      (value) => {
        const regex = new RegExp(
          /^\w+((-\w+)|(\.\w+)|(\+\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
        );
        const res = regex.test(value);
        if (!res) return "email format error";
      },
    ],
    password: [
      (value) => {
        if (!value) return "please enter password";
      },
    ],
    password2: [
      (value) => {
        if (!value) return "please re-enter the password again";
      },
      (value) => {
        if (form.password !== value) return "password not match!";
      },
    ],
    firstName: [
      (value) => {
        if (!value) return "please enter first name";
      },
    ],
    lastName: [
      (value) => {
        if (!value) return "please enter last name";
      },
    ],
    phone: [
      (value) => {
        if (!value) return "please enter phone";
      },
    ],
  };
};

export default rules;
