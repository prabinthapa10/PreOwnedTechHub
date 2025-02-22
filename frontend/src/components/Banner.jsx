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
  const image = [
    { id: "1", src: "/images/slider/banner1.png" },
    { id: "1", src: "/images/slider/banner5.png" },
  ];
  return (
    <div className="flex justify-center bg-customBg">
      <div className="flex w-[90%] h-[380px] space-x-3">
        {/* left box */}
        <div className="w-[70%] transition-transform duration-300 transform hover:scale-102 hover:shadow-2xl">
          <Slider {...settings}>
            {image.map((image) => (
              <div className="h-[380px]">
                <img
                  className="w-full h-full object-cover"
                  src={image.src}
                  alt="alt"
                />
              </div>
            ))}
          </Slider>
        </div>
        {/* right box */}
        <div className="flex flex-col justify-between w-[30%] ">
          <div className="h-[48%] transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
            <img
              className="h-full object-cover w-full"
              src="/images/slider/banner.jpg"
              alt="alt"
            />
          </div>
          <div className="h-[48%] transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
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
