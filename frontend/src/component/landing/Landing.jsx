// import { IoHeartOutline } from "react-icons/io5";
// import { IoHeartSharp } from "react-icons/io5";
// import { MdAddShoppingCart } from "react-icons/md";
// // import { TfiShoppingCartFull } from "react-icons/tfi";
// import { Link } from "react-router-dom";
// import download from './download.jpg';
// import './landing.css';
// function Landing(){
//     return(
//         <>
//         <div className="product-main-divlanding">
//             <div className="product-divlanding">
//                <Link to='/detail'>
//                 <div className="product-img-divlanding"><img src={download} alt="product name" className="product-img"/>
//                 <span className="overlay-wishlistlanding"><IoHeartOutline /><IoHeartSharp /></span></div>
//                 <div className="product-name-price-cart-divlanding"><h4 className="product-namelanding">name</h4><p className="product-pricelanding">price</p><span className="product-cart-divlanding"><MdAddShoppingCart className="product-cart"/>
//                  {/* <TfiShoppingCartFull /> */}
//                  </span></div>
                
//                 <div className="extrasizelanding"><p><strong>size:</strong> <br />
//                             <strong>color:</strong> <br />
//                             itna sara likh diye hai vo sb bhi whi atega kya apne se nhi likhegadetail of roduct only two line will show mor ethan this will go to detail page you need to increase the size of the page</p></div>
//                </Link>
//                 <Link to='/payment'><button className="product-buy-btnlanding">Buy price</button></Link>
                
//             </div>
//         </div>
//         </>
//     )
// }
// export default Landing;
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import download from './download.jpg';
import './landing.css';

function Landing() {
  return ( 
  <div className="product-main-div-landing">
    <div className="product-card-landing">
      <div className="product-img-wrapper-landing">
        <Link to='/detail'><img src={download} alt="product name" className="product-img-landing" /></Link>
        <span className="wishlist-icon-landing">
          <IoHeartOutline className="heart-outline-landing" />
          <IoHeartSharp className="heart-filled-landing" />
        </span>
      </div>

      <div className="product-info-landing">
        <h4 className="product-name-landing">Stylish T-Shirt</h4>
        <p className="product-price-landing">₹499</p>

       <Link to='/detail'><p className="product-desc-landing">
          <strong>Size:</strong> M, L, XL <br />
          <strong>Color:</strong> Red, Blue <br />
          A comfortable cotton T-shirt for daily wear...
        </p></Link>

        <div className="product-actions-landing">
          <button className="cart-btn-landing"><MdAddShoppingCart /></button>
          <Link to="/payment">
            <button className="buy-btn-landing">Buy Now</button>
          </Link>
        </div>
      </div>
     </div>         </div>
      
  );
}

export default Landing;
