import React, { useState } from 'react';
import './Register.scss';
import axios from 'axios';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../features/loginSlice';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useAppDispatch();

    const handleRegistration = async () => {
        const newUser = { username, password, email };
        const response = await axios.post('http://localhost:3333/users/register', newUser)
        if (response.status === 201) {
            setMessage(response.data.message);
            setTimeout(() => setMessage(null), 3000);
            dispatch(login());
            const loggedUser = response.data.user;
            localStorage.setItem('loggedInUser', JSON.stringify(loggedUser));

        }
    };

    return (
        <>
            <div className='register'>
                <h2 className='register__title'>Registration</h2>
                <div className='register__window'>
                    <div>
                        <label>Username: </label>
                        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                     <button className='register__button' onClick={handleRegistration}>Register</button>
                </div>
               
            </div>
            {message && <div style={{ margin: '0 auto 2rem', color: 'green', fontSize: '1.5rem', textAlign: 'center' }}>{message}</div>}
        </>
    );
}

