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
import Supportpage from './pages/Support/index.js';
import Loginpage from './pages/Login/index.js';
import SignupphonePage from './pages/Signupphone/index.js';
import Signupemailpage from './pages/Signupemail/index.js';
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
                <Route path='/support' element={<Supportpage/>}/>
                <Route path='/login' element={<Loginpage/>}/>
                <Route path='/phone' element={<SignupphonePage/>}/>
                <Route path='/email' element={<Signupemailpage/>}/>
            </Routes>
        </Router>
    );
};
export default AppRouter;