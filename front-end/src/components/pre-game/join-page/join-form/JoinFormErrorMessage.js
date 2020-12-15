import React from 'react';
import _ from 'lodash';

// Displays the error message box with the username join form
const JoinFormErrorMessage = ({ formError, errors }) => {
  const usernameErrors = errors?.username;
  if (formError || usernameErrors) {
    const maxLengthError = usernameErrors && usernameErrors.types?.maxLength;
    const minLengthError = usernameErrors && usernameErrors.types?.minLength;
    const patternError = usernameErrors && usernameErrors.types?.pattern;
    const requiredError = usernameErrors && usernameErrors.types?.required;
    return (
      <div className={'ui error message compact'}>
        <ul className={'list'}>
          {maxLengthError && <li>{maxLengthError}</li>}
          {minLengthError && <li>{minLengthError}</li>}
          {patternError && <li>{patternError}</li>}
          {requiredError && <li>{requiredError}</li>}
          {formError && <li>{formError}</li>}
        </ul>
      </div>
    );
  }
  return null;
};

export default JoinFormErrorMessage;
