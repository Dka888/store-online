import React, { FC } from 'react';
import {Link} from 'react-router-dom';
import './Slider.scss';

interface SliderProps {
    categories: {name: string, urlImg: string}[];
}

export const Slider: FC<SliderProps> = ({ categories }) => {
    // const imgUrl = 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg'
    return (
        <div className="sliderOver">
            <div className="slider-container">
                <div className="slider">
                    {categories.map(category =>
                    <div>
                        <Link to={`categories/${category.name}`}><img src={category.urlImg} alt={category.name} /></Link>
                        <div className='slider-info'>
                            <p className='slider-name'><span style={{textTransform: 'uppercase'}}>{category.name.slice(0, 1)}</span>{category.name.slice(1)}</p>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}
