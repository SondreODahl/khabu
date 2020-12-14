import React from 'react';
import _ from 'lodash';

// Displays the error message box with the username join form
const JoinFormErrorMessage = ({ formError, errors }) => {
  const usernameErrors = errors?.username;
  const patternError = usernameErrors && usernameErrors.types?.pattern;
  const maxLengthError = usernameErrors && usernameErrors.types?.maxLength;
  const minLengthError = usernameErrors && usernameErrors.types?.minLength;
  const requiredError = usernameErrors && usernameErrors.types?.required;
  if (formError || usernameErrors) {
    return (
      <div className={'ui error message compact'}>
        <ul className={'list'}>
          {patternError && <li>Username must be only letters and numbers</li>}
          {maxLengthError && <li>Username must be maximum 20 characters</li>}
          {minLengthError && <li>Username must be minimum 5 characters</li>}
          {requiredError && <li>Username must be minimum 5 characters</li>}
          {formError && <li>{formError}</li>}
        </ul>
      </div>
    );
  }
  return null;
};

export default JoinFormErrorMessage;
