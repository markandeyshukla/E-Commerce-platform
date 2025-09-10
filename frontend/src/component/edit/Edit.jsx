import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./edit.css";

function Edit() {
  const { id } = useParams(); 
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://e-commerce-platform-5c4x.onrender.com/api/products/${id}`);
        const data = await res.json();
        setFormData(data);
        setPreview(data.imgUrl);
      } catch (err) {
        console.error(err);
        alert("❌ Failed to fetch product details");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => setFormData((prev) => ({ ...prev, imgUrl: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ You must be logged in to update a product!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://e-commerce-platform-5c4x.onrender.com/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Product updated successfully!");
        navigate("/sellerdashboard");
      } else {
        alert(data.message || "❌ Failed to update product!");
        console.error(data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("❌ Something went wrong!");
    } finally {
      setLoading(false);
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

          {[
            { name: "brandName", placeholder: "Enter Brand Name", type: "text", required: true },
            { name: "productName", placeholder: "Enter Product Name", type: "text", required: true },
            { name: "price", placeholder: "Enter Price", type: "number", required: true },
            { name: "color", placeholder: "Available Color (comma separated)", type: "text" },
            { name: "size", placeholder: "Available Size (optional)", type: "text" },
            { name: "ages", placeholder: "Age Group (e.g. 11-17)", type: "text" },
            { name: "material", placeholder: "Material", type: "text" },
            { name: "manufacturer", placeholder: "Manufacturer", type: "text" },
            { name: "assemble", placeholder: "Product Assembly Info", type: "text" },
            { name: "warranty", placeholder: "Warranty (e.g. 1 Year)", type: "text" },
            { name: "returnDays", placeholder: "Returnable Days", type: "number" },
          ].map((input) => (
            <input
              key={input.name}
              className="upload-car-form-detail"
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name]}
              onChange={handleChange}
              required={input.required || false}
            />
          ))}

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
            value={loading ? "Updating..." : "Update Product"}
            disabled={loading}
          />
        </form>
      </div>
    </>
  );
}

export default Edit;
