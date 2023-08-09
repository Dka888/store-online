import React from 'react';
import './SearchBar.scss';
import { useSearchContext } from '../../utils/Context';

// interface SearchBarProps {
//   search: string,
//   setSearch: (search: string) => void,
// }

export const SearchBar = (
// {search, setSearch}: SearchBarProps
) => {
  const {search, handleQuery} = useSearchContext();
  // const hadleQuery = (word: string) => {
  //   setSearch(word);
  // }


    return (
    <form
      method="get"
      action={`/products/${search.trim()}`}
      className='search-form'
    >
      <div className="search-div">
        <div
          className="image"
        ></div>
        <input
          name="search"
          type="text"
          className="search-input"
          placeholder="Write here what you are looking for..."
          onChange={(e) => handleQuery(e.target.value)}
          value={search}
        />
      </div>
    </form>
    )
};
