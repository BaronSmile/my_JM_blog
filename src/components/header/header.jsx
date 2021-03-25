import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'antd';
import cn from 'classnames';

import { setUser, toggleDarkMode } from '../../redux/actions';
import UserServer from '../../api-server/userServer';
import { getFromLocalStorage } from '../../utils/localStorage';
import { LoggedInUser } from '../loggedInUser';
import { LoggedOutUser } from '../loggedOutUser';
import css from './header.module.scss';
import logo from '../../assets/img/realworldLogo.png';

const Header = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);
  const token = getFromLocalStorage('token');
  const userService = useMemo(() => new UserServer(), []);
  const auth = useSelector(({ loggedIn = false }) => loggedIn);
  const themeMode = useSelector((state) => state.themeMode);

  useEffect(() => {
    if (token) {
      userService
        .getCurrentUser(token)
        .then((body) => {
          dispatch(setUser(body.user));
        })
        .catch(() => setErrors(true));
    }
  }, [token, dispatch, userService, setErrors, errors]);

  const headerStyle = cn(css.header, { [css.dark]: themeMode });

  return (
    <header className={headerStyle}>
      <h1 className={css.header__title}>
        <Link className={css.header__titleLink} to="/">
          <img src={logo} alt="logo" width="200px" />
        </Link>
      </h1>

      <Switch
        className={css.switch}
        checkedChildren="light"
        unCheckedChildren="dark"
        onClick={() => dispatch(toggleDarkMode())}
        defaultChecked
      />

      {auth || getFromLocalStorage('token') ? <LoggedInUser /> : <LoggedOutUser />}
    </header>
  );
};

export default Header;
