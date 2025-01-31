import { ChangeEvent, FocusEvent } from 'react';

interface FormInputProps {
  isDirty: boolean;
  errorMessage: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent) => void;
  placeholder: string;
  type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  isDirty,
  errorMessage,
  value,
  onChange,
  onBlur,
  placeholder,
  type,
  ...props
}) => {
  const outlineColor = isDirty && errorMessage ? 'red' : 'gray';
  return (
    <>
      {isDirty && errorMessage && (
        <div className="text-red-500">{errorMessage}</div>
      )}
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type || 'text'}
        placeholder={placeholder}
        className={`outline-1 px-4 py-2 rounded-xl outline-${outlineColor} mb-4 w-100`}
        style={{ outlineColor: outlineColor }}
        {...props}
      />
    </>
  );
};
