import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-taupe-400 dark:text-taupe-600" strokeWidth={2} />
      </div>
      
      <input
        type="text"
        value={searchValue}
        className="block w-full pl-10 pr-10 py-2 border border-cream-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-neutral-100 placeholder-taupe-500 dark:placeholder-taupe-500 focus:outline-none focus:ring-2 focus:ring-taupe-400 focus:border-transparent transition-colors text-sm"
        placeholder="Search by name, company, industry..."
        onChange={(e) => handleChange(e.target.value)}
      />
      
      {/* Clear button */}
      {searchValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-2 flex items-center text-taupe-400 hover:text-taupe-700 dark:hover:text-taupe-300 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
