import { useState } from 'react';
import { Product } from '../../utils/Product';
import './Card.scss';

interface CardProps {
    product: Product;
}

export const Card = ({product}: CardProps) => {
    const {name, price, description, rating} = product;
    const [counterClick, setCounterClick] = useState(0);
    const [sumStars, setSumStars] = useState(0);

    const handleClickStars = (number: number) => {
        setCounterClick(counterClick + 1);
        setSumStars(sumStars + number);
    }

    console.log(sumStars, counterClick)

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
                    <div className="stars stars--4">
                        <div className="stars__star" onClick={() => handleClickStars(1)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(2)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(3)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(4)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(5)}></div>
                    </div>
                    <div className="review">
                        Rating: {rating}
                    </div>
                </div>

                <div className="card_price">
                    <div className="price">Price</div>
                    <div className="price_value">{price}</div>
                </div>

                <a
                    href="#page_buy"
                    className="card_buy"
                >
                    Buy
                </a>
        </div>

    )
}