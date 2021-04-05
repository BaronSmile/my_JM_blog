import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Pagination, Spin } from 'antd';
import cn from 'classnames';

import css from './article-list.module.scss';
import ArticlesServer from '../../api-server/articlesServer';
import { ArticleItem } from '../article-item';

function ArticleList() {

  const apiArticles = useMemo(()=>new ArticlesServer(),[]);
  const [articlesList, setArticles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const token = useSelector(({ userData: { user = {} } }) => user.token);
  const themeMode = useSelector((state) => state.isDarkMode);

  useEffect(() => {
    apiArticles
      .getArticles(token)
      .then(({ articles }) => {
        setLoading(false);
        setArticles(articles);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [apiArticles, token]);

  const onPageChange = (page) => {
    setLoading(true);
    apiArticles
      .getArticles(page, token)
      .then(({ articles }) => {
        setLoading(false);
        setArticles(articles);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
    setActivePage(page);
  };

  const elements = articlesList.map((item) => (
    <li key={item.createdAt}>
      <ArticleItem article={item} />
    </li>
  ));

  if (isLoading) {
    return <Spin className={css.spinner} tip='Loading...' size='large' />;
  }

  if (hasError) {
    return (
      <div className={css.alert}>
        <Alert message='Error' description="Couldn't find the article" type='error' />
      </div>
    );
  }

  const paginationClass = cn(css.pagination, { [css.dark]: themeMode });

  return (
    <>
      <ul className={css.articlesList}>{elements}</ul>
      <Pagination
        className={paginationClass}
        showSizeChanger={false}
        current={activePage}
        pageSize={10}
        total={500}
        onChange={onPageChange}
      />
    </>
  );
}

export default ArticleList;
