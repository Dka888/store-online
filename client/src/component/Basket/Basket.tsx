import React from 'react';
import './Basket.scss';
import { Button } from '../button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeAllFromBasket } from '../../features/basketSlice';


export const Basket = () => {
    const basketItems = useAppSelector((state) => state.basket.items);
    const dispatch = useAppDispatch();

    const listOfItems = basketItems.map(product => {
        const { id, name, imgUrl, price } = product;
        const newProduct = {
            id,
            name,
            imgUrl,
            price,
            quantity: 1,
        };

           return newProduct;
       });

    const suma = listOfItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    // const handleDelete = (id: string) => {
    //     dispatch(removeFromBasket(id))
    // };
    const handleDeleteAll = () => {
        dispatch(removeAllFromBasket());
    };

    // const handleAdd = (id: string) => {
    //    listOfItems.map(item => {
    //         item.id === id && item.quantity++;
    //         console.log(listOfItems);
    //     })
    // };


    return (
        <div className="basket">
            <h2 className='basket__title'>Basket</h2>
            <div className='basket__container'>

                <section className="basket__product-list">
                    {listOfItems.map(product => 
                   <React.Fragment key={product.id}>
                    <hr style={{ width: '70%', margin: 0 }}></hr>
                    <div className="basket__product">
                        <img src={product.imgUrl} alt={product.name} />
                        <div>
                            <h2>{product.name}</h2>
                            <p>Cena: {product.price}</p>
                               </div>
                               {/* <div className="basket__product-buttons"> 
                            <Button name="+" action={() => handleAdd(product.id)} />  
                            <Button name="-" action={() => handleDelete(product.id)} />
                        </div>  */}

                    </div>
                           {/* <p>{product.quantity}</p> */}
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