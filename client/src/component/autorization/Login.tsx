import { useState } from 'react';
import './Login.scss';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login } from '../../features/loginSlice';


export const Login = () => {
  const [username, setUserLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(state => state.login)

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3333/users/login', {
        username,
        password
      });
      if (response.status === 200) {
        dispatch(login());
        setUserLogin('');
        setPassword('');
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      } else {
        console.error('Login or password are wrong!');
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    } catch (error) {
      console.error('Error', error);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

    return (
      <>
        <div className="login">
          <form className='login__form'>
            <h1 className="login__title">Login</h1>
            <div className="login__input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUserLogin(e.target.value)}
                required />
              <i className="login__bx bxs-user"></i>
            </div>

            <div className="login__input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className='login__bx bxs-lock-alt' ></i>
            </div>

            <div className="login__remember-forgot">
              <label><input type="checkbox" /> Remember me
              </label>
            </div>

            <div
              className="login__btn"
              onClick={handleLogin}
            >
              Login
            </div>
          </form >
        </div>
        {isLoggedIn && showMessage && <div style={{ margin: '0 auto 2rem', color: 'green', fontSize: '1.5rem', textAlign: 'center' }}>Your successful log in!</div>}
        {!isLoggedIn && showMessage && <div style={{ margin: '0 auto 2rem', color: 'darkred', fontSize: '1.5rem', textAlign: 'center' }}>Wrong login or password!</div>}
      </>
    )
}