import './login.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../auth';
import { useAuth } from './authcontext'; 

function Login() {
    const nav = useNavigate();
    const { setUid } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function onn() {
        nav('/sup');
    }
    async function onClick() {
        try {
            
            const res = await API.post('/signin', { email, password });

           
            const token = res.data.token;
            const userId = res.data.userId;

           
            console.log("User ID:", userId);
            
            localStorage.setItem('token', token);
            localStorage.setItem('uid', userId);

           
            setUid(userId);

            
            alert('Login successful!');
            nav('/hm');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Login failed!');
        }
    }

    return (
        <div className='body'>
            <h1>BITE & BREWS<i className='bx bxs-coffee-alt'></i></h1>

            <div className="main-box">
                <div className="lcc">
                    <DotLottieReact
                        src="/login.json"
                        loop
                        autoplay
                        style={{ height: "300px", width: "300px" }}
                    />
                </div>

                <div className='log'>
                    <h2>LOGIN <i className='bx bxs-user'></i></h2>
                    <input
                        type='text'
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn" onClick={onClick}>LOGIN</button>
                    <a href="#" onClick={onn}>NEW USER?</a>
                </div>
            </div>
        </div>
    );
}
export default Login;

