import React, { useState } from 'react';
import './SearchBar.scss';



export const SearchBar = () => {
  const [query, setQuery] = useState('');
  
  // const products = useAppSelector(state => state.products.products);
    // const filteredProducts = useMemo(() => {
    //   let newProducts = products;

    //   const trimmedQuery = query.trim().toLowerCase();

    //   if(query) {
    //     newProducts = newProducts.filter(product => product.name.toLowerCase().includes(trimmedQuery))
    //   }

    //   return newProducts;
    // }, [query]);

    // console.log(filteredProducts);

    return (
    <form
      method="get"
      action={`/products/${query.trim()}`}
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
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </div>
    </form>
    )
};
