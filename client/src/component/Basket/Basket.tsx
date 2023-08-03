import React from 'react';
import { Product } from '../../utils/Product';
import './Basket.scss';
import { Category } from '../../utils/Categoris';
import { Button } from '../button/Button';

export const Basket = () => {
    const products: Product[] = [
        { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Technology, rating: 4.8 },
        { name: 'MacBook', description: 'jhseflwiaget;iea/hgrot', price: 1900, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', rating: 4.7, category: Category.Technology },
        { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Food, rating: 4.8 },
        { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Sport, rating: 4.8 },
        { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Garden, rating: 4.8 },
    ];

    const suma = products.reduce((acc, curr) => acc + curr.price, 0);

    const handleDelete = () => {

    }
    return (
        <div className="basket">
            <h2 className='basket__title'>Basket</h2>
            <div className='basket__container'>

                <section className="basket__product-list">
                   {products.map(product => 
                   <React.Fragment key={product.description}>
                    <hr style={{ width: '70%', margin: 0 }}></hr>
                    <div className="basket__product">
                        <img src={product.imgUrl} alt={product.name} />
                        <div>
                            <h2>{product.name}</h2>
                            <p>Cena: {product.price}</p>
                        </div>   
                    </div>
                   </React.Fragment>)}
                    
                </section>

                <section className="basket__cart">
                    <p className="basket__total">Suma: ${suma}</p>
                    <Button name='going to payment' action={handleDelete} />
                </section>
            </div>
        </div>
    )
}