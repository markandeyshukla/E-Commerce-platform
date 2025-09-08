import './header.css';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { GiCharacter } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { useState } from 'react';
function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (search.trim() !== "") {
      navigate('/search'); 
    }
  };

    return (
        <>
                      <div className='main-div-header'>

                <div className='header-feature-div'>
                    <Link to='/' className='header-font-design'>
                        <h1>Via<span style={{color:'blue'}}>Mart</span></h1>
                    </Link>
                    <Link to='/' className='header-font-design'>
                        <span>deliver to person name adress</span>
                    </Link>
                    <div className='header-search'>
                                    
                        <form onSubmit={handleSubmit} className='header-form'>
                            <input type="text" placeholder='search product' onChange={(e) => setSearch(e.target.value)} className='search-input' />
                            <button type='submit' id='search' className='search-btn'><HiOutlineSearch className='search-btn-img' /></button>
                        </form>

                    </div>
                    <div id='login-div' className='header-font-design'>
                    {/* <Link to='/Login' className='header-font-design'> */}
                        <GiCharacter className='size-icon show-header-name'/> <p className='text'> Login</p>
                        {/* or logi ki jgh username profile ke age likh dena login phir tablet mein bs icon or phone mien chota icon hover mein wishlist login signup if token not saved redirect to login. */}
                    {/* </Link> */}
                    <div className='hover-div-main'>
                        <div>
                            <ul className='display-div'>
                                <li><Link to='/wishlist'>wishlist</Link></li>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/phone'>Signup</Link></li>
                                <li>Logout</li>
                                <li><Link to='/support'>contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    </div>
                    <Link to='/cart' className='header-font-design show-header-name'>
                        <HiOutlineShoppingCart className='size-icon'/> <p className='text'> Cart </p>
                    </Link>
                    {/* <Link to='/aboutus'  className='header-font-design'>About us</Link> */}
                    <Link to='/sellersignup' className='header-font-design show-header-name'>
                        <FaShop className='size-icon'/> <p className='text'>Become A Seller</p>
                    </Link>
                </div>


            </div>

{/* mobile/tablet view */}
            <div id='mobile-view-navbar'>

                <div className='header-feature-div'>
                    <Link to='/' className='header-font-design'>
                        <h3>Via<span style={{color:'blue'}}>Mart</span></h3>
                    </Link>
                  
                    <div id='login-div' className='header-font-design'>
                        <Link to='/sellersignup' className='header-font-design'>
                        <FaShop className='size-icon' />
                    </Link>
                        <Link to='/cart' className='header-font-design'>
                        <HiOutlineShoppingCart className='size-icon' />
                    </Link>
                    {/* <Link to='/aboutus'  className='header-font-design'>About us</Link> */}
                    
                    
                        <GiCharacter className='header-font-design size-icon'/> 
                        {/* or logi ki jgh username profile ke age likh dena login phir tablet mein bs icon or phone mien chota icon hover mein wishlist login signup if token not saved redirect to login. */}
                    
                    <div className='hover-div-main'>
                        <div>
                            <ul className='display-div'>
                                <li><Link to='/wishlist' className='textdecoration-header' >wishlist</Link></li>
                                <li><Link to='/login' className='textdecoration-header'>Login</Link></li>
                                <li><Link className='textdecoration-header' to='/phone'>Signup</Link></li>
                                <li>Logout</li>
                                <li><Link to='/support' className='textdecoration-header'>contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    
                    
                    </div>
                </div>
                  <div className='header-search'>
                                    
                        <form onSubmit={handleSubmit} className='header-form'>
                            <input type="text" placeholder='search product' onChange={(e) => setSearch(e.target.value)} className='search-input' />
                            <button type='submit' id='search' className='search-btn'><HiOutlineSearch className='search-btn-img' /></button>
                        </form>

                    </div>
                <div className='header-font-design' id='headers-font-design'>
                        deliver to person name adress
                    </div>


            </div>
        </>
    )
}
export default Header;