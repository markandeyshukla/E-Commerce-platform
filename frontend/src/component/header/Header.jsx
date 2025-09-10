import './header.css';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { GiCharacter } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import { HiOutlineSearch } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (search.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(search)}`); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  }

  return (
    <>
      {/* Desktop / Large screens */}
      <div className='main-div-header'>
        <div className='header-feature-div'>
          <Link to='/' className='header-font-design'>
            <h1>Via<span style={{color:'blue'}}>Mart</span></h1>
          </Link>

          <span className='header-font-design'>
            {user ? `Deliver to ${user.username}` : "Deliver to person name address"}
          </span>

          <div className='header-search'>
            <form onSubmit={handleSubmit} className='header-form'>
              <input 
                type="text" 
                placeholder='Search product' 
                onChange={(e) => setSearch(e.target.value)} 
                className='search-input' 
              />
              <button type='submit' className='search-btn'>
                <HiOutlineSearch className='search-btn-img' />
              </button>
            </form>
          </div>

          {/* Login/Signup / Logout */}
          <div id='login-div' className='header-font-design'>
            <GiCharacter className='size-icon show-header-name' />
            {user ? <span>{user.username}</span> : <span>Login</span>}
            
            <div className='hover-div-main'>
              <div>
                <ul className='display-div'>
                  <li><Link to='/wishlist'>Wishlist</Link></li>
                  {!user && <li><Link to='/login'>Login</Link></li>}
                  {!user && <li><Link to='/phone'>Signup</Link></li>}
                  {user && <li style={{cursor:'pointer'}} onClick={handleLogout}>Logout</li>}
                  <li><Link to='/support'>Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <Link to='/cart' className='header-font-design show-header-name'>
            <HiOutlineShoppingCart className='size-icon'/> <p className='text'>Cart</p>
          </Link>

          <Link to='/sellersignup' className='header-font-design show-header-name'>
            <FaShop className='size-icon'/> <p className='text'>Become A Seller</p>
          </Link>
        </div>
      </div>

      {/* Mobile / Tablet View */}
      <div id='mobile-view-navbar'>
        <div className='header-feature-div'>
          <Link to='/' className='header-font-design'>
            <h3>Via<span style={{color:'blue'}}>Mart</span></h3>
          </Link>

          <div id='login-div' className='header-font-design'>
            {user ? (
              <>
                <GiCharacter className='size-icon' /> 
                <span>{user.username}</span>
                <div className='hover-div-main'>
                  <div>
                    <ul className='display-div'>
                      <li><Link to='/wishlist'>Wishlist</Link></li>
                      <li onClick={handleLogout}>Logout</li>
                      <li><Link to='/support'>Contact</Link></li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <GiCharacter className='size-icon' /> 
                <span>Login</span>
                <div className='hover-div-main'>
                  <div>
                    <ul className='display-div'>
                      <li><Link to='/wishlist'>Wishlist</Link></li>
                      <li><Link to='/login'>Login</Link></li>
                      <li><Link to='/phone'>Signup</Link></li>
                      <li><Link to='/support'>Contact</Link></li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          <Link to='/sellersignup' className='header-font-design'>
            <FaShop className='size-icon' />
          </Link>
          <Link to='/cart' className='header-font-design'>
            <HiOutlineShoppingCart className='size-icon' />
          </Link>
        </div>

        <div className='header-search'>
          <form onSubmit={handleSubmit} className='header-form'>
            <input 
              type="text" 
              placeholder='Search product' 
              onChange={(e) => setSearch(e.target.value)} 
              className='search-input' 
            />
            <button type='submit' className='search-btn'>
              <HiOutlineSearch className='search-btn-img' />
            </button>
          </form>
        </div>

        <div className='header-font-design' id='headers-font-design'>
          {user ? `Deliver to ${user.username}` : "Deliver to person name address"}
        </div>
      </div>
    </>
  )
}

export default Header;
