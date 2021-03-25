import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import cn from 'classnames';

import { UserInfo } from '../userInfo';
import { removeFromLocalStorage } from '../../utils/localStorage';
import { setUser } from '../../redux/actions';
import css from '../header/header.module.scss';

function LoggedInUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(({ userData: { user = {} } }) => user);
  const themeMode = useSelector((state) => state.themeMode);

  const loggedStyle = cn(css.header__loggedIn, { [css.dark__loggedIn]: themeMode });

  return (
    <div className={loggedStyle}>
      <Link className={css.header__createArticle} to="/new-article">
        Create article
      </Link>
      {Object.keys(currentUser).length === 0 ? <Spin tip="Loading..." /> : <UserInfo />}
      <button
        type="button"
        className={css.header__logOut}
        onClick={() => {
          history.go(0);
          history.push('/');
          dispatch(setUser({}));
          removeFromLocalStorage('token');
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default LoggedInUser;
