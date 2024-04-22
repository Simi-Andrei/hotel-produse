const SearchProductButton = () => {
  return (
    <form>
      <input
        className="py-1 px-2 rounded focus:outline-gray-300 border border-gray-200 bg-gray-50"
        type="text"
        id="search"
        name="search"
        placeholder="Cauta..."
      />
    </form>
  );
};

export default SearchProductButton;
