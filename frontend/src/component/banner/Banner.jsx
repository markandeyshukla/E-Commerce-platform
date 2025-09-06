import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import banner1 from './banner1.webp';
import banner from './banner.webp';
import banner2 from './banner2.webp';
import banner3 from './banner3.webp';
import banner5 from './banner5.webp';
import './banner.css';

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  const images = [
    banner,
    banner1,
    banner2,
    banner3,
    banner5
  ];

  return (
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index}>
          <img src={img} alt="banner" className="banner-img"/>
        </div>
      ))}
    </Slider>
  );
}

export default Banner;
