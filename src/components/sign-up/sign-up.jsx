import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import cn from 'classnames';

import { registerUser, setLoggedIn } from '../../redux/actions';
import { regUser, setToLStorage } from '../../api-server/api';
import { redirectToSignIn } from '../../api-server/routes';
import { FormInput } from '../form-input';
import RegisterFormValidation from '../register-form-validation/register-form-validation';
import { ErrorIndicator } from '../error-indicator';
import css from './sign-up.module.scss';

function SignUp() {
  const dispatch = useDispatch();
  const auth = useSelector(({ loggedIn = false }) => loggedIn);
  const themeMode = useSelector(({ isDarkMode }) => isDarkMode);
  const [error, setErrors] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    serverErrors,
    setServerErrors,
    handleSubmit,
    errors,
    nameSettingsValidation,
    emailSettingsValidation,
    passwordSettingsValidation,
    repeatPasswordValidation,
    agreementsSettingsValidation,
  } = RegisterFormValidation();

  const onSubmit = async (data) => {
    if (!isSubmit) {
      setIsSubmit(true);
      try {
        const response = await regUser(data);

        if (response.errors) {
          setServerErrors(response.errors);
        }

        if (response.user) {
          dispatch(registerUser(response.user));
          dispatch(setLoggedIn(true));
          const { user } = response;
          setToLStorage('user', user);
        }
      } catch (err) {
        setErrors(err);
      } finally {
        setIsSubmit(false);
      }
    }
  };

  if (auth) {
    return <Redirect to="/" />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  function isEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }

  const themeModeStyle = cn(css.signUp, { [css.signUp__dark]: themeMode });

  return (
    <div className={themeModeStyle}>
      <form className={css.signUp__form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={css.signUp__title}>Create new account</h1>

        <FormInput
          ref={nameSettingsValidation}
          id="username"
          error={errors.username}
          label="Username"
          type="text"
          name="username"
          serverErrors={serverErrors}
        />

        <FormInput
          ref={emailSettingsValidation}
          id="email"
          error={errors.email}
          label="Email"
          type="email"
          name="email"
          serverErrors={serverErrors}
        />

        <FormInput
          ref={passwordSettingsValidation}
          id="password"
          error={errors.password}
          label="Password"
          type="password"
          name="password"
          serverErrors={serverErrors}
        />

        <FormInput
          ref={repeatPasswordValidation}
          id="repeatPassword"
          error={errors.repeatPassword}
          label="Repeat Password"
          type="password"
          name="repeatPassword"
          serverErrors={serverErrors}
        />

        <div className={css.signUp__agreement}>
          <label htmlFor="checkbox" className={css.signUp__label}>
            <input
              type="checkbox"
              className={css.signUp__checkbox}
              id="checkbox"
              name="checkbox"
              ref={agreementsSettingsValidation}
            />
            I agree to the processing of my personal information
          </label>
          {errors.checkbox && <p style={{ margin: 0, color: '#f5222d' }}>{errors.checkbox.message}</p>}
        </div>
        <Button
          className={css.signUp__submit}
          type="primary"
          htmlType="submit"
          loading={isSubmit}
          disabled={isEmpty(errors) || isSubmit}
        >
          Create
        </Button>
        <p>
          Already have an account? <Link to={redirectToSignIn()}>Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
