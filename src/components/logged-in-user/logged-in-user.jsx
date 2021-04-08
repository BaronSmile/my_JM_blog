import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { UserInfo } from '../user-info';
import { removeFromLStorage } from '../../api-server/api';
import { logoutUser } from '../../redux/actions';
import css from '../header/header.module.scss';
import { redirectToNewArticle } from '../../api-server/routes';

function LoggedInUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const themeMode = useSelector(({ isDarkMode }) => isDarkMode);

  const loggedStyle = cn(css.header__loggedIn, { [css.dark__loggedIn]: themeMode });

  const logoutHandler = () => {
    removeFromLStorage('user');
    history.go(0);
    dispatch(logoutUser);
  };

  return (
    <div className={loggedStyle}>
      <Link className={css.header__createArticle} to={redirectToNewArticle()}>
        Create article
      </Link>
      <UserInfo />
      <button type="button" className={css.header__logOut} onClick={logoutHandler}>
        Log Out
      </button>
    </div>
  );
}

export default LoggedInUser;
