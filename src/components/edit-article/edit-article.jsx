import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Alert, Spin } from 'antd';
import cn from 'classnames';

import ArticlesServer from '../../api-server/articlesServer';
import css from '../new-article/new-article.module.scss';
import NewArticleForm from '../newArticleForm';
import { addTag, deleteTag } from '../../utils/addDeleteTag';
import TagList from '../tag-list';
import TagForm from '../tag-form';

function EditArticle() {
  const [itemArticle, setItemArticle] = useState(null);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  const history = useHistory();
  const { slug } = useParams();
  const articleServer = new ArticlesServer();

  const token = useSelector(({ userData: { user = {} } }) => user.token);
  const themeMode = useSelector((state) => state.themeMode);

  useEffect(() => {
    articleServer
      .getArticle(slug, token)
      .then(({ article }) => {
        setLoading(false);
        setItemArticle(article);
        setTags(article.tagList.map((tag) => ({ name: tag, id: `${tag}${Math.random()}` })));
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

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
    articleServer
      .updateArticle(requestBody, slug, token)
      .then(({ article }) => {
        history.push(`/articles/${article.slug}`);
      })
      .catch(() => setError(true));
  };

  if (isLoading) {
    return <Spin className={css.spin} size="large" tip="Loading..." />;
  }

  if (hasError) {
    return (
      <div className={css.alert}>
        <Alert message="Error" description="Could not find the article" type="error" showIcon />
      </div>
    );
  }

  const articleStyle = cn(css.newArticle, { [css.dark__newArticle]: themeMode });

  return (
    <div className={cn({ [css.edit__article]: themeMode })}>
      <div className={articleStyle}>
        <h2 className={css.newArticle__title}>Edit Article</h2>
        {itemArticle && <NewArticleForm onSubmitArticle={submitArticle} article={itemArticle} />}
        <TagList tags={tags} onDeleteTag={(tag) => deleteTag(tags, tag, setTags)} />
        <TagForm onAddTag={(tag) => addTag(tags, tag, setTags)} />
      </div>
    </div>
  );
}

export default EditArticle;
