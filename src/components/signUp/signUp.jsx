import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from 'react-router-dom';
import {Button} from 'antd';


import {setLoggedIn, setUser} from "../../redux/actions";
import UserServer from "../../api-server/userServer";
import {setToLocalStorage} from "../../utils/localStorage";
import {FormInput} from '../form-input';
import RegisterFormValidation from "../register-form-validation/register-form-validation";
import {ErrorIndicator} from "../error-indicator";
import css from './signUp.module.scss';

function SignUp() {
  const userServer = new UserServer();
  const dispatch = useDispatch();
  const auth = useSelector(({loggedIn = false}) => loggedIn);
  const [error, setErrors] = useState(null);

  const {
    serverErrors,
    setServerErrors,
    handleSubmit,
    errors,
    nameSettingsValidation,
    emailSettingsValidation,
    passwordSettingsValidation,
    repeatPasswordValidation,
    agreementsSettingsValidation
  } = RegisterFormValidation();


  const onSubmit = ({username, email, password}) => {
    const requestBody = {
      user: {
        username,
        email,
        password
      }
    };

    userServer.registerUser(requestBody).then((body) => {
      if (body.errors) {
        setServerErrors(body.errors);
        return;
      }
      setToLocalStorage('token', body.user.token);
      dispatch(setUser(body.user));
      dispatch(setLoggedIn(true));
    })
      .catch(() => setErrors(true));
  };

  if (auth) {
    return <Redirect to='/'/>;
  }

  if (error) {
    return <ErrorIndicator/>
  }


  return (
    <div className={css.signUp}>
      <form className={css.signUp__form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={css.signUp__title}>Create new account</h1>

        <FormInput
          ref={nameSettingsValidation}
          id='username'
          error={errors.username}
          label='Username'
          type='text'
          name='username'
          serverErrors={serverErrors}
        />


        <FormInput
          ref={emailSettingsValidation}
          id='email'
          error={errors.email}
          label='Email'
          type='email'
          name='email'
          serverErrors={serverErrors}
        />


        <FormInput
          ref={passwordSettingsValidation}
          id='password'
          error={errors.password}
          label='Password'
          type='password'
          name='password'
          serverErrors={serverErrors}
        />


        <FormInput
          ref={repeatPasswordValidation}
          id='repeatPassword'
          error={errors.repeatPassword}
          label='Repeat Password'
          type='password'
          name='repeatPassword'
          serverErrors={serverErrors}
        />

        <div className={css.signUp__agreement}>
          <label htmlFor="checkbox" className={css.signUp__label}>
            <input
              type="checkbox"
              className={css.signUp__checkbox}
              id='checkbox'
              name='checkbox'
              ref={agreementsSettingsValidation}
            />
            I agree to the processing of my personal information
          </label>
          {errors.checkbox &&
          <p style={{margin: 0, color: '#f5222d'}}>{errors.checkbox.message}</p>}
        </div>
        <Button
          className={css.signUp__submit}
          type='primary'
          htmltype='submit'
        >Create</Button>
        <p>Already have an account? <Link to='/sign-in'>Sign In</Link></p>
      </form>
    </div>
  );
}

export default SignUp;