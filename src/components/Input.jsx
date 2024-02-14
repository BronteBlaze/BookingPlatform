const Input = ({
  type,
  id,
  placeholder,
  value,
  readonly,
  onChange,
  errorClassName,
  defaultValue,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={id}
      className={`border-b ${errorClassName} h-10 bg-transparent text-center text-white`}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      readOnly={readonly && true}
      onChange={onChange}
    />
  );
};

export default Input;
