import React from 'react';
import './SearchBar.scss';



export const SearchBar = () => {
    return (
    <form
      method="get"
      action="https://localhost:3000/products"
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
        />
      </div>
    </form>
    )
};
