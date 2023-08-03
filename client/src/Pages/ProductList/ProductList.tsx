import { Card } from '../../component/Card/Card';
import { Product } from '../../utils/Product';
import {Category} from '../../utils/Categoris';
import './ProductList.scss';

interface ProductProps {
    category: Category
}

export const ProductList = ({category}: ProductProps) => {

    const products: Product[] = [
        { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Technology, rating: 4.8 },
        { name: 'MacBook', description: 'jhseflwiaget;iea/hgrot', price: 1900, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', rating: 4.7, category: Category.Technology },
        { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Food, rating: 4.8 },
        { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Sport, rating: 4.8 },
        { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Garden, rating: 4.8 },
    ];

    const categoryProduct  = products.filter(product => product.category === category);

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