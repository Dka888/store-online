
import { Basket } from '../Basket/Basket';
import './UserAccount.scss';


export const UserAccount = () => {
    const loggedInUserJSON = localStorage.getItem('loggedInUser');
    const loggedInUser = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null;

    return (
        <section className='user-account'>
                <h1>User Account</h1>
                <div className='user-account__page'>
                <div className="user-info">
                    <p><strong>Username: </strong>{loggedInUser.username}</p>
                    <p><strong>Email: </strong>{loggedInUser.email}</p>
                </div>
                    <div className='basket'>
                        <Basket /> 
                    </div>
                   
                </div>
        </section>
    )
}