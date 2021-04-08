import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'antd';
import cn from 'classnames';

import { LoggedInUser } from '../logged-in-user';
import { LoggedOutUser } from '../logged-out-user';
import { redirectToArticles } from '../../api-server/routes';
import css from './header.module.scss';
import logo from '../../assets/img/realworldLogo.png';
import { toggleDarkMode } from '../../redux/actions';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ loggedIn }) => loggedIn);
  const themeMode = useSelector(({ isDarkMode }) => isDarkMode);

  const headerStyle = cn(css.header, { [css.dark]: themeMode });
  return (
    <header className={headerStyle}>
      <h1 className={css.header__title}>
        <Link className={css.header__titleLink} to={redirectToArticles()}>
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

      {isLoggedIn ? <LoggedInUser /> : <LoggedOutUser />}
    </header>
  );
};

export default Header;
