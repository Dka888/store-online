// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Product } from "../../utils/Product";

import { Product } from "../../utils/Product";

import { SearchBar } from "../../component/searchingBar/SearchBar";
import { Slider } from "../../component/slider/Slider";
import './Home.scss';
import { Card } from "../../component/Card/Card";
import { Category } from "../../utils/Categoris";
// import { Categories } from "../Categorires/mainCategory/Categories";

export const Home = () => {
    // const [products, setProducts] = useState<Product[]>([])
    // useEffect(() => { getProducts() },[])

    // function getProducts () {
    //     axios.get('http://localhost:3333/products')
    // .then(res => setProducts(res.data));
    // }

    // const someProducts = products.slice(0, 5);

    // const chippestProducts = [...products];

    // const discount = chippestProducts.sort((a, b) => a.price - b.price).slice(0, 5);

    // const categories = products.map(product => product.category).filter((cat, i, arr) => arr.indexOf(cat) === i);

    // console.log(categories);
    const categories = [
        {name: 'technology', urlImg: './images/technologies.jpg', id: 1}, 
        {name:'sport', urlImg: './images/sport (2).jpg', id: 4}, 
        {name:'food', urlImg: './images/food.jpg', id: 5}, 
        {name:'clothes', urlImg: './images/clothes.jpg', id: 6}, 
        {name:'home', urlImg: './images/home-decor.jpg', id: 7}, 
        {name: 'health', urlImg: './images/health.jpg', id: 8}
    ];

    const products: Product[] = [
        { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Technology, rating: 4.8 },
        { name: 'MacBook', description: 'jhseflwiaget;iea/hgrot', price: 1900, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', rating: 4.7, category: Category.Technology },
        { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Food, rating: 4.8 },
        { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Sport, rating: 4.8 },
        { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Garden, rating: 4.8 },
    ];


    return (

        <main>
            <SearchBar />
            <div className="container">
                <h2 className="container__title" style={{ margin: 'auto' }}>Popular categories</h2>
                <Slider categories={categories} />
                <div className="carousel">
                    <h2>New Products</h2>
                    <div className="carousel__view">
                        {products.map(product =>
                            <Card product={product} />
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}