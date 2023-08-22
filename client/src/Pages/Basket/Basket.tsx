import React from 'react';
import './Basket.scss';
import { Button } from '../../component/button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeAllFromBasket } from '../../features/basketSlice';


export const Basket = () => {
    const basketItems = useAppSelector((state) => state.basket.items);
    const dispatch = useAppDispatch();

    const listOfItems = basketItems.map(product => {
        const { _id, name, imgUrl, price } = product;
        const newProduct = {
            _id,
            name,
            imgUrl,
            price,
            quantity: 1,
        };

        return newProduct;
    });

    const suma = listOfItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    const handleDeleteAll = () => {
        dispatch(removeAllFromBasket());
    };


    const isProducts = listOfItems.length > 0;

    return (
        <div className="basket">
            <h2 className='basket__title'>Basket</h2>
            <div className='basket__container'>

                <section className="basket__product-list">
                    {isProducts ?
                        listOfItems.map(product =>
                        <React.Fragment key={product._id}>
                            <hr style={{ width: '70%', margin: 0 }}></hr>
                            <div className="basket__product">
                                <img src={product.imgUrl} alt={product.name} />
                                <div>
                                    <h2>{product.name}</h2>
                                    <p>Cena: {product.price}</p>
                                </div>


                            </div>

                        </React.Fragment>)
                        : <div>Nothing in the basket!</div>}

                </section>

                {isProducts && 
                    <section className="basket__cart">
                    <p className="basket__total">Suma: ${suma}</p>
                    <Button name='going to payment' action={handleDeleteAll} />
                    </section>}
            </div>
        </div>
    )
}