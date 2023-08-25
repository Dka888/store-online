import React, { useEffect, useState } from 'react';
import './Basket.scss';
import { Button } from '../button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeQuantities, deleteItem, removeAllFromBasket } from '../../features/basketSlice';
import { Category } from '../../utils/Categoris';
import { status } from '../../utils/Basket';
import { useSearchContext } from '../../utils/Context';

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

interface Props {
    listOfProduct: ProductsInBasket[],
    handleAddQuantity: (product: ProductsInBasket) => void,
    handleMinusQuantity: (product: ProductsInBasket) => void,
}

export const Baskets = (
    // {listOfProduct, handleAddQuantity, handleMinusQuantity}: Props
    ) => {
    // const [listOfProduct, setListOfProduct] = useState<ProductsInBasket[]>([]);

    const dispatch = useAppDispatch();
    // const basketItems = useAppSelector((state) => state.basket.items); 

    // useEffect(() => {
    //     if (basketItems.length) {
    //         const filteredItems = basketItems.filter(item => item.status === status.in_Cart);
    //         const listOfItems = filteredItems.map(item => {
    //             const { productId, quantity, status } = item;
    //             const fullProduct = { ...productId, quantity, status };
                
    //             return fullProduct;
    //         });

    //         setListOfProduct(listOfItems);
    //     }
    // }, [basketItems, dispatch]);

    const {handleAddQuantity, handleMinusQuantity, listOfProduct} = useSearchContext()
    let suma = 0;

    if (listOfProduct.length) {
        suma = listOfProduct.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    }

    const handleDeleteAll = () => {
        dispatch(removeAllFromBasket());
    };


    const isProducts = listOfProduct.length > 0;

    // const handleAddQuantity = (product: ProductsInBasket) => {
    //     const { quantity } = product;
    //     const newQuantity = quantity + 1;
    //     const newProduct = { ...product, quantity: newQuantity }
    //     dispatch(changeQuantities(newProduct));

    //     const replace = listOfProduct.map(item => item._id === newProduct._id ? newProduct : item);
    //     setListOfProduct(replace);
    // }

    // const handleMinusQuantity = (product: ProductsInBasket) => {
      
    //     const  { quantity } = product;
    //     const newQuantity = quantity - 1;
    //     const newProduct = { ...product, quantity: newQuantity }
    //     if (newQuantity === 0) {
    //         dispatch(deleteItem(product._id));
    //         const replace = listOfProduct.filter(item => item._id !== newProduct._id);
    //         setListOfProduct(replace);
    //     } else {
           
    //         dispatch(changeQuantities(newProduct));
            
    //         const replace = listOfProduct.map(item => item._id === newProduct._id ? newProduct : item);
    //         setListOfProduct(replace);
    //     }

    // }

    return (
        <div className="basket">
            <h2 className='basket__title'>Basket</h2>
            <div className='basket__container'>
                <section className="basket__product-list">
                    {isProducts ?
                        listOfProduct.map(product =>
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