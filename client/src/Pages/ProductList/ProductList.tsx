/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Card } from '../../component/Card/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Category } from '../../utils/Categoris';
import { Pagination } from '../../component/Pagination/Pagination';
import { getProducts } from '../../features/productsSlice';
import { SearchBar } from '../../component/searchingBar/SearchBar';
import { Loader } from '../../component/loader/Loader';
import { Product } from '../../utils/Product';
import './ProductList.scss';
import { usePaginationHook } from '../../utils/PaginationHook';
import { useSearchContext } from '../../utils/Context';
import { Sort } from '../../component/soringComponent/Sort';
import { Price, Rating } from '../../utils/Sort';
;

interface ProductProps {
    category: Category | null;
}

export const ProductList = ({category}: ProductProps) => {
    const [categoryProduct, setCategoryProduct] = useState<Product[]>([]);
    const { search, price, rating, handleSortPrices, handleSortRating } = useSearchContext();
    const { products, loading } = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();
    const { firstItem, lastItem, pages, currPage, setCurrPage } = usePaginationHook(categoryProduct.length);
    // const [price, setPrice] = useState(Price.Price);
    // const [rating, setRating] = useState(Rating.Rating);

    useEffect(() => {
        const loadingData = async () => {
            await dispatch(getProducts());
            let newProduct = products;

            if (products.length) {
            
                if (category) {
                newProduct = newProduct.filter(product => product.category === category);
                }
                if (search) {
                    newProduct = newProduct.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
                }

                if (rating !== Rating.Rating) {
                    switch (rating) {
                        case Rating.RatingUp: newProduct = newProduct.sort((a, b) => a.rating - b.rating);
                            break;
                        case Rating.RatingDown: newProduct = newProduct.sort((a, b) => b.rating - a.rating);
                            break;
                        default: return newProduct;
                    }
                }

                if(price !== Price.Price) {
                    switch(price) {
                        case Price.PriceUp: newProduct.sort((a, b) => a.price - b.price);
                        break;
                        case Price.PriceDown: newProduct.sort((a, b) => b.price - a.price);
                        break;
                        default: return newProduct;
                    }
                }

                newProduct = newProduct.slice(firstItem, lastItem);
            }

            setCategoryProduct(newProduct);
        }
        
        loadingData();

    }, [category, dispatch, search, price, rating]);


    return (
        <section className="productList">
            <SearchBar />
            <h2 className="productList__title">{category}</h2>
            <Sort handleSortPrices={handleSortPrices} price={price} rating={rating} handleSortRating={handleSortRating} />
            <div className="productList__container">
                {!!categoryProduct.length && categoryProduct.map(product => <Card product={product} key={product._id} />)}
                {!categoryProduct.length && !loading && <div>No products yet</div>}
                {loading && !categoryProduct.length && <Loader />}
            </div>
            <Pagination pages={pages} currPage={currPage} setCurrPage={setCurrPage} />
        </section>
    )
}