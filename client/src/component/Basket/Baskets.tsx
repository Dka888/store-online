import React from 'react';
import './Basket.scss';
import { Button } from '../button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeQuantities, removeAllFromBasket } from '../../features/basketSlice';
import { Category } from '../../utils/Categoris';
import { status } from '../../utils/Basket';

export interface ProductsInBasket {
    quantity: number,
    status: status;
    imgUrl: string;
    name: string;
    category: Category;
    price: number;
    rating: number;
    description: string;
    _id: string;
    click: number;
}

export const Baskets = () => {
    const basketItems = useAppSelector((state) => state.basket.items);
    const dispatch = useAppDispatch();

    const listOfItems = basketItems.map(item => {
        const { productId, quantity, status } = item;
        const fullProduct = { ...productId, quantity, status };
     
        return fullProduct;
    });

    let suma = 0;

    if (listOfItems.length) {
        suma = listOfItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    }

    const handleDeleteAll = () => {
        dispatch(removeAllFromBasket());
    };


    const isProducts = listOfItems.length > 0;

    const handleAddQuantity = (product: ProductsInBasket) => {
        const { quantity } = product;
        const newQuantity = quantity + 1;
        const newProduct = { ...product, quantity: newQuantity }
        dispatch(changeQuantities(newProduct));
    }

    const handleMinusQuantity = (product: ProductsInBasket) => {
        const  { quantity } = product;
        const newQuantity = quantity - 1;
        const newProduct = { ...product, quantity: newQuantity }
        console.log(quantity, newQuantity, product)
        dispatch(changeQuantities(newProduct));
    }

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
                                        <p>Price: {product.price}</p>
                                    </div>


                                </div>
                                <div>
                                    <div>Quantity: {product.quantity}</div>
                                </div>
                                <div>
                                    <Button name="+" action={() => handleAddQuantity(product)} />
                                    <Button name='-' action={() => handleMinusQuantity(product)} />
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