import { Baskets } from '../../component/Basket/Baskets';
import './UserAccount.scss';
import { useCallback, useState } from 'react';
import { AddProduct } from '../../component/AddProduct/AddProduct';
import { logout } from '../../features/loginSlice';
import { useAppDispatch } from '../../store/hooks';
import { useSearchContext } from '../../utils/Context';
import { UserHistory } from '../../component/UserHistory/UserHistory';


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
                    {isBasket && <Baskets />}
                    {isAddProduct && <AddProduct />}
                    {isChangeMail && <div>It is forbidden now!</div>}
                    {isChangeUsername && <div>It is forbidden now!</div>}
                </div>
                </div>
        </section>
    )
}