import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Alert, Spin } from 'antd';
import cn from 'classnames';

import { getSingleArticle, updateArticle } from '../../api-server/api';
import css from '../new-article/new-article.module.scss';
import NewArticleForm from '../new-article-form';
import TagList from '../tag-list';
import TagForm from '../tag-form';
import { redirectToArticle } from '../../api-server/routes';

function EditArticle() {
  const [itemArticle, setItemArticle] = useState({});
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  const history = useHistory();
  const { slug } = useParams();

  const token = useSelector(({ user }) => user.token);
  const themeMode = useSelector(({ isDarkMode }) => isDarkMode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { article } = await getSingleArticle(slug);
        setItemArticle(article);
        setLoading(false);
        setTags(article.tagList.map((tag) => ({ name: tag, id: `${tag}${Math.random()}` })));
      } catch (errorFromFetch) {
        setError(errorFromFetch);
      }
    };

    fetchData();
  }, [slug]);

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
      const response = await updateArticle(data, slug, token);

      if (response.article) {
        const { slug: newSlag } = response.article;
        history.push(redirectToArticle(newSlag));
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
