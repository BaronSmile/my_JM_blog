import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import css from './form-input.module.scss';
import { ErrorIndicator } from '../error-indicator';

const FormInput = forwardRef((props, ref) => {
  const { id, label, error, serverErrors, ...inputProps } = props;

  return (
    <div className={css.formInput}>
      <label htmlFor={id}>{label}</label>
      <input className={css.formInput__input} id={id} placeholder={label} ref={ref} {...inputProps} />
      {error && <ErrorIndicator errorMessage={error.message} />}
      {serverErrors[id] && <ErrorIndicator errorMessage={`${label} ${serverErrors[id]}`} />}
    </div>
  );
});

FormInput.defaultProps = {
  error: {},
  serverErrors: {},
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.instanceOf(Object),
  serverErrors: PropTypes.instanceOf(Object),
};

export default FormInput;
