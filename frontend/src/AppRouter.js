import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Homepage/index.js';
import About from './pages/Aboutus/index.js';
const AppRouter =() =>{
    return(
        <Router>
            <Routes>
                <Route path ='/' element={<Home/>}/>
                <Route path='/aboutus' element={<About/>}/>
            </Routes>
        </Router>
    );
};
export default AppRouter;