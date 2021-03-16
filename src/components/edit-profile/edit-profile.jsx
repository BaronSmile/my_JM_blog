import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import {Button} from 'antd';

import UserServer from "../../api-server/userServer";
import {getFromLocalStorage} from "../../utils/localStorage";
import DefaultAvatar from '../../assets/img/avatar.png';
import {setUser} from "../../redux/actions";
import {RegisterFormValidation} from "../register-form-validation";
import {ErrorIndicator} from "../error-indicator";
import css from "./edit-profile.module.scss";
import {FormInput} from "../form-input";

function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(({userData: {user = {}}}) => user);
  const [error, setError] = useState(null);
  const userService = new UserServer();
  const token = getFromLocalStorage('token');

  const {
    serverErrors,
    setServerErrors,
    handleSubmit,
    errors,
    setValue,
    nameSettingsValidation,
    emailSettingsValidation,
    passwordSettingsValidation,
    urlSettingsValidation
  } = RegisterFormValidation();


  useEffect(() => {
    if (currentUser) {
      setValue('username', `${currentUser.username}`);
      setValue('email', `${currentUser.email}`);
      setValue('image', `${currentUser.image ?? DefaultAvatar}`)
    }
  }, [currentUser, setValue]);

  const onSubmit = ({username, email, password, image}) => {
    const requestBody = {
      user: {username, email, password, image},
    };
    userService.updateUser(requestBody, token).then((body) => {
      if (body.errors) {
        setServerErrors(body.errors);
        return;
      }
      dispatch(setUser(body.user));
      history.push('/');
    })
      .catch((err) => setError(err));
  };

  if (error) {
    return <ErrorIndicator/>
  }


  return (
    <div className={css.profile}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={css.profile__title}>Edit profile</h1>
        <FormInput
          label='Username'
          id='username'
          error={errors.username}
          ref={nameSettingsValidation}
          type='text'
          name='username'
          serverErrors={serverErrors}
        />
        <FormInput
          label='email'
          id='email'
          error={errors.email}
          ref={emailSettingsValidation}
          type='email'
          name='email'
          serverErrors={serverErrors}
        />
        <FormInput
          label='password'
          id='password'
          error={errors.password}
          ref={passwordSettingsValidation}
          type='password'
          name='password'
          serverErrors={serverErrors}
        />
        <FormInput
          label='User Image'
          id='image'
          error={errors.image}
          ref={urlSettingsValidation}
          type='url'
          name='image'
          serverErrors={serverErrors}
        />
        <Button
          className={css.profile__submit}
          type='primary'
          htmltype='submit'
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default EditProfile;