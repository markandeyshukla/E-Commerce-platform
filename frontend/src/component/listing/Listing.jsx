import Uploadimagebysellerusingjavascript from "./download.jpg";
import './listing.css';
function Listing() {
    return (
        <>

            <h1 className="heading1">ViaMart Listing Page</h1>

            <div className="upload-car-main">
                <form action="#" className="Upload-car-form" id="uploadcar">
                    <img id="previewImg" className="imgpreview-upload-car" src={Uploadimagebysellerusingjavascript} alt="Preview will appear here" width="200" />

                    <input className="upload-car-form-detail" type="text" name="brand" placeholder="Enter Brand Name"
                        required />
                    <input className="upload-car-form-detail" type="text" name="name" placeholder="Enter Product Name"
                        required />
                    <input className="upload-car-form-detail" type="number" name="pricePerHour" placeholder="Enter Price"
                        required />
                    <input className="upload-car-form-detail" type="text" name="fuelType"
                        placeholder="Availabe Color Mention with Commas," required />
                    <input className="upload-car-form-detail" type="text" name="carNumber" placeholder="Available Size (optional if available)" />
                    <input className="upload-car-form-detail" type="number" name="pincode"
                        placeholder="Age Group Write with space like 11 17" required />
               


 <input className="upload-car-form-detail" type="text" name="fuelType"
                        placeholder="Product origin" required />
                         <input className="upload-car-form-detail" type="text" name="fuelType"
                        placeholder="Product made in which country" required />
                         <input className="upload-car-form-detail" type="text" name="fuelType"
                        placeholder="warranty in months and year" required />
                         <input className="upload-car-form-detail" type="text" name="fuelType"
                        placeholder="how many return days From the date of delivery" required />
                         <input className="upload-car-form-detail" type="text" name="fuelType"
                        placeholder="Desciption if something left height width and more." required />
     <label for="imgUploadInput" className="upload-btn">Upload Product Image</label>
<input id="imgUploadInput" type="file" accept="image/*"/>

                                <input className="upload-car-form-detail-btn" type="submit" value="Submit" />
                            </form>
                    </div> 

                </>
                )
}
                export default Listing;