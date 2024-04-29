const Title = ({ className, title }) => {
  return (
    <h2 className={`${className} text-center text-xl font-semibold my-3`}>
      {title}
    </h2>
  );
};

export default Title;
