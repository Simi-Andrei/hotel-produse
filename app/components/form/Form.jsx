const Form = ({ children, onSubmit, className }) => {
  return (
    <form className={`${className} p-4`} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
