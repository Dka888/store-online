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

    const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
        const newUser = { username, password, email };
        try {
            const response = await axios.post('http://localhost:3333/users/register', newUser)
        if (response.status === 201) {
            setMessage(response.data.message);
            setTimeout(() => setMessage(null), 3000);
            dispatch(login());
            const loggedUser = response.data.user;
            localStorage.setItem('loggedInUser', JSON.stringify(loggedUser));
                setTimeout(() => { window.location.href = '/user' }, 3000);
            } else {
                setMessage(response.data.message);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="register">
                <form
                    className='register__form'
                    onSubmit={(e) => handleRegistration(e)}
                >
                    <h1 className="register__title">Registration</h1>
                    <div className="register__input-box">
                        <label>Username:
                            <input
                                type="text"
                                value={username}
                                placeholder='Username'
                                onChange={(event) => setUsername(event.target.value)}
                            /></label>
                    </div>

                    <div className="register__input-box">
                        <label>Password:
                            <input
                                type="password"
                                value={password}
                                placeholder='Password'
                                autoComplete="off"
                                onChange={(event) => setPassword(event.target.value)}
                            /></label>
                    </div >
                    <div className="register__input-box">
                        <label>Email:
                            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /> </label>
                    </div>
                    <button className='register__button' >Registration</button>
                </form >
            </div>
            {message && <div style={{ margin: '0 auto 2rem', color: 'green', fontSize: '1.5rem', textAlign: 'center' }}>{message}</div>}
        </>
    );
}

