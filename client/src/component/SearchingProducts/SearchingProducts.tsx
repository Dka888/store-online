import { useEffect, useMemo, useState } from 'react';
import { Card } from '../../component/Card/Card';
import { Pagination } from '../../component/Pagination/Pagination';
import { SearchBar } from '../../component/searchingBar/SearchBar';
import { Product } from '../../utils/Product';
import { useParams } from 'react-router-dom';
import './SearchProducts.scss';
import { usePaginationHook } from '../../utils/PaginationHook';
import { useSearchContext } from '../../utils/Context';
;


export const SearchingProducts = () => {
    const [searchProducts, setSearchProducts] = useState<Product[]>([]);
    const { search, products } = useSearchContext();
    const { query } = useParams();

    useEffect(() => {
        if (products.length && query) {
            const newProduct = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
            setSearchProducts(newProduct);
        }
    }, [products, query]);

    const forPages = searchProducts.length || 1;
    const { firstItem, lastItem, pages, currPage, setCurrPage } = usePaginationHook(forPages);

    const searchProduct = useMemo(() => {
        let tempProducts = products;
        if (search) {
            tempProducts = tempProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        }

        tempProducts = tempProducts.slice(firstItem, lastItem);

        return tempProducts;
    }, [firstItem, lastItem, search, products]);


    return (
        <section className="productList">
            <SearchBar />
            <h2 className="productList__title">{search || query}</h2>

            <div className="productList__container">
                {!!searchProduct.length
                    ? searchProduct.map(product => <Card product={product} key={product._id} />)
                    : <div>No products</div>}
            </div>
            <Pagination pages={pages} currPage={currPage} setCurrPage={setCurrPage} />
        </section>
    )
}