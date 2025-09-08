import './search.css';
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
// import { TfiShoppingCartFull } from "react-icons/tfi";
import { Link } from "react-router-dom";
import download from './download.jpg';
function Search(){
    return(
        <>
         <div className="product-main-div-searchpage">
            <div className="product-card-searchpage">
              <div className="product-img-wrapper-searchpage">
        <Link to='/detail'><img src={download} alt="product name" className="product-img-searchpage" /></Link>
                <span className="wishlist-icon-searchpage">
                  <IoHeartOutline className="heart-outline-searchpage" />
                  <IoHeartSharp className="heart-filled-searchpage" />
                </span>
              </div>
        
              <div className="product-info-searchpage">
                <h4 className="product-name-searchpage">Stylish T-Shirt</h4>
                <p className="product-price-searchpage">₹499</p>
        
                <Link to='/detail'><p className="product-desc-searchpage">
          <strong>Size:</strong> M, L, XL <br />
          <strong>Color:</strong> Red, Blue <br />
          A comfortable cotton T-shirt for daily wear...
        </p></Link>
        
                <div className="product-actions-searchpage">
                  <button className="cart-btn-searchpage"><MdAddShoppingCart /></button>
                  <Link to="/payment">
                    <button className="buy-btn-searchpage">Buy Now</button>
                  </Link>
                </div>
              </div>
             </div> </div>
        </>
    )
}
export default Search;