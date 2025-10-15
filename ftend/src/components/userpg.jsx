import './userpg.css';
import Nav from './nav';
import { useState } from 'react';
import API from '../auth';

function Userpg() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const res = await API.put('/update', {
        name,
        email,
        password
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div>
      <Nav />
      <h3>User Info :</h3>
      <div className='c'>
        <div className="form">
          <label className="t">Name:</label>
          <input type="text" className="in" value={name} onChange={(e) => setName(e.target.value)} />
          <label className="t">Email:</label>
          <input type="email" className="in" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="t">Password:</label>
          <input type="password" className="in" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='btn' onClick={handleUpdate}>Update</button>
          {message && <p className='msg'>{message}</p>}
        </div>
      </div>
    </div>
  );
}
export default Userpg;
