import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroSecion() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="flex justify-center bg-customBg">
      <div className="flex border w-[90%] h-[300px]">
        {/* left box */}
        <div className="border w-[60%]">
          <Slider {...settings}>
            <div>
              <img src="/slider/banner.jpg" alt="alt" />
            </div>
            <div>
              <img src="/slider/banner2.png" alt="alt" />
            </div>
          </Slider>
        </div>
        {/* right box */}
        <div className="w-[40%]">
          <div className="border">Hello</div>
          <div className="border">Hello</div>
        </div>
      </div>
    </div>
  );
}

export default HeroSecion;
