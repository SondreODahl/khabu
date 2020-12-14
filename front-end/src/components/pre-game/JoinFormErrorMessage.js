import React from 'react';
import _ from 'lodash';

// Displays the error message box with the username join form
const JoinFormErrorMessage = ({ formError, errors }) => {
  const usernameErrors = errors?.username;
  if (formError || usernameErrors) {
    return (
      <div className={'ui error message compact'}>
        <ul className={'list'}>
          {usernameErrors && usernameErrors.types?.pattern && (
            <li>Username must be only letters and numbers</li>
          )}
          {usernameErrors && usernameErrors.types?.maxLength && (
            <li>Username must be maximum 20 characters</li>
          )}
          {usernameErrors && usernameErrors.types?.minLength && (
            <li>Username must be minimum 5 characters</li>
          )}
          {usernameErrors && usernameErrors.types?.required && (
            <li>Username must be minimum 5 characters</li>
          )}
          {formError && <li>{formError}</li>}
        </ul>
      </div>
    );
  }
  return null;
};

export default JoinFormErrorMessage;
