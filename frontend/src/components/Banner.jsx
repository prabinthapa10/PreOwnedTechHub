import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Banner() {
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
      <div className="flex w-[90%] h-[380px] space-x-3">
        {/* left box */}
        <div className="w-[70%] ">
          <Slider {...settings}>
            <div className="h-[380px]">
              <img
                className="w-full h-full object-cover"
                src="/images/slider/banner5.png"
                alt="alt"
              />
            </div>
            <div className="h-[380px]">
              <img
                className="w-full h-full object-cover"
                src="/images/slider/banner.jpg"
                alt="alt"
              />
            </div>
          </Slider>
        </div>
        {/* right box */}
        <div className="flex flex-col justify-between w-[30%]">
          <div className="h-[48%]">
            <img
              className="h-full object-cover w-full"
              src="/images/slider/banner.jpg"
              alt="alt"
            />
          </div>
          <div className="h-[48%]">
            <img
              className="h-full w-full object-cover"
              src="/images/slider/banner2.png"
              alt="alt"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
