 import {configureStore} from "@reduxjs/toolkit";



// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import { BrowserRouter } from 'react-router-dom';
// import { CombinedProvider } from './Context';
const spotifystore=configureStore({
    reducer:{
    }
})
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <CombinedProvider>
//         <App />
//       </CombinedProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );
export default spotifystore