import { Product } from '../../utils/Product';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToBasket } from '../../features/basketSlice';
import { editProduct } from '../../features/productsSlice';

import './Card.scss';

interface CardProps {
    product: Product;
}

export const Card = ({product}: CardProps) => {
    const {name, price } = product;
    const dispatch = useAppDispatch();

    const handleClickStars = (number: number) => {
        let updatedProduct: Product;
        if(product.click > 0) {
            const newRating = Math.round((product.rating * product.click + number) / (product.click + 1) * 10) / 10;
            const newClick = product.click + 1;
            updatedProduct= {...product, click: newClick, rating: newRating}
        } else {
            const newClick = product.click + 1;
            updatedProduct = {...product, click: newClick, rating: number}
            console.log(product.click, newClick)
        }

        dispatch(editProduct(updatedProduct));
    }

     const items = useAppSelector(state => state.basket.items);

    const handletoAdd = () => {
        if(items.find(item => item._id === product._id)) {
            return;
        }
        dispatch(addToBasket(product));
    }

    const productCode = product._id.slice(10);

    return (

        <div className="card">
            <Link to={`/cartInfo/${product._id}`} className='card__link'>
            <img
                src={product.imgUrl}
                alt={product.name}
                className="card_apple"
            ></img>

                <h2 className="card_descript">{name}</h2>
                
                <div className="card_code">Product code: {productCode}</div>
            </Link> 
                <div className="card_rew">
                    <div className={`stars stars--${Math.round(product.rating)}`}>
                        <div className="stars__star" onClick={() => handleClickStars(1)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(2)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(3)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(4)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(5)}></div>
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