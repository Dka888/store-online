import { useEffect, useState } from "react";
import { User } from "../../utils/User"
import axios from "axios";
import { Basket } from "../../utils/Basket";

interface UserHistoryProps {
    user: User
}

export const UserHistory = ({user}: UserHistoryProps) => {
    const [basket, setBasket] = useState<Basket[]>();

    useEffect(() => {
        const loadingBasket = async() => {
            const basketItems = await axios.get(`http://localhost:3333/basket/${user._id}`);
            // setBasket(basketItems);
            console.log(basketItems);
        }

        loadingBasket()
    }, [])
    return (
        <div>

        </div>
    )
}