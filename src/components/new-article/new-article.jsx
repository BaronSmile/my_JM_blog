import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import ArticlesServer from '../../api-server/articlesServer';
import { getFromLocalStorage } from '../../utils/localStorage';
import { ErrorIndicator } from '../error-indicator';
import NewArticleForm from '../newArticleForm';
import TagList from '../tag-list';
import { addTag, deleteTag } from '../../utils/addDeleteTag';
import TagForm from '../tag-form';
import css from './new-article.module.scss';

function NewArticle() {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const themeMode = useSelector((state) => state.themeMode);
  const articlesService = new ArticlesServer();
  const history = useHistory();
  const token = getFromLocalStorage('token');

  const submitArticle = ({ title, description, body }) => {
    const tagList = tags.map((tag) => tag.name);
    const requestBody = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };

    articlesService
      .createArticle(requestBody, token)
      .then(({ article: { slug } }) => history.push(`/articles/${slug}`))
      .catch(() => setError(true));
  };

  if (error) {
    return <ErrorIndicator />;
  }

  const newArticleStyle = cn(css.newArticle, { [css.dark__newArticle]: themeMode });

  return (
    <div className={cn({ [css.darkness]: themeMode })}>
      <div className={newArticleStyle}>
        <h2 className={css.newArticle__title}>Create new article</h2>
        <NewArticleForm onSubmitArticle={submitArticle} />
        <TagList tags={tags} onDeleteTag={(tag) => deleteTag(tags, tag, setTags)} />
        <TagForm onAddTag={(tag) => addTag(tags, tag, setTags)} />
      </div>
    </div>
  );
}

export default NewArticle;
