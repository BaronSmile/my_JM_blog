import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import css from './tag-list.module.scss';

function TagList({ tags, onDeleteTag }) {
  const themeMode = useSelector((state) => state.isDarkMode);

  const elements = tags.map(({ id, name }) => (
    <li key={id} className={css.tags__item}>
      <span className={css.tags__tag}>{name}</span>
      <button
        type="button"
        className={css.tags__delete}
        onClick={() => {
          onDeleteTag(id);
        }}
      >
        Delete
      </button>
    </li>
  ));

  const tagsStyle = cn({ [css.dark__tags]: themeMode });

  return (
    <div className={tagsStyle}>
      <h3 className={css.tags__title}>Tags</h3>
      <ul className={css.tags__list}>{elements}</ul>
    </div>
  );
}

export default TagList;

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
  onDeleteTag: PropTypes.func,
};
