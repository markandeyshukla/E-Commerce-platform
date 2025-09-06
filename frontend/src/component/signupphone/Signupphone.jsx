import './signupphone.css';
// import Download from './download.jpg'
function signupphone() {
    return (
        <>
            <div className='main-div-signupphone'>
                <div className='img-signupphone'></div>
                <div className='signupphone-details'>
                    <form action="submit" className='form-signupphone'>
                        <input type="text" placeholder='Enter phone' className='input-detail-signupphone' />
                        <input type="password" placeholder='Enter Password' className='input-detail-signupphone' />
                        <button className='input-detail-signupphone-btn'>signup</button>                </form>  

                    {/* <div className='google-signupphone'><button className='google-signupphone-btn'>signup With Google</button></div> */}
      

                </div>
                </div>
            
        </>
    )
}
export default signupphone;

