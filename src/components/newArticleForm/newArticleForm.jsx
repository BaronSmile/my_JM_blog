import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import css from './newArticleForm.module.scss';
import { FormInput } from '../form-input';
import { ErrorIndicator } from '../error-indicator';

const NewArticleForm = ({ onSubmitArticle, article = {} }) => {
  const { handleSubmit, errors, register } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
    },
  });

  const onSubmit = (data) => {
    onSubmitArticle(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        ref={register({
          required: 'Title is required',
        })}
        label="Title"
        id="title"
        error={errors.title}
        type="text"
        name="title"
      />

      <FormInput
        label="Short description"
        id="description"
        ref={register({
          required: 'Short description is required',
        })}
        error={errors.description}
        type="text"
        name="description"
      />

      <div className={css.newArticleForm__Textarea}>
        <label htmlFor="body">Text</label>
        <textarea
          className={css.newArticleForm__input}
          type="textarea"
          name="body"
          id="body"
          placeholder="Text"
          ref={register({
            required: 'Text is required',
          })}
        />
        {errors.body && <ErrorIndicator errorMessage={errors.body.message} />}
      </div>

      <Button className={css.newArticleForm__Submit} type="primary" htmlType="submit">
        Send
      </Button>
    </form>
  );
};

export default NewArticleForm;

NewArticleForm.defaultProps = {
  article: {},
};

NewArticleForm.propTypes = {
  onSubmitArticle: PropTypes.func.isRequired,
  article: PropTypes.instanceOf(Object),
};
