import { useEffect, useState } from 'react';
import { Card } from '../../component/Card/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Category } from '../../utils/Categoris';
import { Pagination } from '../../component/Pagination/Pagination';

import { getProducts } from '../../features/productsSlice';
import { useParams } from 'react-router-dom';
import { SearchBar } from '../../component/searchingBar/SearchBar';
import { Loader } from '../../component/loader/Loader';
import { Product } from '../../utils/Product';
import './ProductList.scss';
import { usePaginationHook } from '../../utils/PaginationHook';

interface ProductProps {
    category: Category | null;
}

export const ProductList = ({category}: ProductProps) => {
    const [categoryProduct, setCategoryProduct] = useState<Product[]>([]);
    const { query } = useParams();

    const { products, loading } = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadingData = async () => {
            await dispatch(getProducts());
            let newProduct = products;

            if (category && products.length) {
                newProduct = newProduct.filter(product => product.category === category);
            }
            if (query && products.length) {
                newProduct = newProduct.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
            }
            setCategoryProduct(newProduct);
        }
        loadingData();
    }, [category, dispatch, products, query]);
    
    const {firstItem, lastItem, pages, currPage, setCurrPage} = usePaginationHook(categoryProduct.length);
    const productOnPage = categoryProduct.slice(firstItem, lastItem);

    return (
        <section className="productList">
            <SearchBar />
            <h2 className="productList__title">{category}</h2>

            <div className="productList__container">
                {!!categoryProduct.length && productOnPage.map(product => <Card product={product} key={product._id} />)}
                {!categoryProduct.length && !loading && <div>No products yet</div>}
                {loading && !categoryProduct.length && <Loader />}
            </div>
            <Pagination pages={pages} currPage={currPage} setCurrPage={setCurrPage} />
        </section>
    )
}