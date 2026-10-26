import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onQueryChange: (queryValue: string) => void;
}

function SearchBox({ onQueryChange }: SearchBoxProps) {
  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onQueryChange(e.target.value),
    300
  );

  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        onChange={updateSearchQuery}
      />
    </div>
  );
}

export default SearchBox;
