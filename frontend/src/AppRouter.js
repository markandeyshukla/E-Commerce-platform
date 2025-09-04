import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Homepage/index.js';
import About from './pages/Aboutus/index.js';
import Notfoundpage from './pages/Notfound/index.js';
import Detail from './pages/Detailpage/index.js';
import PaymentPage from './pages/Payment/index.js';
const AppRouter =() =>{
    return(
        <Router>
            <Routes>
                <Route path ='/' element={<Home/>}/>
                <Route path='/aboutus' element={<About/>}/>
                <Route path='*' element={<Notfoundpage/>}/>
                <Route path='/detail' element={<Detail/>}/>
                <Route path='/payment' element={<PaymentPage/>}/>
            </Routes>
        </Router>
    );
};
export default AppRouter;