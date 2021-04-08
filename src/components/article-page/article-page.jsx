import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Spin } from 'antd';

import { getSingleArticle, deleteArticle } from '../../api-server/api';
import { redirectToArticles } from '../../api-server/routes';
import css from '../new-article/new-article.module.scss';
import { ArticleItem } from '../article-item';
import { ErrorIndicator } from '../error-indicator';

function ArticlePage() {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [itemArticle, setItemArticle] = useState({});

  const { slug } = useParams();
  const history = useHistory();

  const token = useSelector(({ user }) => user.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { article } = await getSingleArticle(slug, token);

        setItemArticle(article);
        setLoading(false);
      } catch (error) {
        setHasError(true);
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      setLoading(true);
    };
  }, [slug, token]);

  const onDelete = async () => {
    await deleteArticle(slug, token);
    history.push(redirectToArticles());
  };

  if (hasError) {
    return <ErrorIndicator />;
  }

  if (hasError) {
    return <Alert message="Error" description="Could not find the article" type="error" showIcon />;
  }

  if (isLoading) {
    return <Spin className={css.spin} size="large" tip="Loading..." />;
  }

  if (itemArticle) {
    return <ArticleItem article={itemArticle} isFull onDelete={onDelete} />;
  }

  return null;
}

export default ArticlePage;
