import React from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { format, parseISO } from 'date-fns';
import { Button, Popconfirm } from 'antd';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import UseArticle from './useArticle';
import css from './article-item.module.scss';
import { ErrorIndicator } from '../error-indicator';

function ArticleItem({ article, isFull = false, onDelete }) {
  const history = useHistory();
  const themeMode = useSelector((state) => state.themeMode);

  const { onFavoriteArticle, onBtnEditClick, articleItem, username, errors } = UseArticle(article);
  const { title, slug, favorited, body, createdAt, tagList, description, author, favoritesCount } = articleItem;

  if (errors) {
    return <ErrorIndicator />;
  }

  const isOwnArticle = username === author.username && isFull;
  const date = format(new Date(parseISO(createdAt)), 'MMMM d, yyyy');
  const likeContent = favorited ? (
    <HeartFilled onClick={onFavoriteArticle} className={css.article__heart} />
  ) : (
    <HeartOutlined onClick={onFavoriteArticle} className={css.article__heart_outlined} />
  );

  let str = 'articles';
  let res = history.location.pathname.split('/').includes(str);

  const articleStyle = cn({ [css.article]: res }, { [css.article__dark]: themeMode });
  const deleteBtnStyle = cn(css.article__delete, { [css.dark__delete]: themeMode });
  const editBtnStyle = cn(css.article__edit, { [css.dark__edit]: themeMode });
  const tagsStyle = cn(css.article__tagsItem, { [css.dark__tags]: themeMode });
  const userNameStyle = cn(css.article__username, { [css.dark__username]: themeMode });

  return (
    <article className={articleStyle}>
      <div className={css.article__section}>
        <header className={css.article__header}>
          <div className={css.article__left}>
            <div className={css.article__titleWrapper}>
              <h2 className={css.article__title}>
                <Link className={css.article__link} to={`/articles/${slug}`}>
                  {title}
                </Link>
              </h2>
              {likeContent}
              <span className={css.article__like}>{favoritesCount}</span>
            </div>
            <ul className={css.article__tags}>
              {tagList.map((tag) => (
                <li key={Math.random()} className={tagsStyle}>
                  {tag}
                </li>
              ))}
            </ul>
            <p className={css.article__description}>{description}</p>
          </div>
          <div className={css.article__right}>
            <div className={css.article__userInfoWrapper}>
              <div className={css.article__userInfo}>
                <span className={userNameStyle}>{author.username}</span>
                <span>{date}</span>
              </div>
              <img className={css.article__avatar} src={author.image} width="46" height="46" alt="Avatar" />
            </div>
            {isOwnArticle ? (
              <div className={css.article__buttons}>
                <Popconfirm
                  placement="rightTop"
                  title="Are you sure to delete this article?"
                  onConfirm={onDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button className={deleteBtnStyle} type="danger">
                    Delete
                  </Button>
                </Popconfirm>
                <Button className={editBtnStyle} type="primary" onClick={onBtnEditClick}>
                  Edit
                </Button>
              </div>
            ) : null}
          </div>
        </header>
        <section className={cn({ [css.dark__body]: themeMode })}>
          {isFull ? <ReactMarkdown source={body} /> : null}
        </section>
      </div>
    </article>
  );
}

ArticleItem.defaultProps = {
  article: {},
  isFull: false,
  onDelete: () => {},
};

ArticleItem.propTypes = {
  article: PropTypes.instanceOf(Object),
  isFull: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default ArticleItem;
