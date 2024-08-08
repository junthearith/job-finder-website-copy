// PasswordResetForm.jsx
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Label } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useFontClass from '../../common/useFontClass';
import PasswordInput from '../../common/PasswordInput';
import { confirmPasswordResetThunk } from '../../redux/features/user/userSlice';

const PasswordResetForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fontClass } = useFontClass();
  const { t } = useTranslation();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const formik = useFormik({
    initialValues: {
      otp_code: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      otp_code: Yup.string().required(t('resetForm.validation.otp')),
      password: Yup.string()
        .min(8, t('resetForm.validation.passwordMin'))
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          t('resetForm.validation.passwordStrong')
        )
        .required(t('resetForm.validation.password')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], t('resetForm.validation.passwordMatch'))
        .required(t('resetForm.validation.confirmPassword'))
    }),
    onSubmit: async (values, { setErrors }) => {
      const email = localStorage.getItem('email'); // Get email from localStorage
      const resetData = { ...values, email };

      try {
        await dispatch(confirmPasswordResetThunk(resetData)).unwrap();
        toast.success(<div className={`${fontClass}`}>{t('resetForm.successMessage')}</div>);
        navigate('/profile');
      } catch (error) {
        if (error.response && error.response.data) {
          const { data } = error.response;
          const formErrors = {};
          if (data.password) formErrors.password = data.password[0];
          if (data.confirmPassword) formErrors.confirmPassword = data.confirmPassword[0];
          setErrors(formErrors);
          toast.error(<div className={`${fontClass}`}>{t('resetForm.errorMessage')}</div>);
        } else {
          toast.error(<div className={`${fontClass}`}>{t('resetForm.errorMessage')}</div>);
        }
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      setMessage(t('resetForm.successMessage'));
      navigate('/profile');
    } else if (error) {
      setMessage(error);
    }
  }, [isAuthenticated, error, navigate, t]);

  return (
    <div
      className={`${fontClass} bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto dark:bg-gray-700`}
    >
      <h2
        className={`${fontClass} text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-left text-primary-700 dark:text-white`}
      >
        {t('resetForm.title')}
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 sm:gap-6"
      >
        <div className="text-left">
          <Label
            htmlFor="otp_code"
            value={t('resetForm.labels.otp')}
            className={`${fontClass} text-base mb-2`}
          />
          <input
            id="otp_code"
            name="otp_code"
            type="text"
            placeholder="123456"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.otp_code}
            className={`w-full px-3.5 py-3.5 bg-gray-50 rounded-lg border border-solid border-slate-300 text-base text-black ${fontClass}`}
          />
          {formik.touched.otp_code && formik.errors.otp_code && (
            <div className="mt-1 text-red-600 dark:text-red-500 text-sm font-medium">
              {formik.errors.otp_code}
            </div>
          )}
        </div>
        <PasswordInput
          label={t('resetForm.labels.password')}
          id="password"
          name="password"
          placeholder="••••••••"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
          fontClass={fontClass}
        />
        <PasswordInput
          label={t('resetForm.labels.confirmPassword')}
          id="confirmPassword"
          name="confirmPassword"
          placeholder="••••••••"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
          fontClass={fontClass}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`${fontClass} w-full bg-primary-700 text-white font-medium rounded-lg py-3 hover:bg-primary-750 disabled:opacity-50`}
        >
          {isLoading
            ? t('resetForm.labels.resetting')
            : t('resetForm.labels.reset')}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
