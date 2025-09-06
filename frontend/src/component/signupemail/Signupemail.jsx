import './signupemail.css';
// import Download from './download.jpg'
function signupemail() {
    return (
        <>
            <div className='main-div-signupemail'>
                <div className='img-signupemail'></div>
                <div className='signupemail-details'>
                    <form action="submit" className='form-signupemail'>
                        <input type="text" placeholder='Enter Email' className='input-detail-signupemail' />
                        <input type="password" placeholder='Enter Password' className='input-detail-signupemail' />
                        <button className='input-detail-signupemail-btn'>signup</button>                </form>  

                    <div className='google-signupemail'><button className='google-signupemail-btn'>signup With Google</button></div>
      

                </div>
                </div>
            
        </>
    )
}
export default signupemail;

