import './signin.css'; 
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../auth';// 💡 your axios instance

function Signin(){ 
    const nav = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function log(){
        try {
            const res = await API.post('/signup', {
                name,
                email,
                password
            });
            console.log(res.data);
            alert("Signup success ✨");
            nav('/hm');
        } catch (err) {
            console.error(err);
            alert("Signup failed 💥");
        }
    }

    return (
        <div className='body'>
            <h1>BITE & BREWS<i className='bx bxs-coffee-alt' ></i></h1>
            <div className="main-box">
                <div className="lcc">
                    <DotLottieReact
                        src="/signin.json"
                        loop
                        autoplay
                        style={{ height: "300px", width: "300px" }}
                    />
                </div>

                <div className='log'> 
                    <h2>SIGININ <i className='bx bxs-user'></i></h2> 
                    <input type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type='text' placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="btn" onClick={log}>SIGNIN</button>
                </div>
            </div>
        </div>
    );
}

export default Signin;
