import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Homepage/index.js';
import About from './pages/Aboutus/index.js';
import Notfoundpage from './pages/Notfound/index.js';
import Detail from './pages/Detailpage/index.js';
import PaymentPage from './pages/Payment/index.js';
import Searchpage from './pages/Searchpage/index.js';
import SellersignupPage from './pages/Sellersignup/index.js';
import SellerDashboard from './pages/Sellerdashboard/index.js';
import Listingpage from './pages/Listing/index.js';
import Wishlistpage from './pages/Wishlist/index.js';
import Cartpage from './pages/Cart/index.js';
const AppRouter =() =>{
    return(
        <Router>
            <Routes>
                <Route path ='/' element={<Home/>}/>
                <Route path='/aboutus' element={<About/>}/>
                <Route path='*' element={<Notfoundpage/>}/>
                <Route path='/detail' element={<Detail/>}/>
                <Route path='/payment' element={<PaymentPage/>}/>
                <Route path='/sellersignup' element={<SellersignupPage/>}/>
                <Route path='/search' element={<Searchpage/>}/>
                <Route path='/sellerdashboard' element={<SellerDashboard/>}/>
                <Route path='/listing' element={<Listingpage/>}/>
                <Route path='/wishlist' element={<Wishlistpage/>}/>
                <Route path='/cart' element={<Cartpage/>}/>
            </Routes>
        </Router>
    );
};
export default AppRouter;