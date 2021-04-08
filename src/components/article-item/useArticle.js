// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { favoriteArticle } from '../../api-server/api';
import { redirectToEditArticle, redirectToSignIn } from '../../api-server/routes';

function UseArticle(article) {
  const [articleItem, setArticleItem] = useState(article);
  const [error, setError] = useState(null);
  const history = useHistory();
  const username = useSelector(({ user }) => user.username);
  const token = useSelector(({ user }) => user.token);

  useEffect(() => {
    setArticleItem(article);
  }, [article]);

  const { slug, favorited } = articleItem;

  const onBtnEditClick = () => {
    history.push(redirectToEditArticle(slug));
  };

  const onFavoriteArticle = async () => {
    try {
      if (token) {
        const response = await favoriteArticle(slug, token, favorited);

        setArticleItem(response.article);
      } else {
        history.push(redirectToSignIn());
      }
    } catch (err) {
      setError(true);
    }
  };

  return { onFavoriteArticle, onBtnEditClick, articleItem, username, error /*isLikeRequestSending*/ };
}

export default UseArticle;
