import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import css from '../header/header.module.scss';
import avatar from '../../assets/img/avatar.png';

function UserInfo() {
  const currentUser = useSelector(({ userData: { user = {} } }) => user);

  return (
    <Link className={css.header__userInfo} to="/profile">
      <span className={css.header__userName}>{currentUser.username}</span>
      <img className={css.header__avatar} src={currentUser.image ?? avatar} alt="user pic" width="45" height="45" />
    </Link>
  );
}

export default UserInfo;
