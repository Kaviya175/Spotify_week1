import Login from './component/Login'
import Signup from './component/Signup'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <div className='app'>
    {/* <div>header</div> */}
    <main> <Outlet></Outlet></main>


    </div>
  )
}

export default App