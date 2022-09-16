// component LoginForm
import React, { useEffect, useState } from "react";
// import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validateSchema = yup.object().shape({
    password: yup
      .string()
      .required("Пароль обязательна для заполнения")
      .matches(
        /(?=.*[A-Z])/,
        "Пароль должен содержать хотя бы одну заглавную букву"
      )
      .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одно число")
      .matches(
        /(?=.*[!@#$%^&*])/,
        "Пароль должен содержать один из специальных сиволов !@#$%^&*"
      )
      .matches(/(?=.{8,})/, "Пароль должен состоять минимум из 8 символов"),
    email: yup
      .string()
      .required("Электронная почта обязательна для заполнения")
      .email("Email введен некорректно"),
  });

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message }));
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="text"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField onChange={handleChange} value={data.stayOn} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        submit
      </button>
    </form>
  );
};

export default LoginForm;
