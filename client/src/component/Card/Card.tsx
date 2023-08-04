import { useState } from 'react';
import { Product } from '../../utils/Product';

import axios from 'axios';
import { products } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToBasket } from '../../features/basketSlice';


import './Card.scss';
interface CardProps {
    product: Product;
}

export const Card = ({product}: CardProps) => {
    const {name, price, description, rating} = product;
    const [counterClick, setCounterClick] = useState(0);
    const [sumStars, setSumStars] = useState(0);

    const dispatch = useAppDispatch();

    const handleClickStars = (number: number, id: string) => {
        setCounterClick(counterClick + 1);
        setSumStars(sumStars + number);
        const rating = Math.round(sumStars / counterClick);
        const productCard = products.find(product => product.id);

        if (productCard) {
            productCard.rating = rating; 
            console.log(productCard.rating);
        }
        // axios.patch(`http://localhost:3333/products/${id}`, {rating, })
    }

    const handletoAdd = () => {
        dispatch(addToBasket(product));
    }

    const item = useAppSelector(state => state.basket.items);

    console.log(item);

    return (
        <div className="card">
            <img
                src="images/imac.jpeg"
                alt="Apple A1419 iMac 27 Retina 5K"
                className="card_apple"
            ></img>

                <h2 className="card_descript">{name}</h2>
                <p>{description}</p>
                <div className="card_code">Product code: 195434</div>

                <div className="card_rew">
                    <div className={`stars stars--${product.rating}`}>
                        <div className="stars__star" onClick={() => handleClickStars(1, product.id)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(2, product.id)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(3, product.id)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(4, product.id)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(5, product.id)}></div>
                    </div>
                    <div className="review">
                        Rating: {rating}
                    </div>
                </div>

                <div className="card_price">
                    <div className="price">Price</div>
                    <div className="price_value">{price}</div>
                </div>

                <button
                    onClick={handletoAdd}
                    className="card_buy"
                >
                    Buy
                </button>
        </div>

    )
}