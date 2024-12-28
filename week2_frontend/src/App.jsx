import Login from './component/Login'
import Signup from './component/Signup'
import './App.css'
import Navbar from './component/Navbar'
import { Outlet } from 'react-router-dom'
//import Home from './component/Home';
//import {Routes,Route,navigate} from 'react-router-dom';
//import { AuthContext,AuthProvider } from './Context';
//import { useContext } from 'react';
function App() {
  // const {token}=useContext(AuthContext);

  return (
    <div className='app'>
    {/* <div>header</div> */}
    <Navbar> </Navbar>
    <main> <Outlet></Outlet></main>


    </div>

  
)};
export default App;


// import React, { useContext } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { AuthContext, AuthProvider } from './Context';
// import Signup from './component/Signup';
// import Login from './component/Login';
// import Home from './component/Home';
// function App() {
//   const { token } = useContext(AuthContext);
//   return (
//     <Routes>
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/" element={token ? <Home /> : <Navigate to="/signup" />}/>
//     </Routes>
//   );
// }
// export default () => (
//   <AuthProvider>
//     <App />
//   </AuthProvider>
// );