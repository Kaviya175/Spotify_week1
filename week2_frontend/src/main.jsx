import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
//import spotifystore from './index.jsx';
 //import Provider from 'react-redux';
import {Navigate, RouterProvider,createBrowserRouter} from "react-router-dom"
import Login from './component/Login.jsx';
import Signup from './component/Signup.jsx';
import Home from './component/Home.jsx';
import 'react-toastify/dist/ReactToastify.css';
//import Navbar from './component/Navbar.jsx';
 //import { createBrowserRouter } from 'react-router-dom'
const router=createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
    {path:"/",element:<Navigate to="/login"></Navigate>},
    {path:"/login",element:<Login></Login>},
    {path:"/signup",element:<Signup></Signup>},
    {path:"/home",element:<Home></Home>},
  ]
}
]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={spotifystore}> */}
    <RouterProvider router
   ={router}>
    <App />
    </RouterProvider>
    {/* </Provider> */}
  </StrictMode>,
)