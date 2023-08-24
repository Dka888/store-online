import { ReactNode, createContext,  useCallback,  useContext, useEffect, useState } from "react";
import { getProducts } from "../features/productsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Product } from "./Product";
import { User } from "./User";
import { getUsers } from "../features/usersSlice";
import { Price, Rating } from "./Sort";
import { getBasket } from "../features/basketSlice";

interface SearchContextInterface {
    search: string,
    handleQuery: (search: string) => void,
    products: Product[],
    users: User[],
    price: Price,
    rating: Rating,
    handleSortPrices: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    handleSortRating: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    user: User | null,
    avatar: string,

}
export const SearchContext = createContext<SearchContextInterface>({
    search: '',
    handleQuery: () => { },
    products: [],
    users: [],
    price: Price.Price,
    rating: Rating.Rating,
    handleSortPrices: () => {},
    handleSortRating: () => { },
    user: null,
    avatar: '',

})

export const SearchContextProvider = (
    {children}: {children: ReactNode},
) => {
    const [search, setSearch] = useState('');
    const [price, setPrice] = useState(Price.Price);
    const [rating, setRating] = useState(Rating.Rating);
    const [user, setUser] = useState<User | null>(null);

    const dispatch = useAppDispatch();
    const [avatar, setAvatar] = useState('');

    const avatars = ['./img/catgamer.jpg', './img/smokingMafia.jpg', './img/monster.jpg'];
    
    useEffect(() => {
       setAvatar(avatars[Math.round(Math.random() * 2)]);
    }, [avatar, user]);
    
    useEffect(() => {
        const loadingProducts = async () => {
            await dispatch(getProducts());
        }
        loadingProducts();
    }, [dispatch]);

    const products = useAppSelector(state => state.products.products);

    useEffect(() => {
        const loadingUsers = async() => {
            await dispatch(getUsers());
        }
        loadingUsers();

    },[dispatch]);

    const users = useAppSelector(state => state.users.users);

    useEffect(() => {
        const loggedInUserJSON = localStorage.getItem('loggedInUser');
        const loggedInUser = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null;
        setUser(loggedInUser);
    }, []);

    useEffect(() => {
        if(user !== null) {
            dispatch(getBasket(user._id));
        }
    }, [dispatch, user])

    const handleQuery = (query: string) => {
        setSearch(query)
    };

    const handleSortPrices = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const choose = event.target.value;
        switch (choose) {
            case Price.PriceUp: setPrice(Price.PriceUp);
                break;
            case Price.PriceDown: setPrice(Price.PriceDown);
                break;
            default: setPrice(Price.Price);
                break;
        }
    }, []);

    const handleSortRating = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const choose = event.target.value;
        switch (choose) {
            case Rating.RatingUp: setRating(Rating.RatingUp);
                break;
            case Rating.RatingDown: setRating(Rating.RatingDown);
                break;
            default: setRating(Rating.Rating);
                break;
        }
    }, []);

    return (
        <SearchContext.Provider value={{
            search,
            handleQuery,
            products,
            users, 
            price, 
            rating,
            handleSortPrices,
            user,
            handleSortRating, 
            avatar     
        }}>{children}</SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext);