import { useState } from 'react';
import { Product } from '../../utils/Product';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { products } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToBasket } from '../../features/basketSlice';

import './Card.scss';


interface CardProps {
    product: Product;
}

export const Card = ({product}: CardProps) => {
    const {name, price, description } = product;
    const [counterClick, setCounterClick] = useState(1);
    const [sumStars, setSumStars] = useState(0);

    const dispatch = useAppDispatch();

    const handleClickStars = (number: number, id: string) => {
        setCounterClick(counterClick + 1);
        setSumStars(sumStars + number);

        countingRating();
    }

    function countingRating() {
        const rating = Math.round(sumStars / counterClick) > 0 
        ? Math.round(sumStars / counterClick)
        : 1;
        const productCard = products.find(product => product.id);

        if (productCard) {
            productCard.rating = rating; 
            console.log(productCard.rating);
        }
        // axios.patch(`http://localhost:3333/products/${id}`, 
        // {method: 'PATCH',
        // headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify({
        // rating, })
    }
     const items = useAppSelector(state => state.basket.items);

    const handletoAdd = () => {
        if(items.find(item => item.id === product.id)) {
            return;
        }
        dispatch(addToBasket(product));
    }


    return (

        <div className="card">
            <Link to={`/cartInfo/${product.id}`} className='card__link'>
            <img
                src={product.imgUrl}
                alt={product.name}
                className="card_apple"
            ></img>

                <h2 className="card_descript">{name}</h2>
              
                <div className="card_code">Product code: {product.id}</div>
            </Link> 
                <div className="card_rew">
                    <div className={`stars stars--${product.rating}`}>
                        <div className="stars__star" onClick={() => handleClickStars(1, product.id)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(2, product.id)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(3, product.id)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(4, product.id)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(5, product.id)}></div>
                    </div>
                    <div className="review">
                        Rating: {product.rating}
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