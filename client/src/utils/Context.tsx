import { ReactNode, createContext,  useCallback,  useContext, useEffect, useState } from "react";
import { getProducts } from "../features/productsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Product } from "./Product";
import { User } from "./User";
import { getUsers } from "../features/usersSlice";
import { Price, Rating } from "./Sort";

interface SearchContextInterface {
    search: string,
    handleQuery: (search: string) => void,
    products: Product[],
    users: User[],
    price: Price,
    rating: Rating,
    handleSortPrices: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    handleSortRating: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}
export const SearchContext = createContext<SearchContextInterface>({
    search: '',
    handleQuery: () => { },
    products: [],
    users: [],
    price: Price.Price,
    rating: Rating.Rating,
    handleSortPrices: () => {},
    handleSortRating: () => {}
})

export const SearchContextProvider = (
    {children}: {children: ReactNode},
) => {
    const [search, setSearch] = useState('');
    const [price, setPrice] = useState(Price.Price);
    const [rating, setRating] = useState(Rating.Rating);
    
    const dispatch = useAppDispatch();
    
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
            handleSortRating
        }}>{children}</SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext);