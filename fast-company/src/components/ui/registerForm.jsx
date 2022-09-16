// component RegisterForm
import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";

const RegisterForm = () => {
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validateSchema = yup.object().shape({
    license: yup
      .boolean()
      .required(
        "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      ),
    profession: yup.string().required("Выберите вашу профессию"),
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
      <SelectField
        label="Выберите вашу профессию"
        name="professions"
        options={professions}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          {
            name: "Male",
            value: "male",
          },
          {
            name: "Female",
            value: "female",
          },
          {
            name: "Other",
            value: "other",
          },
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качества"
      />
      <CheckBoxField
        onChange={handleChange}
        value={data.license}
        name="license"
        error={errors.license}
      >
        Подтвердить лицензионное соглашение
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

export default RegisterForm;
