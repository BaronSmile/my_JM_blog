import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import cn from 'classnames';

import { authUser, setToLStorage } from '../../api-server/api';
import { authenticateUser, setLoggedIn } from '../../redux/actions';
import css from './sign-in.module.scss';
import { RegisterFormValidation } from '../register-form-validation';
import { ErrorIndicator } from '../error-indicator';
import { FormInput } from '../form-input';
import { redirectToSignUp } from '../../api-server/routes';

function SignIn() {
  const [error, setErrors] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(({ loggedIn = false }) => loggedIn);
  const themeMode = useSelector(({ isDarkMode }) => isDarkMode);

  const {
    serverErrors,
    setServerErrors,
    handleSubmit,
    errors,
    emailSettingsValidation,
    passwordSettingsValidation,
  } = RegisterFormValidation();

  const onSubmit = async (data) => {
    if (!isSubmit) {
      setIsSubmit(true);
      try {
        const response = await authUser(data);

        if (response.errors) {
          setServerErrors(response.errors);
        }

        if (response.user) {
          dispatch(setLoggedIn(true));
          const { user } = response;
          setToLStorage('user', user);
          dispatch(authenticateUser(user));
        }
      } catch (err) {
        setErrors(err);
      } finally {
        setIsSubmit(false);
      }
    }
  };

  if (error) {
    return <ErrorIndicator />;
  }

  if (auth) {
    return <Redirect to="/" />;
  }

  function isEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }

  const signInStyle = cn(css.signIn, { [css.signIn__dark]: themeMode });
  return (
    <div className={signInStyle}>
      <form className={css.signIn__form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={css.signIn__title}>Sign In</h1>
        <FormInput
          ref={emailSettingsValidation}
          id="email"
          error={errors.email}
          label="Email Address"
          type="email"
          name="email"
          serverErrors={serverErrors}
        />
        <FormInput
          label="Password"
          id="password"
          ref={passwordSettingsValidation}
          error={errors.password}
          type="password"
          name="password"
          serverErrors={serverErrors}
        />

        {serverErrors['email or password'] && (
          <ErrorIndicator errorMessage={`Email or password ${serverErrors['email or password']}`} />
        )}
        <Button
          className={css.signIn__submit}
          type="primary"
          htmlType="submit"
          loading={isSubmit}
          disabled={isEmpty(errors) || isSubmit}
        >
          Login
        </Button>
        <p className={css.signIn__question}>
          Don&apos;t you have an account? <Link to={redirectToSignUp()}>Sign Up.</Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
