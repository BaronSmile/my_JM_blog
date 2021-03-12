import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import cn from 'classnames';

import css from './app.module.scss';
import {Header} from "../header";
import {ArticleList} from "../article-list";

function App() {
  const themeMode = useSelector(state => state.themeMode);

  const themeStyle = (cn({[css.dark]:themeMode}));

  return (
    <BrowserRouter>
      <div className={themeStyle}>
        <Header/>
        <main className={css.main}>
          <Switch>
            <Route path="/" component={ArticleList} exact/>
            <Route path="/articles" component={ArticleList} exact/>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;