import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import css from './app.module.scss';
import { Header } from '../header';
import { ArticleList } from '../article-list';
import SignIn from '../sign-in';
import SignUp from '../sign-up';
import PrivateRoute from '../private-route';
import EditProfile from '../edit-profile';
import NewArticle from '../new-article';
import EditArticle from '../edit-article';
import ArticlePage from '../article-page';
import { getCurrentUser, getFromLStorage } from '../../api-server/api';
import { authenticateUser, setLoggedIn } from '../../redux/actions';
import { ErrorIndicator } from '../error-indicator';

function App() {
  const themeMode = useSelector(({ isDarkMode }) => isDarkMode);
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();

  const themeStyle = cn({ [css.dark]: themeMode });

  useEffect(() => {
    const loginUser = async () => {
      try {
        const user = getFromLStorage('user');

        if (user) {
          const response = await getCurrentUser(user.token);
          if (response.user) {
            dispatch(authenticateUser(response.user));
            dispatch(setLoggedIn(true));
          }
        }
      } catch (err) {
        setErrors(err);
      }
    };

    loginUser();
  }, [dispatch]);

  if (errors) {
    return <ErrorIndicator />;
  }

  return (
    <BrowserRouter>
      <div className={themeStyle}>
        <>
          <Header />
          <main className={css.main}>
            <Route path={['/', '/articles']} component={ArticleList} exact />
            <Route path="/articles/:slug" component={ArticlePage} exact />
            <Route path="/sign-in" component={SignIn} exact />
            <Route path="/sign-up" component={SignUp} exact />
            <PrivateRoute path="/profile" component={EditProfile} exact />
            <PrivateRoute path="/new-article" component={NewArticle} exact />
            <PrivateRoute path="/articles/:slug/edit" component={EditArticle} exact />
          </main>
        </>
      </div>
    </BrowserRouter>
  );
}

export default App;
