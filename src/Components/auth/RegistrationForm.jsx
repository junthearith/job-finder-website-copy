import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser, setIsAuthenticatedFalse } from "../../redux/features/user/userSlice";
import InputField from "../../common/InputField";
import PasswordInput from "../../common/PasswordInput"; // Import PasswordInput component
import useFontClass from "../../common/useFontClass";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const { fontClass } = useFontClass();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.user);
  const [hasErrorToastShown, setHasErrorToastShown] = useState(false); // State to track error toast display

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t("registrationForm.validation.username"))
      .min(3, t("registrationForm.validation.min")),
    email: Yup.string()
      .email(t("registrationForm.validation.invalid"))
      .required(t("registrationForm.validation.email")),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        t("registrationForm.validation.password")
      )
      .required(t("registrationForm.validation.password")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        t("registrationForm.validation.not-match")
      )
      .required(t("registrationForm.validation.confirmPassword")),
  });

  const handleSubmit = (values) => {
    setHasErrorToastShown(false); // Reset error toast state on form submission
    dispatch(registerUser(values));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(<div className={`${fontClass} `}>{t("registrationForm.success")}</div>);
      dispatch(setIsAuthenticatedFalse());
      navigate("/verifyCode");
    }
  }, [isAuthenticated, navigate, dispatch, t]);

  useEffect(() => {
    if (error && !hasErrorToastShown) {
      toast.error(<div className={`${fontClass}`}>{t("registrationForm.error")}</div>);
      setHasErrorToastShown(true); // Set error toast state to true after showing the toast
    }
  }, [error, hasErrorToastShown]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form
          className={`${fontClass} flex flex-col space-y-4 sm:space-y-6 bg-white dark:bg-gray-700 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl`}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary-700 dark:text-white text-left mb-4">
            {t("registrationForm.title")}
          </h2>
          <InputField
            label={t("registrationForm.labels.username")}
            name="username"
            placeholder={t("registrationForm.placeholders.username")}
          />
          <InputField
            label={t("registrationForm.labels.email")}
            name="email"
            type="email"
            placeholder={t("registrationForm.placeholders.email")}
          />
          <PasswordInput
            label={t("registrationForm.labels.password")}
            id="password"
            name="password"
            placeholder={t("registrationForm.placeholders.password")}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
            fontClass={fontClass}
          />
          <PasswordInput
            label={t("registrationForm.labels.confirmPassword")}
            id="confirmPassword"
            name="confirmPassword"
            placeholder={t("registrationForm.placeholders.confirmPassword")}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
            fontClass={fontClass}
          />
          <button
            type="submit"
            disabled={isLoading || !formik.isValid}
            className="w-full bg-primary-700 text-white font-medium rounded-lg py-3 hover:bg-primary-750 disabled:opacity-50 transition duration-300"
          >
            {isLoading
              ? t("registrationForm.registering")
              : t("registrationForm.submit")}
          </button>
          <p
            className={`${fontClass} mt-6 text-base text-center text-gray-600`}
          >
            {t("registrationForm.labels.haveAccount")}{" "}
            <NavLink
              to="/login"
              className="text-blue-600 dark:text-slate-100 hover:underline font-medium"
            >
              {t("registrationForm.labels.login")}
            </NavLink>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
