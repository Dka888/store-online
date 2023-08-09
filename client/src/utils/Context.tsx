import { ReactNode, createContext,  useContext, useEffect, useState } from "react";
import { getProducts } from "../features/productsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Product } from "./Product";

interface SearchContextInterface {
    search: string,
    handleQuery: (search: string) => void,
    products: Product[],
}
export const SearchContext = createContext<SearchContextInterface>({
    search: '',
    handleQuery: () => { },
    products: [],

})

export const SearchContextProvider = (
    {children}: {children: ReactNode},
) => {
    const [search, setSearch] = useState('');

    const dispatch = useAppDispatch();
    
    useEffect(() => {
        const loadingProducts = async () => {
            await dispatch(getProducts());
        }
        loadingProducts();
    }, [dispatch]);

    const products = useAppSelector(state => state.products.products);


    const handleQuery = (query: string) => {
        setSearch(query)
    };

    return (
        <SearchContext.Provider value={{
            search,
            handleQuery,
            products,
        }}>{children}</SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext);