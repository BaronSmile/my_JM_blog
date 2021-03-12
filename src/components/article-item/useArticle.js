// eslint-disable-next-line no-unused-vars
import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';

import ArticlesServer from "../../api-server/articlesServer";

function UseArticle(article) {
  const apiArticles = useMemo(() => new ArticlesServer(), []);
  const [articleItem, setArticleItem] = useState(article);
  const [isLikeRequestSending, setLikeRequest] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const username = useSelector(({userData: {user = {}}}) => user.username);
  const token = useSelector(({userData: {user = {}}}) => user.token);

  useEffect(() => {
    setArticleItem(article);
  }, [article]);

  const {slug, favorited} = articleItem;

  const onBtnEditClick = () => {
    history.push(`/articles/${slug}/edit`);
  };

  const onFavoriteArticle = () => {
    if (token) {
      setLikeRequest(true);
      apiArticles.favoriteArticle(slug, token, favorited)
        .then((result) => {
          setLikeRequest(false);
          setArticleItem(result.article);
        })
        .catch(() => {
          setLikeRequest(false);
          setError(true);
        })
    } else {
      history.push(`/sign-in`);
    }
  };


  return {onFavoriteArticle, onBtnEditClick, articleItem, username, error, isLikeRequestSending}
}

export default UseArticle;