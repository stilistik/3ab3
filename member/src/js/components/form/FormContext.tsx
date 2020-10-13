import React from 'react';
import { FieldInstance, Serializable, FieldOptions } from './types';
import { FormProps } from './Form';

export interface FormContextValue {
  registerField: (id: string, fieldProps: FieldInstance) => void;
  unregisterField: (id: string) => void;
  setFieldValue: (id: string, value: Serializable) => void;
  onFieldCommit: FormProps['onFieldCommit'];
  onFieldOptionSelected: FormProps['onFieldOptionSelected'];
  setFieldOptions: (id: string, opts: FieldOptions) => void;
  requestSubmit: () => void;
  disableHelpText?: boolean;
  canSubmit: boolean;
}

export const FormContext = React.createContext<FormContextValue | undefined>(undefined);

export const useFormContext = (): FormContextValue => {
  const contextValue = React.useContext(FormContext);
  if (contextValue === undefined) throw new Error('useFormContext must be used within a Form.');
  return React.useContext(FormContext);
};
