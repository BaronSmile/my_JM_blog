import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Pagination, Spin } from 'antd';
import cn from 'classnames';

import css from './article-list.module.scss';
import { getArticlesList } from '../../api-server/api';
import { ArticleItem } from '../article-item';

function ArticleList() {
  const dispatch = useDispatch();
  const [articlesList, setArticles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const token = useSelector(({ user }) => user.token);
  const loggedIn = useSelector(({ loggedIn }) => loggedIn);
  const themeMode = useSelector(({ isDarkMode }) => isDarkMode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { articles } = await getArticlesList(10, activePage, token);
        setArticles(articles);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      setLoading(true);
    };
  }, [activePage, dispatch, token, loggedIn]);

  const onChangePage = (changedPage) => {
    setActivePage(changedPage);
  };

  const elements = articlesList.map((item) => <ArticleItem key={item.createdAt} article={item} />);

  if (isLoading) {
    return <Spin className={css.spinner} tip="Loading..." size="large" />;
  }

  if (hasError) {
    return (
      <div className={css.alert}>
        <Alert message="Error" description="Couldn't find the article" type="error" />
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
        onChange={onChangePage}
      />
    </>
  );
}

export default ArticleList;
