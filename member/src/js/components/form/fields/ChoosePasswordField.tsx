import React from 'react';
import { Icon } from 'Components/icon';
import { FieldError } from '../types';
import { TextField, TextFieldProps } from './TextField';

function countUniqueCharacters(value: string): number {
  const letters: { [key: string]: number } = {};
  for (let i = 0; i < value.length; ++i) {
    const l = value.charAt(i);
    letters[l] = isNaN(letters[l]) ? 1 : letters[l] + 1;
  }
  return Object.keys(letters).length;
}

function validatePassword(value: string): FieldError {
  const REQUIRED_CRITERIA = 2;

  if (!value || value.length < 8) return { message: 'Password must be at least 8 characters long' };
  if (countUniqueCharacters(value) < 3) {
    return {
      message: 'Password must contain at least 3 distinct characters',
    };
  }

  const hasNumber = value.match(/[0-9]/g) && true;
  const hasLowerCase = value.match(/[a-z]/g) && true;
  const hasUpperCase = value.match(/[A-Z]/g) && true;
  const hasSpecial = value.match(/[!@#$%^&*(),.?":{}|<>]/g) && true;
  const metRequirements =
    [hasNumber, hasLowerCase, hasUpperCase, hasSpecial].filter((el) => el && true).length >= REQUIRED_CRITERIA;
  if (!metRequirements) {
    const icon = (
      <Icon
        style={{
          fontSize: 11,
          color: '#2cde68',
          marginBottom: -2,
          marginLeft: 5,
        }}
        type="checkCircle"
      />
    );
    return {
      message: (
        <React.Fragment>
          <p>Password must meet at least {REQUIRED_CRITERIA} of the following criteria:</p>
          <ul>
            <li>
              Contain at least one lowercase character
              {hasLowerCase && icon}
            </li>
            <li>
              Contain at least one uppercase character
              {hasUpperCase && icon}
            </li>
            <li>
              Contain at least one number
              {hasNumber && icon}
            </li>
            <li>
              Contain at least one special character
              {hasSpecial && icon}
            </li>
          </ul>
        </React.Fragment>
      ),
    };
  }
}

type ChoosePasswordFieldProps = TextFieldProps;

export const ChoosePasswordField: React.FC<ChoosePasswordFieldProps> = (props) => {
  return <TextField validate={validatePassword} {...props} />;
};
