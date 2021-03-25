import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Spin } from 'antd';

import ArticlesServer from '../../api-server/articlesServer';

import css from '../new-article/new-article.module.scss';
import { ArticleItem } from '../article-item';
import { ErrorIndicator } from '../error-indicator';

function ArticlePage() {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [itemArticle, setItemArticle] = useState(null);

  const { slug } = useParams();
  const history = useHistory();

  const token = useSelector(({ userData: { user = {} } }) => user.token);
  const apiServer = new ArticlesServer();

  useEffect(() => {
    apiServer
      .getArticle(slug, token)
      .then(({ article }) => {
        setLoading(false);
        setItemArticle(article);
      })
      .catch(() => {
        setLoading(false);
        setHasError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const onDelete = () => {
    apiServer
      .deleteArticle(slug, token)
      .then(() => history.push('/'))
      .catch(() => setErrors(true));
  };

  if (errors) {
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
