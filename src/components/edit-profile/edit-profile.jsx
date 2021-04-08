import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import cn from 'classnames';

import { updateUser, setToLStorage } from '../../api-server/api';
import { updateUserProfile, setLoggedIn } from '../../redux/actions';
import { RegisterFormValidation } from '../register-form-validation';
import { ErrorIndicator } from '../error-indicator';
import { redirectToArticles } from '../../api-server/routes';
import css from './edit-profile.module.scss';
import { FormInput } from '../form-input';

function EditProfile() {
  const [error, setError] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(({ user }) => user);
  const themeMode = useSelector((state) => state.isDarkMode);

  const {
    serverErrors,
    setServerErrors,
    handleSubmit,
    errors,
    setValue,
    nameSettingsValidation,
    emailSettingsValidation,
    editPasswordSettings,
    urlSettingsValidation,
  } = RegisterFormValidation();

  useEffect(() => {
    if (user) {
      setValue('username', `${user.username}`);
      setValue('email', `${user.email}`);
      setValue('image', `${user.image ?? ''}`);
    }
    // eslint-disable-next-line
  }, [user]);

  const onSubmit = async (data) => {
    if (!isSubmit) {
      setIsSubmit(true);
      try {
        const response = await updateUser(data, user.token);

        if (response.errors) {
          setServerErrors(response.errors);
        }

        if (response.user) {
          dispatch(updateUserProfile(response.user));
          dispatch(setLoggedIn(true));
          const { user } = response;
          setToLStorage('user', user);
          history.push(redirectToArticles());
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsSubmit(false);
      }
    }
  };

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div className={cn({ [css.edit__profile]: themeMode })}>
      <div className={css.profile}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className={css.profile__title}>Edit profile</h1>
          <FormInput
            label="Username"
            id="username"
            error={errors.username}
            ref={nameSettingsValidation}
            type="text"
            name="username"
            serverErrors={serverErrors}
          />
          <FormInput
            label="email"
            id="email"
            error={errors.email}
            ref={emailSettingsValidation}
            type="email"
            name="email"
            serverErrors={serverErrors}
          />
          <FormInput
            label="password"
            id="password"
            error={errors.password}
            ref={editPasswordSettings}
            type="password"
            name="password"
            serverErrors={serverErrors}
          />
          <FormInput
            label="User Image"
            id="image"
            error={errors.image}
            ref={urlSettingsValidation}
            type="url"
            name="image"
            serverErrors={serverErrors}
          />
          <Button
            className={css.profile__submit}
            type="primary"
            htmlType="submit"
            loading={isSubmit}
            disabled={isSubmit}
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
