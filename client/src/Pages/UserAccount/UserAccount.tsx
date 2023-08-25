import { Baskets, ProductsInBasket } from '../../component/Basket/Baskets';
import './UserAccount.scss';
import { useCallback, useEffect, useState } from 'react';
import { AddProduct } from '../../component/AddProduct/AddProduct';
import { logout } from '../../features/loginSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useSearchContext } from '../../utils/Context';
import { UserHistory } from '../../component/UserHistory/UserHistory';
import { changeQuantities, deleteItem } from '../../features/basketSlice';
import { status } from '../../utils/Basket';

export const UserAccount = () => {
    const loggedInUserJSON = localStorage.getItem('loggedInUser');
    const loggedInUser = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null;
    const {avatar} = useSearchContext();


    const [isBasket, setIsBasket] = useState(false);
    const [isAddProduct, setIsAddProduct] = useState(false);
    const [isChangeUsername, setIsChangeUsername] = useState(false);
    const [isChangeMail, setIsChangeMail] = useState(false);


    const reset = () => {
        setIsBasket(false);
        setIsAddProduct(false);
        setIsChangeUsername(false);
        setIsChangeMail(false);
    }

    const handleClickBasket = useCallback(() => {
        reset();
        setIsBasket(true);
    }, []);

    const handleClickProduct = useCallback(() => {
        reset();
        setIsAddProduct(true);
    }, []);

    const handleClickUsername = useCallback(() => {
        reset();
        setIsChangeUsername(true);
    }, []);

    const handleClickMail = useCallback(() => {
        reset();
        setIsChangeMail(true);
    }, []);

    const dispatch = useAppDispatch();

    const handleLogout = useCallback(() => {
        reset();
        dispatch(logout())
        localStorage.removeItem('loggedInUser');
        window.location.href = '/';
    }, [dispatch]);

    //  const [listOfProduct, setListOfProduct] = useState<ProductsInBasket[]>([]);
    //  const basketItems = useAppSelector((state) => state.basket.items); 
 
    //  useEffect(() => {
    //      if (basketItems.length) {
    //          const filteredItems = basketItems.filter(item => item.status === status.in_Cart);
    //          const listOfItems = filteredItems.map(item => {
    //              const { productId, quantity, status } = item;
    //              const fullProduct = { ...productId, quantity, status };
                 
    //              return fullProduct;
    //          });
 
    //          setListOfProduct(listOfItems);
    //      }
    //  }, [basketItems, dispatch]);

    // const handleAddQuantity = (product: ProductsInBasket) => {
    //     const { quantity } = product;
    //     const newQuantity = quantity + 1;
    //     const newProduct = { ...product, quantity: newQuantity }
    //     dispatch(changeQuantities(newProduct));

    //     const replace = listOfProduct.map(item => item._id === newProduct._id ? newProduct : item);
    //     setListOfProduct(replace);
    // }

    // const handleMinusQuantity = (product: ProductsInBasket) => {
      
    //     const  { quantity } = product;
    //     const newQuantity = quantity - 1;
    //     const newProduct = { ...product, quantity: newQuantity }
    //     if (newQuantity === 0) {
    //         dispatch(deleteItem(product._id));
    //         const replace = listOfProduct.filter(item => item._id !== newProduct._id);
    //         setListOfProduct(replace);
    //     } else {
           
    //         dispatch(changeQuantities(newProduct));
            
    //         const replace = listOfProduct.map(item => item._id === newProduct._id ? newProduct : item);
    //         setListOfProduct(replace);
    //     }
    // }

    return (
        <section className='user-account'>
                <h1>User Account</h1>
                <div className='user-account__page'>
                <div className='user'>
                    <div className='user__data'>
                        <div className='user__data-avatar'><img src={avatar} alt='logo'></img></div>
                        <p className='user__data-personal'>{loggedInUser.username}</p>
                        <p className='user__data-personal'>{loggedInUser.email}</p>
                        <div className='user__options'>
                            <p className='user__options-option' onClick={handleClickBasket}>Basket</p>
                            <p className='user__options-option' onClick={handleClickProduct}>Add product</p>
                            <p className='user__options-option' onClick={handleClickUsername}>Change username</p>
                            <p className='user__options-option' onClick={handleClickMail}>Change email</p>
                            <p className='user__options-option' onClick={handleLogout}>Log out</p>
                        </div>
                    </div>
                </div>
                <div className='user__page'>
                    {!isBasket && !isAddProduct && !isChangeMail && !isChangeUsername && <UserHistory user={loggedInUser} />}
                    {isBasket && <Baskets 
                    // listOfProduct={listOfProduct} handleAddQuantity={handleAddQuantity} handleMinusQuantity={handleMinusQuantity}
                    />}
                    {isAddProduct && <AddProduct />}
                    {isChangeMail && <div>It is forbidden now!</div>}
                    {isChangeUsername && <div>It is forbidden now!</div>}
                </div>
                </div>
        </section>
    )
}