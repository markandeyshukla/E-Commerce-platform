import {Link} from "react-router-dom";
import './signupemail.css';
// import Download from './download.jpg'
function signupemail() {
    return (
        <>
            <div className='main-div-signupemail'>
                <div className='img-signupemail'>
                     <h2 className="brand-text-signupemail">Viamart</h2>
    <p className="brand-subtext-signupemail">Your trusted marketplace for Buyers & Sellers</p></div>
                <div className='signupemail-details'>
                    
                    <form action="submit" className='form-signupemail'>
                        <h3>Signup With E-mail</h3>
                        <input type="email" placeholder='Enter phone' className='input-detail-signupemail' />
                        <input type="password" placeholder='Enter Password' className='input-detail-signupemail' />
                        <input type="password" placeholder='Enter Password' className='input-detail-signupemail' />
                        <button className='input-detail-signupemail-btn'>signup</button>                </form>  
                         <p style={{textAlign:"center"}}><Link to='/phone'>Signup With Phone</Link></p>
                    <div className='google-signupemail'><button className='google-signupemail-btn'><img src="https://developers.google.com/identity/images/g-logo.png" alt="" className='google-icon' /><span>signup With Google</span></button></div>
      
                 <p style={{textAlign:"end"}}><Link to='/login'>Already Have a Account? Login</Link></p>
                </div>
                </div>
            
        </>
    )
}
export default signupemail;

