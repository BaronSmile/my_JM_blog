import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import css from '../header/header.module.scss';
import { redirectToSignIn, redirectToSignUp } from '../../api-server/routes';

function LoggedOutUser() {
  const themeMode = useSelector((state) => state.isDarkMode);

  const signInStyle = cn(css.header__signIn, { [css.dark__signIn]: themeMode });

  return (
    <div className={css.header__loggedOut}>
      <Link className={signInStyle} to={redirectToSignIn()}>
        Sign In
      </Link>
      <Link className={css.header__signUp} to={redirectToSignUp()}>
        Sign Up
      </Link>
    </div>
  );
}

export default LoggedOutUser;
