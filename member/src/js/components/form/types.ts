export type SerializableObject = { [key: string]: Serializable };
export type SerializableArray = Array<Serializable>;
export type Serializable = string | number | boolean | null | SerializableObject | SerializableArray;

export interface FieldProps {
  id: string;
  label?: string;
  required?: boolean;
  fieldType: string;
  type?: string;
  defaultOpts?: FieldOptions;
  defaultValue?: Serializable;
  validate?: (value: Serializable) => FieldError | null;
}

export interface FieldError {
  message: React.ReactNode;
}

export interface FieldSetters {
  setValue: (value: Serializable) => void;
  setOpts: (opts: FieldOptions) => void;
  setError: (error: FieldError) => void;
}

export type FieldInstance = FieldProps & FieldSetters;

export interface FieldOptions {
  skip?: boolean;
}

export interface FormInstance {
  fields: NestedRecord<FieldInstance>;
  values: NestedRecord<Serializable>;
  options: NestedRecord<FieldOptions>;
  errors: NestedRecord<FieldError>;
  fieldIds: string[];
  dirty: boolean;
  valid: boolean;
}

export interface FieldChangeEvent {
  id: string;
  value: Serializable;
  options: FieldOptions;
  valueChanges?: NestedRecord<Serializable>;
  optionChanges?: NestedRecord<FieldOptions>;
}
