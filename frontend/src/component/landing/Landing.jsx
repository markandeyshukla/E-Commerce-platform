import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
// import { TfiShoppingCartFull } from "react-icons/tfi";
import { Link } from "react-router-dom";
import download from './download.jpg';
import './landing.css';
function Landing(){
    return(
        <>
        <div className="product-main-div">
            <div className="product-div">
               <Link to='/detail'>
                <div className="product-img-div"><img src={download} alt="product name" className="product-img"/>
                <span className="overlay-wishlist"><IoHeartOutline /><IoHeartSharp /></span></div>
                <div className="product-name-price-cart-div"><h4 className="product-name">name</h4><p className="product-price">price</p><span className="product-cart-div"><MdAddShoppingCart className="product-cart"/>
                 {/* <TfiShoppingCartFull /> */}
                 </span></div>
                
                <div className="extrasize"><p><strong>size:</strong> <br />
                            <strong>color:</strong> <br />
                            itna sara likh diye hai vo sb bhi whi atega kya apne se nhi likhegadetail of roduct only two line will show mor ethan this will go to detail page you need to increase the size of the page</p></div>
               </Link>
                <Link to='/payment'><button className="product-buy-btn">Buy price</button></Link>
                
            </div>
        <div className="product-div">
               <Link to='/detail'>
                <div className="product-img-div"><img src={download} alt="product name" className="product-img"/>
                <span className="overlay-wishlist"><IoHeartOutline /><IoHeartSharp /></span></div>
                <div className="product-name-price-cart-div"><h4 className="product-name">name</h4><p className="product-price">price</p><span className="product-cart-div"><MdAddShoppingCart className="product-cart"/> 
                {/* <TfiShoppingCartFull /> */}
                </span></div>
                
                <div className="extrasize"><p><strong>size:</strong> <br />
                            <strong>color:</strong> <br />
                            itna sara likh diye hai vo sb bhi whi atega kya apne se nhi likhegadetail of roduct only two line will show mor ethan this will go to detail page you need to increase the size of the page</p></div>
               </Link>
                <Link to='/payment'><button className="product-buy-btn">Buy price</button></Link>
                
            </div>
        <div className="product-div">
               <Link to='/detail'>
                <div className="product-img-div"><img src={download} alt="product name" className="product-img"/>
                <span className="overlay-wishlist"><IoHeartOutline /><IoHeartSharp /></span></div>
                <div className="product-name-price-cart-div"><h4 className="product-name">name</h4><p className="product-price">price</p><span className="product-cart-div"><MdAddShoppingCart className="product-cart"/> 
                {/* <TfiShoppingCartFull /> */}
                </span></div>
                
                <div className="extrasize"><p><strong>size:</strong> <br />
                            <strong>color:</strong> <br />
                            itna sara likh diye hai vo sb bhi whi atega kya apne se nhi likhegadetail of roduct only two line will show mor ethan this will go to detail page you need to increase the size of the page</p></div>
               </Link>
                <Link to='/payment'><button className="product-buy-btn">Buy price</button></Link>
                
            </div>
        </div>
        </>
    )
}
export default Landing;