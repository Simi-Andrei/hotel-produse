const SearchProductButton = ({ page }) => {
  return (
    <>
      <input
        className="py-1 px-2 w-64 rounded focus:outline-gray-300 border border-gray-200 bg-gray-50"
        type="text"
        placeholder="Cauta..."
      />
    </>
  );
};

export default SearchProductButton;
