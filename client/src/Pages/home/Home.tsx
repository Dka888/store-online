import { SearchBar } from "../../component/searchingBar/SearchBar";
import { Slider } from "../../component/slider/Slider";
import './Home.scss';
import { Card } from "../../component/Card/Card";
import { useEffect } from "react";
import { Product } from "../../utils/Product";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProducts } from "../../features/productsSlice";

export const Home = () => {
    // const [products, setProducts] = useState<Product[]>()

    // useEffect(() => {
    //     const loadingProducts = async () => {
    //         const productsData = await dataProducts()
    //         setProducts(productsData);
    //     }

    //     loadingProducts()
    // }, [])
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.products.products);

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const categories = [
        {name: 'technology', urlImg: './images/technologies.jpg', id: 1}, 
        {name:'sport', urlImg: './images/sport (2).jpg', id: 4}, 
        {name:'food', urlImg: './images/food.jpg', id: 5}, 
        {name:'clothes', urlImg: './images/clothes.jpg', id: 6}, 
        {name:'home', urlImg: './images/home-decor.jpg', id: 7}, 
        {name: 'health', urlImg: './images/health.jpg', id: 8}
    ];
    let productsForCarousel: Product[] = [];
    if (products) {
        productsForCarousel = products.slice(products.length - 5);
    }
    return (
        <main>
            <SearchBar />
            <div className="container">
                <h2 className="container__title">Popular categories</h2>
                <Slider categories={categories} />
                <div className="carousel">
                    <h2>New Products</h2>
                    <div className="carousel__view">
                        {productsForCarousel.length
                            ? productsForCarousel.map(product =>
                            <Card product={product} />
                            )
                            : <div>Loading...</div>}
                    </div>
                </div>
            </div>
        </main>
    )
}