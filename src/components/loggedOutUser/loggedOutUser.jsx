import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import css from '../header/header.module.scss';

function LoggedOutUser() {
  const themeMode = useSelector((state) => state.themeMode);

  const signInStyle = cn(css.header__signIn, { [css.dark__signIn]: themeMode });

  return (
    <div className={css.header__loggedOut}>
      <Link className={signInStyle} to="/sign-in">
        Sign In
      </Link>
      <Link className={css.header__signUp} to="/sign-up">
        Sign Up
      </Link>
    </div>
  );
}

export default LoggedOutUser;
