const Input = ({ label, type, idName, onChange, value, className }) => {
  return (
    <div className={`${className} mt-2`}>
      <label className="inline-block font-semibold mb-0.5" htmlFor="email">
        {label}
      </label>
      <input
        className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
        type={type}
        id={idName}
        name={idName}
        placeholder={value}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
