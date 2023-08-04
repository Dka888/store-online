import React from 'react';
import './Basket.scss';
import { Button } from '../button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToBasket, removeAllFromBasket, removeFromBasket } from '../../features/basketSlice';
import { Product } from '../../utils/Product';

export const Basket = () => {

    const basketItems = useAppSelector((state) => state.basket.items);
    const dispatch = useAppDispatch();
    const suma = basketItems.reduce((acc, curr) => acc + curr.price, 0);
    console.log(basketItems);

    const handleDelete = (id: string) => {
        dispatch(removeFromBasket(id))
    };
    const handleDeleteAll = () => {
        dispatch(removeAllFromBasket());
    };

    const handleAdd = (product: Product) => {
        dispatch(addToBasket(product));
    };

    return (
        <div className="basket">
            <h2 className='basket__title'>Basket</h2>
            <div className='basket__container'>

                <section className="basket__product-list">
                   {basketItems.map(product => 
                   <React.Fragment key={product.id}>
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
                    <Button name='going to payment' action={handleDeleteAll} />
                </section>
            </div>
        </div>
    )
}