import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

function App() {
  const themeMode = useSelector((state) => state.isDarkMode);

  const themeStyle = cn({ [css.dark]: themeMode });

  return (
    <BrowserRouter>
      <div className={themeStyle}>
        <Header />
        <main className={css.main}>
          <Switch>
            <Route path={['/',"/articles"]} component={ArticleList} exact />
            <Route path="/articles/:slug" component={ArticlePage} exact />
            <Route path="/sign-in" component={SignIn} exact />
            <Route path="/sign-up" component={SignUp} exact />
            <PrivateRoute path="/profile" component={EditProfile} exact />
            <PrivateRoute path="/new-article" component={NewArticle} exact />
            <PrivateRoute path="/articles/:slug/edit" component={EditArticle} exact />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
