import './support.css';
import { Link } from 'react-router-dom';
function Support(){
    return(
        <>
        <div className='main-div-support'>
           <div className='form-div-support'>
             <form action="submit" className='form-main-support'>
            <input type="text" placeholder="Your Name" className='input-support'/>
            <input type="text" placeholder='Your E-mail' className='input-support'/>
            <textarea name="Issue" id="" className='input-support' placeholder='Explain Issue in Detail' ></textarea>
            <label for="issue" className='upload-button-support'>Upload Issue Screenshot</label>
            <input id="issue" type="file" placeholder="upload Screenshot of Issue" className='label-upload-support' accept="image/*"/>
            <input type="submit" className='input-support-btn'/>
            <div><Link to='/msgbox'>Chat With US!</Link></div>
            </form>
            
           </div>

        </div>
        </>
    )
}
export default Support;