import React from 'react';
import PropTypes from 'prop-types';
import css from './error-indicator.module.scss';

const ErrorIndicator = ({ errorMessage = {} }) => (
  <p className={css.error}>
    {errorMessage}
  </p>
);

export default ErrorIndicator;

ErrorIndicator.defaultProps = {
  errorMessage: '',
};

ErrorIndicator.propTypes = {
  errorMessage: PropTypes.string,
};