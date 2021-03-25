import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import { FormInput } from '../form-input';
import css from './tag-form.module.scss';

const TagForm = ({ onAddTag }) => {
  const { handleSubmit, register, errors, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      addingTag: '',
    },
  });

  const addTag = ({ addingTag }) => {
    onAddTag(addingTag);
    reset();
  };

  return (
    <form className={css.tagForm} onSubmit={handleSubmit(addTag)}>
      <FormInput
        ref={register({
          required: 'Should not be empty',
        })}
        id="addingTag"
        error={errors.addingTag}
        label=""
        type="text"
        name="addingTag"
      />
      <button type="submit" className={css.tagForm__submit}>
        Add tag
      </button>
    </form>
  );
};

export default TagForm;

TagForm.defaultProps = {
  onAddTag: () => {},
};

TagForm.propTypes = {
  onAddTag: PropTypes.func,
};
