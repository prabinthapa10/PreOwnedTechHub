import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function ProductItems({
  id,
  type,
  category,
  processor,
  screen_size,
  gpu,
  price,
  image,
  condition,
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
      {/* side product */}
      {type == "side" ? (
        <div
          className="flex w-[380px] h-[200px] bg-white shadow-lg items-center transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
          onClick={handleClick}
        >
          <div className="w-[40%]">
            <div>
              {condition == "New" ? (
                <div className="w-[50px] bg-[#ff0505] ext-[11px]  text-center  rounded-sm">
                  <p className="">New</p>
                </div>
              ) : null}
            </div>
            <div className="w-[140px] h-[125px] mt-3">
              <img
                className="w-full  h-full  object-cover"
                src={`http://127.0.0.1:8000/${image}`}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col w-[60%] ">
            <div className="flex h-[154px] flex-col px-2 py-2 text-[13px] leading-tight bg-gray-100 rounded-lg shadow-md">
              {category == "Laptop" ? (
                // for laptop
                <>
                  <span>
                    🎮 <strong>High Performance:</strong> {processor}
                  </span>
                  <span>
                    🖥️ <strong>Fast Display:</strong> {screen_size}
                  </span>
                  <span>
                    🎮 <strong>RTX Graphics:</strong> {gpu}
                  </span>
                  <br />
                </>
              ) : category == "Smartphone" ? (
                // for phone
                <strong>
                  <span>
                    📱 <strong>Powerful Processor:</strong> {processor}
                  </span>
                  <span>
                    🔆 <strong>Vibrant Display:</strong> {screen_size}
                  </span>
                  <span>
                    📸 <strong>High-Quality Camera:</strong> {gpu}
                  </span>
                  <br />
                </strong>
              ) : (
                // for smart watch
                <>
                  <span>
                    ⌚ <strong>Advanced Features:</strong> {processor}
                  </span>
                  <span>
                    🖥️ <strong>Display:</strong> {screen_size}
                  </span>
                  <span>
                    🔋 <strong>Battery Life:</strong> {gpu}
                  </span>
                  <br />
                </>
              )}
              <p className="mt-2">💰Price: NPR {price}</p>
            </div>
            <div onClick={addToCart}>
              <Button name="Add to Cart" className={"w-full rounded-none"} />
            </div>
          </div>
        </div>
      ) : (
        // horizontal product
        <div
          className="w-[255px] h-[330px] bg-white shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
          onClick={handleClick}
        >
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
          <div className="w-[255px] h-[137.5px] mt-3 p-2 text-[13px] leading-tight bg-gray-100 rounded-lg shadow-md">
            {category == "Laptop" ? (
              // for laptop
              <>
                <span>
                  🎮 <strong>High Performance:</strong> {processor}
                </span>
                <span>
                  🖥️ <strong>Fast Display:</strong> {screen_size}
                </span>
                <span>
                  🎮 <strong>RTX Graphics:</strong> {gpu}
                </span>
                <br />
              </>
            ) : category == "Smartphone" ? (
              // for phone
              <strong>
                <span>
                  📱 <strong>Powerful Processor:</strong> {processor}
                </span>
                <span>
                  🔆 <strong>Vibrant Display:</strong> {screen_size}
                </span>
                <span>
                  📸 <strong>High-Quality Camera:</strong> {gpu}
                </span>
                <br />
              </strong>
            ) : (
              // for smart watch
              <>
                <span>
                  ⌚ <strong>Advanced Features:</strong> {processor}
                </span>
                <span>
                  🖥️ <strong>Display:</strong> {screen_size}
                </span>
                <span>
                  🔋 <strong>Battery Life:</strong> {gpu}
                </span>
                <br />
              </>
            )}
            <p className="mt-6">💰Price: NPR {price}</p>
          </div>
          <div onClick={addToCart}>
            <Button name={"Add to cart"} className={"rounded-none w-full"} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductItems;
