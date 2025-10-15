import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Login from "./components/login"
import Signin from "./components/signin"
import Home from './components/homepg';
import Userpg from './components/userpg';
import Search from './components/search';
import Add from './components/add';
import Mpage from './components/mp';
function App() {

  return (
    <>
     
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/sup' element={<Signin/>}/>
          <Route path='/hm' element={<Home/>}/>
          <Route path='/us' element={<Userpg/>}/>
          <Route path='/ss' element={<Search/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/mp' element={<Mpage/>}/>
        </Routes>
    </>
  );
}

export default App
