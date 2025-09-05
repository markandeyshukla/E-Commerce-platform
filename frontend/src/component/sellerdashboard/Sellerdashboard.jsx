

import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import download from './download.jpg';
import './Sellerdashboard.css';
function Sellerdashboard() {
    return (
        <>
            <div className="product-main-div-sellerdashboard">
                <div className="product-div-sellerdashboard">
                    <Link to='/detail'>
                        <div className="product-img-div-sellerdashboard"><img src={download} alt="product name" className="product-img-sellerdashboard" />
                            <span className="overlay-wishlist-sellerdashboard"><AiOutlineDelete /></span></div>
                        <div className="product-name-price-cart-div-sellerdashboard"><h4 className="product-name-sellerdashboard">name</h4><p className="product-price-sellerdashboard">price</p><span className="product-cart-div-sellerdashboard"><FiEdit className="product-cart-sellerdashboard" /> </span></div>

                        <div className="extrasize-sellerdashboard"><p>
                            <strong>size:</strong> <br />
                            <strong>color:</strong> <br />
                            itna sara likh diye hai vo sb bhi whi atega kya apne se nhi likhegadetail of roduct only two line will show mor ethan this will go to detail page you need to increase the size of the page</p></div>
                    </Link>
                    <Link to='/payment'><button className="product-buy-btn-sellerdashboard">Buy price</button></Link>

                </div>

                <Link to='/listing'><div className="upload-car-booking-sellerdashboard" id="upload">
                    <img className="img-upload-sellerdashboard" src="https://cdn-icons-png.flaticon.com/512/5173/5173034.png" alt=""/>
                        <div className="subupload-car-booking-sellerdashboard">
                            <h3>List your Product</h3>
                        </div>
                </div></Link>
            </div>
        </>
    )
}
export default Sellerdashboard;