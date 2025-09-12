import './support.css';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

function Support() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    screenshot: null
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, screenshot: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first to submit an issue!");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("issue", formData.issue);
      if (formData.screenshot) {
        data.append("screenshot", formData.screenshot);
      }

      const res = await fetch("https://e-commerce-platform-5c4x.onrender.com/api/support", {
        method: "POST",
        body: data
      });

      if (res.ok) {
        alert("✅ Your issue has been submitted!");
        navigate("/");
      } else {
        alert("❌ Error submitting issue");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main-div-support'>
      <div className='form-div-support'>
        <form onSubmit={handleSubmit} className='form-main-support'>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name}
            onChange={handleChange}
            className='input-support'
            required
          />
          <input 
            type="email" 
            name="email" 
            placeholder='Your E-mail' 
            value={formData.email}
            onChange={handleChange}
            className='input-support'
            required
          />
          <textarea 
            name="issue"
            className='input-support'
            placeholder='Explain Issue in Detail'
            value={formData.issue}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="issueScreenshot" className='upload-button-support'>
            Upload Issue Screenshot
          </label>
          <input 
            id="issueScreenshot" 
            type="file" 
            name="screenshot"
            className='label-upload-support' 
            accept="image/*"
            onChange={handleChange}
          />

          <input 
            type="submit" 
            value={loading ? "Sending..." : "Send Issue"} 
            className='input-support-btn'
            disabled={loading} 
          />

          {loading && (
            <p style={{ color: "blue", marginTop: "10px" }}>
              📩 Please wait, we are submitting your issue...
            </p>
          )}

          {/* <div><Link to='/msgbox'>Chat With US!</Link></div> */}
        </form>
      </div>
    </div>
  )
}

export default Support;
