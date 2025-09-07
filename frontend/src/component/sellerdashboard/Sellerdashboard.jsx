import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import download from './download.jpg';
import './Sellerdashboard.css';

function Sellerdashboard() {
    return (
        <div className="product-main-div-sellerdashboard">
            <div className="product-div-sellerdashboard">

                {/* Product Image with Delete Icon */}
                <div className="product-img-div-sellerdashboard">
                    <img src={download} alt="product name" className="product-img-sellerdashboard" />
                    <span className="overlay-delete-sellerdashboard">
                        <AiOutlineDelete />
                    </span>
                </div>

                {/* Product Info */}
                <div className="product-info-sellerdashboard">
                    <h4 className="product-name-sellerdashboard">Product Name</h4>
                    <p className="product-price-sellerdashboard">₹ 1200</p>
                    <p className="product-extra-sellerdashboard">
                        <strong>Size:</strong> M <br />
                        <strong>Color:</strong> Blue
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="product-actions-sellerdashboard">
                    <Link to="/detail">
                        <button className="view-btn-sellerdashboard">View</button>
                    </Link>
                    <button className="edit-btn-sellerdashboard">
                        <FiEdit /> Edit
                    </button>
                </div>
            </div>
         <Link to='/listing'><div className="upload-car-booking-sellerdashboard" id="upload">
                    <img className="img-upload-sellerdashboard" src="https://cdn-icons-png.flaticon.com/512/5173/5173034.png" alt=""/>
                        <div className="subupload-car-booking-sellerdashboard">
                            <h3>List your Product</h3>
                        </div>
                </div></Link>
        </div>
        
    )
}

export default Sellerdashboard;


