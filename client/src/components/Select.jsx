const Select = (options, onChange) => {
  return (
    <select onChange={(e) => onChange(e)}>
      {options.length &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
    </select>
  );
};
export default Select;
