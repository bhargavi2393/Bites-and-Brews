import './nav.css';
import Sidenav from './sidenav';
import Info from './info';
import { useState } from 'react';

function Nav() {
  const [showSidenav, setShowSidenav] = useState(false);
  const [showinfo , setshowinfo] = useState(false);

  const toggleSidenav = () => {
    setShowSidenav(!showSidenav);
  };
  const info = () =>{
       setshowinfo(!showinfo);

       
  };

  return (
    <>
      <div className="nav">
        <div className="left">
          <i className='bx bxs-coffee-alt'></i>
        </div>
        <div className="center">
          <h2 className="q">Where tastebuds talk!</h2>
        </div>
        <div className="right">
           <i className='bx bx-info-circle' onClick={info}></i>
          <i className='bx bx-chevrons-left' onClick={toggleSidenav}></i>
        </div>
      </div>

      {showSidenav && <Sidenav />}
      {showinfo && <Info/>}
    </>
  );
}

export default Nav;
