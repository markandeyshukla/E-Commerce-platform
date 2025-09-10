import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./edit.css";

function Edit() {
  const { id } = useParams(); // product id from URL
  const navigate = useNavigate();

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

  // Fetch existing product data
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setPreview(data.imgUrl);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image preview and base64 conversion
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imgUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle PUT submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Product updated successfully!");
        navigate("/sellerdashboard"); // redirect to dashboard
      } else {
        alert("❌ Failed to update product!");
        console.error(data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <h1 className="heading1">Edit Product</h1>

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
            placeholder="Keywords for Product Search"
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
            value="Update Product"
          />
        </form>
      </div>
    </>
  );
}

export default Edit;
