import './header.css';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { GiCharacter } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
function Header() {
    return (
        <>
            <div className='main-div-header'>

                <div className='header-feature-div'>
                    <Link to='/' className='header-font-design'>
                        <h1>Your<span>Mart</span></h1>
                    </Link>
                    <Link to='/' className='header-font-design'>
                        <span>deliver to person name adress</span>
                    </Link>
                    <div className='header-search'>

                        <form action="submit" className='header-form'>
                            <input type="text" placeholder='search product' className='search-input' />
                            <button type='submit' className='search-btn'><HiOutlineSearch className='search-btn-img' /></button>
                        </form>

                    </div>
                    <div id='login-div' className='header-font-design'>
                    <Link to='/Login' className='header-font-design'>
                        <GiCharacter /> Login
                        {/* or logi ki jgh username profile ke age likh dena login phir tablet mein bs icon or phone mien chota icon hover mein wishlist login signup if token not saved redirect to login. */}
                    </Link>
                    <div className='hover-div-main'>
                        <div>
                            <ul className='display-div'>
                                <li>wishlist</li>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/signup'>Signup</Link></li>
                                <li>Logout</li>
                                <li>List Product <Link to='/support'>contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    </div>
                    <Link to='/' className='header-font-design'>
                        <HiOutlineShoppingCart /> cart
                    </Link>
                    {/* <Link to='/aboutus'  className='header-font-design'>About us</Link> */}
                    <Link to='/' className='header-font-design'>
                        <FaShop /> Become A Seller
                    </Link>
                </div>


            </div>
        </>
    )
}
export default Header;