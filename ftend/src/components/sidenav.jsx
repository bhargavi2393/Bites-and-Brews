import './sidenav.css';
import { useNavigate } from 'react-router-dom';
function Sidenav(){
    const nav = useNavigate();
 function uspg(){

    nav('/us');
 }

 function ss(){
    nav('/ss');
 }

 function move(){
    nav('/hm');
 }
 function out(){
    nav('/');
 }
 function add(){
   nav('/add');
 }
 function mp(){
   nav('/mp');
 }
return(

<div>
   
    <div  className="sc">
      
      <button  className='btnn' onClick={uspg}><i class='bx bx-user'></i>User Profile</button>
      <button  className='btnn' onClick={ss}><i className='bx bx-search-alt' ></i>Search</button>
      <button className='btnn' onClick={mp}><i className='bx bxs-user-voice'></i>My Post</button>
      <button  className='btnn' onClick={add}><i className='bx bx-plus'></i>Add a post</button>
      <div className='hh'>
      <i className='bx bxs-home-smile' onClick={move} ></i>
      <i className='bx bx-log-out'  onClick={out}></i>
      </div>
    </div>
</div>

    );


}
export default Sidenav;