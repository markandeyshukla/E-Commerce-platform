import './detailpage.css';
import Download from './download.jpg';
import { Link } from 'react-router-dom';
function Detailpage(){
    return(
        <>
        <div className='detailpage-main-div'>
            <div className='detailpage-img-div'>
                
                    <img src={Download} alt="" className='detailpage-img'/>
                    <h2 className='name-product-detailpage'>Hydrogen</h2>
                    <button className='detailpage-buy-btn'>Add to Cart</button>
                   <Link to='/payment'> <button className='detailpage-buy-btn'>Buy Product Name</button></Link>
                
            </div>
            <div className='detailpage-feature-div'>
             <div className='detailpage-inside-div'>
                   <h2 className='name-product-detailpage'>Hydrogen</h2>
                <p><strong>Quantity:</strong>1L</p>
                <p><strong>size:</strong> xs,xl,xxl,xxxl</p>
                <p><strong>color:</strong> Red,Pink,Black </p>
               <p> <strong>price:</strong>249</p>
                <p><strong>product origin:</strong>india</p>
                <p><strong>product made:</strong> of india</p>
                <p><strong>warranty:</strong>6 months</p>
                <p><strong>return policy:</strong>7 days</p>
                <p><strong>description:</strong>a product that i dontknow what is</p>
             </div>
            </div>
        </div>
        </>
    )
}
export default Detailpage;