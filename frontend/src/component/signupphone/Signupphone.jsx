import {Link} from "react-router-dom";
import './signupphone.css';
// import Download from './download.jpg'
function signupphone() {
    return (
        <>
            <div className='main-div-signupphone'>
                <div className='img-signupphone'>
                     <h2 className="brand-text-signupphone">Viamart</h2>
    <p className="brand-subtext-signupphone">Your trusted marketplace for Buyers & Sellers</p></div>
                <div className='signupphone-details'>
                    
                    <form action="submit" className='form-signupphone'>
                        <h3>Signup With Phone Number</h3>
                        <input type="number" placeholder='Enter phone' className='input-detail-signupphone' />
                        <input type="password" placeholder='Enter Password' className='input-detail-signupphone' />
                        <input type="password" placeholder='Enter Password' className='input-detail-signupphone' />
                        <button className='input-detail-signupphone-btn'>signup</button>                </form>  
                         <p style={{textAlign:"center"}}><Link to='/email'>Signup With E-mail</Link></p>
                    <div className='google-signupphone'><button className='google-signupphone-btn'><img src="https://developers.google.com/identity/images/g-logo.png" alt="" className='google-icon' /><span>signup With Google</span></button></div>
      
                 <p style={{textAlign:"end"}}><Link to='/login'>Already Have a Account? Login</Link></p>
                </div>
                </div>
            
        </>
    )
}
export default signupphone;

