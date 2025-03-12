import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import NPR from "./NPR";

function ProductItems({
  id,
  name,
  type,
  category,
  processor,
  screen_size,
  gpu,
  price,
  image,
  condition,
  storage,
  ram,
  battery,
  camera,
}) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/specific_product/${id}`);
  };

  const addToCart = async (id, e) => {
    e.stopPropagation();
    if (!id) return alert("Invalid product ID");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/add_to_cart/",
        { product_id: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <>
      {/* Horizontal product */}
      {type == "side" ? (
        <div
          className="flex w-[380px] h-[200px] bg-white shadow-lg items-center transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
          onClick={handleClick}
        >
          <div className="w-[45%] h-full">
            <div>
              {condition == "New" ? (
                <div className="w-[50px] bg-[#ff0505] text-[11px] text-center  rounded-sm">
                  <p className="">New</p>
                </div>
              ) : null}
            </div>
            <div className="w-[full] h-[125px] mt-3">
              <img
                className="w-full  h-full  object-cover"
                src={`http://127.0.0.1:8000/${image}`}
                alt=""
              />
            </div>
          </div>
          {/* description */}
          <div className="flex flex-col w-[55%] bg-gray-100">
            <div className="flex h-[125px] flex-col px-2 py-2 text-[13px]">
              {category == "Laptop" ? (
                // for laptop
                <>
                  <div className="text-center m-1">
                    <strong className="text-[14px]">{name}</strong>
                  </div>
                  <div>
                    💻 <strong>Processor:</strong> {processor}
                  </div>
                  <div>
                    👀 <strong>Screen:</strong> {screen_size}
                  </div>
                  <div>
                    💻 <strong>GPU:</strong> {gpu}
                  </div>
                  <br />
                </>
              ) : category == "Smartphone" ? (
                // for phone
                <>
                  <div className="text-center m-1">
                    <strong className="text-[14px]">{name}</strong>
                  </div>
                  <div>
                    📱 <strong>Processor:</strong> {processor}
                  </div>
                  <div>
                    👀 <strong>Screen Size:</strong> {screen_size}
                  </div>
                  <div>
                    💾 <strong>Storage:</strong> {storage}
                  </div>
                  <br />
                </>
              ) : (
                // for smart watch
                <>
                  <div className="text-center m-1">
                    <strong className="text-[14px]">{name.slice(0, 17)}</strong>
                  </div>
                  <div>
                    ⌚ <strong>Advanced Features:</strong> {processor}
                  </div>
                  <div>
                    🖥️ <strong>Display:</strong> {screen_size}
                  </div>
                  <div>
                    🔋 <strong>Battery Life:</strong> {battery}
                  </div>
                  <br />
                </>
              )}
            </div>
            <div>
              <p className="mt-2 text-[13px]">
                💰Price: <NPR /> {price}
              </p>
              <div onClick={addToCart}>
                <Button name="Add to Cart" className={"w-full rounded-none"} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // vertical product
        <div
          className="w-[255px] h-[330px] bg-white shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
          onClick={handleClick}
        >
          {/* new */}
          <div>
            {condition == "New" ? (
              <div className="w-[50px] bg-[#ff0505] text-[11px]  text-center  rounded-sm">
                <p className="">New</p>
              </div>
            ) : (
              <>
                <div className="w-[50px] h-[15px]"></div>
              </>
            )}
          </div>
          <div className="w-[180px] h-[124px] m-auto">
            <img
              className="w-full h-full object-cover"
              src={`http://127.0.0.1:8000/${image}`}
              alt="Product Image"
            />
          </div>
          {/* description section */}
          <div className="bg-gray-100">
            <div className="w-[255px] h-[112px] mt-3 p-2 text-[13px]">
              {category === "Laptop" ? (
                // for laptop
                <>
                  <div className="text-center m-1">
                    <strong className="text-[14px]">{name}</strong>
                  </div>
                  <div>
                    🎮 <strong>Performance:</strong> {processor}
                  </div>
                  <div>
                    🖥️ <strong>Display:</strong> {screen_size}
                  </div>
                  <div>
                    🎮 <strong>Graphics:</strong> {gpu}
                  </div>
                </>
              ) : category === "Smartphone" ? (
                // for phone
                <>
                  <div className="text-center m-1">
                    <strong className="text-[14px]">{name}</strong>
                  </div>
                  <div>
                    📱 <strong>Processor:</strong> {processor}
                  </div>
                  <div>
                    👀 <strong>Screen Size:</strong> {screen_size}
                  </div>
                  <div>
                    📸 <strong>Camera:</strong> {camera}
                  </div>
                </>
              ) : category === "Smartwatch" ? (
                // for smartwatch
                <>
                  <div className="text-center m-1">
                    <strong className="text-[14px]">{name}</strong>
                  </div>
                  <div>
                    ⌚ <strong>Processor:</strong> {processor}
                  </div>
                  <div>
                    🖥️ <strong>Display:</strong> {screen_size}
                  </div>
                  <div>
                    🔋 <strong>Battery Life:</strong> {battery}
                  </div>
                  <br />
                </>
              ) : null}
            </div>

            <div>
              <p className="text-[13px]">
                💰 Price: <NPR /> {price}
              </p>
              <div onClick={addToCart}>
                <Button name="Add to cart" className="rounded-none w-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductItems;
