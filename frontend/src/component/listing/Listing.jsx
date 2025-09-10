import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./listing.css";

function Listing() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    brandName: "",
    productName: "",
    price: "",
    color: "",
    size: "",
    ages: "",
    material: "",
    manufacturer: "",
    assemble: "",
    warranty: "",
    returnDays: "",
    description: "",
    keywords: "",
    imgUrl: "",
  });

  const [preview, setPreview] = useState(null);
  const [imgUploading, setImgUploading] = useState(false); // ✅ New state for image uploading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setImgUploading(true); 

    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      const res = await fetch("https://e-commerce-platform-5c4x.onrender.com/api/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formDataImg,
      });

      const data = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, imgUrl: data.imgUrl }));
      } else {
        alert("Image upload failed");
        console.error(data);
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setImgUploading(false); // ✅ stop uploading
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imgUrl) {
      alert("Please upload a product image before submitting!");
      return;
    }

    try {
      const res = await fetch("https://e-commerce-platform-5c4x.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Product uploaded successfully!");
        navigate("/sellerdashboard");
      } else {
        alert("❌ Failed to upload product!");
        console.error(data);
      }
    } catch (err) {
      console.error("Error uploading product:", err);
    }
  };

  return (
    <>
      <h1 className="heading1">ViaMart Listing Page</h1>

      <div className="upload-car-main">
        <form className="Upload-car-form" id="uploadcar" onSubmit={handleSubmit}>
          <img
            id="previewImg"
            className="imgpreview-upload-car"
            src={preview}
            alt="Preview will appear here"
            width="200"
          />

          <input
            className="upload-car-form-detail"
            type="text"
            name="brandName"
            placeholder="Enter Brand Name"
            value={formData.brandName}
            onChange={handleChange}
            required
          />
          <input
            className="upload-car-form-detail"
            type="text"
            name="productName"
            placeholder="Enter Product Name"
            value={formData.productName}
            onChange={handleChange}
            required
          />
          <input
            className="upload-car-form-detail"
            type="number"
            name="price"
            placeholder="Enter Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            className="upload-car-form-detail"
            type="text"
            name="color"
            placeholder="Available Color (comma separated)"
            value={formData.color}
            onChange={handleChange}
          />
          <input
            className="upload-car-form-detail"
            type="text"
            name="size"
            placeholder="Available Size (optional)"
            value={formData.size}
            onChange={handleChange}
          />
          <input
            className="upload-car-form-detail"
            type="text"
            name="ages"
            placeholder="Age Group (e.g. 11-17)"
            value={formData.ages}
            onChange={handleChange}
          />
          <input
            className="upload-car-form-detail"
            type="text"
            name="material"
            placeholder="Material"
            value={formData.material}
            onChange={handleChange}
          />
          <input
            className="upload-car-form-detail"
            type="text"
            name="manufacturer"
            placeholder="Manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
          />
          <input
            className="upload-car-form-detail"
            type="text"
            name="assemble"
            placeholder="Product Assembly Info"
            value={formData.assemble}
            onChange={handleChange}
          />
          <input
            className="upload-car-form-detail"
            type="text"
            name="warranty"
            placeholder="Warranty (e.g. 1 Year)"
            value={formData.warranty}
            onChange={handleChange}
          />
          <input
            className="upload-car-form-detail"
            type="number"
            name="returnDays"
            placeholder="Returnable Days"
            value={formData.returnDays}
            onChange={handleChange}
          />
          <textarea
            className="upload-car-form-detail"
            name="description"
            placeholder="Description (height, width, extra details)"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <textarea
            className="upload-car-form-detail"
            name="keywords"
            placeholder="Keywords for Product Search (comma separated)"
            value={formData.keywords}
            onChange={handleChange}
            required
          />

          <label htmlFor="imgUploadInput" className="upload-btn">
            Upload Product Image
          </label>
          <input
            id="imgUploadInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          <input
            className="upload-car-form-detail-btn"
            type="submit"
            value={imgUploading ? "Uploading Image..." : "Submit"}
            disabled={imgUploading} // ✅ prevent submitting while uploading
          />
        </form>
      </div>
    </>
  );
}

export default Listing;
