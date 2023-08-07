import { useEffect } from 'react';
import { Card } from '../../component/Card/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Category } from '../../utils/Categoris';
import './ProductList.scss';
import { getProducts } from '../../features/productsSlice';


interface ProductProps {
    category: Category;
}

export const ProductList = ({category}: ProductProps) => {

    const products  = useAppSelector(state => state.products.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    console.log(products)
    const categoryProduct = products.filter(product => product.category === category);

    return (
        <section className="productList">
            <h2 className="productList__title">{category}</h2>
            <div className="productList__container">
                {categoryProduct.map(product =>
                    <Card product={product} />
                )}
            </div>
        </section>
    )
}