import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { TextInput, Label } from 'flowbite-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/features/user/userSlice';
import { useTranslation } from 'react-i18next';
import useFontClass from '../../common/useFontClass';
import ResetPasswordModal from './ResetPasswordModal'; // Adjust the path as needed
import useModal from '../../common/useModal'; // Import the custom hook
import { toast } from 'react-toastify';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fontClass } = useFontClass();
  const { t } = useTranslation();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.user);
  const { isModalOpen, openModal, closeModal } = useModal(); // Use the custom hook

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('loginForm.validation.invalid'))
        .required(t('loginForm.validation.email')),
      password: Yup.string().required(t('loginForm.validation.password')),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(
        <div className={fontClass}>{t('loginForm.success', { email: formik.values.email })}</div>
      );
      navigate('/profile');
    }
  }, [isAuthenticated, navigate, formik.values.email, t, fontClass]);

  useEffect(() => {
    if (error) {
      toast.error(<div className={fontClass}>{t('loginForm.error')}</div>);
    }
  }, [error, t, fontClass]);

  return (
    <div
      className={`${fontClass} bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto`}
    >
      <h2
        className={`${fontClass} text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-left text-primary-700 dark:text-white`}
      >
        {t('loginForm.title')}
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 sm:gap-6"
      >
        <div className="text-left">
          <Label
            htmlFor="email"
            value={t('loginForm.labels.email')}
            className={`${fontClass} text-base mb-2`}
          />
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            color={
              formik.touched.email && formik.errors.email ? 'failure' : 'gray'
            }
            helperText={
              formik.touched.email && formik.errors.email && formik.errors.email
            }
            className={`${fontClass} text-base sm:text-lg`}
          />
        </div>
        <div className="text-left">
          <Label
            htmlFor="password"
            value={t('loginForm.labels.password')}
            className={`${fontClass} text-base mb-2`}
          />
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            color={
              formik.touched.password && formik.errors.password ? 'failure' : 'gray'
            }
            helperText={
              formik.touched.password && formik.errors.password && formik.errors.password
            }
            className={`${fontClass} text-base sm:text-lg`}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className={`${fontClass} text-base sm:text-lg text-blue-600 dark:text-slate-200 hover:underline`}
            onClick={openModal}  // Use the custom hook to open the modal
          >
            {t('loginForm.labels.forgotPassword')}
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`${fontClass} w-full bg-primary-700 text-white font-medium rounded-lg py-3 hover:bg-primary-750 disabled:opacity-50`}
        >
          {isLoading ? t('loginForm.labels.logining') : t('loginForm.labels.login')}
        </button>
      </form>
      <p
        className={`${fontClass} mt-6 sm:mt-8 text-base sm:text-lg text-center text-gray-600`}
      >
        {t('loginForm.labels.unauthorized')}{' '}
        <NavLink
          to={'/register'}
          className="text-blue-600 dark:text-slate-200 hover:underline font-medium"
        >
          {t('loginForm.labels.signUp')}
        </NavLink>
      </p>
      <ResetPasswordModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LoginForm;
