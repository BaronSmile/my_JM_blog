import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from 'react-router-dom';
import {Button} from "antd";
import cn from 'classnames';

import UserServer from '../../api-server/userServer';
import {setLoggedIn, setUser} from "../../redux/actions";
import {setToLocalStorage} from "../../utils/localStorage";
import css from './signIn.module.scss';
import {RegisterFormValidation} from "../register-form-validation";
import {ErrorIndicator} from "../error-indicator";
import {FormInput} from "../form-input";

function SignIn() {
  const [error, setErrors] = useState(null);
  const userService = new UserServer();
  const dispatch = useDispatch();
  const auth = useSelector(({loggedIn = false}) => loggedIn);
  const themeMode = useSelector(({themeMode}) => themeMode)

  const {
    serverErrors,
    setServerErrors,
    handleSubmit,
    errors,
    emailSettingsValidation,
    passwordSettingsValidation
  } = RegisterFormValidation();

  const onSubmit = ({email, password}) => {
    const requestBody = {
      user: {
        email,
        password
      }
    }
    userService.logInUser(requestBody)
      .then((body) => {
        if (body.errors) {
          setServerErrors(body.errors);
          return;
        }
        dispatch(setLoggedIn(true));
        setToLocalStorage('token', body.user.token);
        dispatch(setUser(body.user));
      })
      .catch((err) => setErrors(err));
  };


  if (error) {
    return <ErrorIndicator/>
  }

  if (auth) {
    return <Redirect to='/'/>
  }

  const signInStyle = cn(css.signIn,{[css.signIn__dark]:themeMode});

  return (
    <div className={signInStyle}>
      <form className={css.signIn__form}
            onSubmit={handleSubmit(onSubmit)}>
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
          label='Password'
          id='password'
          ref={passwordSettingsValidation}
          error={errors.password}
          type='password'
          name='password'
          serverErrors={serverErrors}
        />


        {serverErrors['email or password'] && (
          <ErrorIndicator errorMessage={`Email or password ${serverErrors['email or password']}`}/>
        )}
        <Button className={css.signIn__submit} type="primary" htmlType="submit">
          Login
        </Button>
        <p className={css.signIn__question}>
          Don&apos;t you have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>


    </div>
  );
}

export default SignIn;