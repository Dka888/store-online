import { Card } from '../../component/Card/Card';
import { products } from '../../api/api';
import { Category } from '../../utils/Categoris';
import './ProductList.scss';


interface ProductProps {
    category: Category;
}

export const ProductList = ({category}: ProductProps) => {

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