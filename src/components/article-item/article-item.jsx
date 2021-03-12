import React from 'react';
import {HeartFilled, HeartOutlined, LoadingOutlined} from "@ant-design/icons";
import {format, parseISO} from 'date-fns';
import {Button, Popconfirm} from 'antd';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import cn from 'classnames';
import {useSelector} from "react-redux";

import UseArticle from "./useArticle";
import css from './article-item.module.scss';
import {ErrorIndicator} from "../error-indicator";


function ArticleItem({article, isFull = false, onDelete}) {
  const themeMode = useSelector(state => state.themeMode)

  const {onFavoriteArticle, onBtnEditClick, articleItem, username, errors, isLikeRequestSending} = UseArticle(article)
  const {title, slug, favorited, body, createdAt, tagList, description, author, favoritesCount} = articleItem;


  if (errors) {
    return <ErrorIndicator/>;
  }

  const isOwnArticle = username === author.username && isFull;
  const date = format(new Date(parseISO(createdAt)), 'MMMM d, yyyy');
  const likeContent = isLikeRequestSending ? (
    <LoadingOutlined className={css.article__loadingLike} spin/>
  ) : (
    <>
      {favorited ? (
        <HeartFilled
          onClick={onFavoriteArticle}
          className={css.article__heart}
        />
      ) : (
        <HeartOutlined onClick={onFavoriteArticle} className={css.article__heart}/>
      )}
    </>
  );

  const articleStyle = cn(css.article, {[css.dark]: themeMode});
  const tagsStyle = cn(css.article__tagsItem, {[css.dark__tags]: themeMode});

  return (
    <article className={articleStyle}>
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
              <span className={css.article__username}>{author.username}</span>
              <span>{date}</span>
            </div>
            <img className={css.article__avatar} src={author.image} width="46" height="46" alt="Avatar"/>
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
                <Button className={css.article__delete} type="danger">
                  Delete
                </Button>
              </Popconfirm>
              <Button className={css.article__edit} type="primary" onClick={onBtnEditClick}>
                Edit
              </Button>
            </div>
          ) : null}
        </div>
      </header>
      <section className={css.article__body}>{isFull ? <ReactMarkdown source={body}/> : null}</section>
    </article>
  );
}

ArticleItem.defaultProps = {
  article: {},
  isFull: false,
  onDelete: () => {
  },
};

ArticleItem.propTypes = {
  article: PropTypes.instanceOf(Object),
  isFull: PropTypes.bool,
  onDelete: PropTypes.func,
};


export default ArticleItem;