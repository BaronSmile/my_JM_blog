import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { createArticle } from '../../api-server/api';
import { ErrorIndicator } from '../error-indicator';
import NewArticleForm from '../new-article-form';
import TagList from '../tag-list';
import TagForm from '../tag-form';
import css from './new-article.module.scss';
import { redirectToArticles } from '../../api-server/routes';

function NewArticle() {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const themeMode = useSelector(({ isDarkMode }) => isDarkMode);
  const history = useHistory();
  const token = useSelector(({ user }) => user.token);

  const submitArticle = async ({ title, description, body }) => {
    const tagList = tags.map((tag) => tag.name);
    const data = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };
    try {
      const response = await createArticle(data, token);

      if (response.article) {
        history.push(redirectToArticles());
      }
    } catch (err) {
      setError(err);
    }
  };

  const addTag = (tags, tag, setTags) => {
    setTags([...tags, { name: tag, id: `${tag}${Math.random()}` }]);
  };

  const deleteTag = (tags, tagId, setTags) => {
    const copyTags = tags.filter((tag) => tag.id !== tagId);
    setTags(copyTags);
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
