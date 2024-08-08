// ResetPasswordModal.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import { toast } from 'react-toastify';
import { requestPasswordResetThunk } from '../../redux/features/user/userSlice';
import InputField from '../../common/InputField';
import useFontClass from '../../common/useFontClass';

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const { fontClass } = useFontClass();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isPasswordResetRequested } = useSelector((state) => state.user);

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('resetPasswordForm.validation.email'))
      .required(t('resetPasswordForm.validation.emailRequired')),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(requestPasswordResetThunk(values.email))
      .unwrap()
      .then(() => {
        toast.success(<div className={`${fontClass} `}>{t('resetPasswordForm.successMessage')}</div>);
        navigate('/password-reset-request');
      })
      .catch((err) => {
        toast.error(<div className={`${fontClass}`}>{t('resetPasswordForm.errorMessage')}</div>)
      });
  };

  useEffect(() => {
    if (isPasswordResetRequested) {
      navigate('/password-reset-request');
    }
  }, [isPasswordResetRequested, navigate]);

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      className="transition-opacity duration-300 ease-in-out"
      size="lg"
      data-aos="zoom-up"
    >
      <Modal.Header>
        <h2 className={`${fontClass} text-2xl text-primary-700 dark:text-slate-50 sm:text-3xl font-semibold text-left`}>
          {t('resetPasswordForm.title')}
        </h2>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className={`${fontClass} flex flex-col space-y-4 sm:space-y-6`}>
              <InputField
                label={t('resetPasswordForm.labels.email')}
                name="email"
                type="email"
                placeholder={t('resetPasswordForm.placeholders.email')}
              />
              {/* {error && <div className="text-red-600 text-sm">{error}</div>} */}
              <button
                type="submit"
                disabled={isLoading || !formik.isValid}
                className="w-full bg-primary-700 text-white font-medium rounded-lg py-3 dark:bg-blue-700 hover:bg-primary-750 disabled:opacity-50 transition duration-300"
              >
                {isLoading ? t('resetPasswordForm.sending') : t('resetPasswordForm.submit')}
              </button>
              <p className={`${fontClass} mt-6 text-base text-center text-gray-600`}>
                {t('resetPasswordForm.labels.rememberPassword')}{' '}
                <NavLink to="/login" className="text-blue-600 dark:text-white  hover:underline font-medium" onClick={onClose}>
                  {t('resetPasswordForm.labels.login')}
                </NavLink>
              </p>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button color="gray" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ResetPasswordModal;
