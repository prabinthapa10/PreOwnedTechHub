import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Toastify from "../components/Toastify";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [activeDiv, setActiveDiv] = useState("profileDetails");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const linkList = [
    { id: "dashboardDetails", label: "Dashboard" },
    { id: "productDetails", label: "Product" },
    { id: "categorieDetails", label: "Categories" },
    { id: "customerDetails", label: "Customers" },
  ];

  const boxItems = [
    {
      id: "orderPendingBox",
      name: "Order Pending",
      number: "2",
      image: "/images/cart.png",
    },
    {
      id: "orderPendingBox",
      name: "Order Processing",
      number: "2",
      image: "/images/cart.png",
    },
    {
      id: "incomeBox",
      name: "Total Income",
      number: "3000",
      image: "/images/cart.png",
    },
    {
      id: "incomeBox",
      name: "Total Income",
      number: "3000",
      image: "/images/cart.png",
    },
  ];
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      fetch("http://127.0.0.1:8000/api/user_list/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => console.error("Error fetching users:", error));
    } else {
      console.log("No access token found.");
    }

    // fetch products
    if (token) {
      fetch("http://127.0.0.1:8000/api/product_list/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts(data); // Set users state
        })
        .catch((error) => console.error("Error fetching users:", error));
    } else {
      console.log("No access token found.");
    }
  }, []);

  const handleAddProduct = () => {
    navigate("/add_product");
  };

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Unauthorized! Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/product_list/${productId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        toast.success("Product deleted successfully.");
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="flex flex-col">
      <Toastify />
      {/* header */}
      <div className="flex justify-center items-center bg-customPurple">
        <div className="flex justify-between p-2 w-[95%] ">
          <div className="flex items-center space-x-3">
            <img src="/images/logo.png" className="h-[70px]" alt="" />
            <h1 className="font-avantgarde font-bold text-3xl text-center">
              Pre Owned Tech Hub
            </h1>
          </div>
          <div className="flex items-center" onClick={handleLogout}>
            <Button name="Log Out" className={`text-xl font-bold text-black`} />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* left box */}
        <div className="w-[20%]">
          <ul className="flex flex-col">
            {linkList.map((item) => (
              <li
                key={item.id}
                className={`p-5 font-semibold rounded-md cursor-pointer transition-all border-b-2 
                    ${
                      activeDiv === item.id
                        ? "bg-purple-500 text-white "
                        : "bg-white border-purple-300 hover:bg-purple-100"
                    }`}
                onClick={() => setActiveDiv(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        {/* right box */}
        <div className="w-[80%]  bg-white shadow-lg rounded-lg">
          {activeDiv === "dashboardDetails" && (
            <div>
              <h1 className="text-3xl p-6">Dashboard</h1>
              <p className="text-red text-xl bg-customBg px-6 py-3 mx-5">
                Dashbaoard
              </p>
              <div className="flex justify-around space-x-3 mt-[20px]">
                {/* details box */}
                {boxItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex border-2 rounded-md p-2 w-[250px] h-[90px] text-[20px] bg-red-300 justify-between"
                  >
                    <div>
                      <h1>{item.name}</h1>
                      <p className="font-bold ml-2 mt-3">{item.number}</p>
                    </div>
                    <div className="m-auto">
                      <img src={item.image} alt="Cart Icon" />
                    </div>
                  </div>
                ))}
              </div>
              {/* TAble */}
              <div>Order Table</div>
            </div>
          )}
          {/* Product table */}
          {activeDiv === "productDetails" && (
            <div className="text-purple-700 text-xl ">
              <h1 className="text-3xl p-6">Product</h1>
              <p className="text-red text-xl bg-customBg px-6 py-3 mx-5">
                Product Details
              </p>
              <div onClick={handleAddProduct}>
                <Button name={"Add Product"} />
              </div>

              <div className=" mx-[20px]">
                <table className="w-full border-collapse mt-5 mx- border-2 text-black">
                  <thead>
                    <tr className="bg-customBg">
                      <th className="border-2 px-4 py-2">S.No</th>
                      <th className="border-2 px-4 py-2">ID</th>
                      <th className="border-2 px-4 py-2">Name</th>
                      <th className="border-2 px-4 py-2">Description</th>
                      <th className="border-2 px-4 py-2">Price</th>
                      <th className="border-2 px-4 py-2">Category</th>
                      <th className="border-2 px-4 py-2">Conditon</th>
                      <th className="border-2 px-4 py-2">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr
                        key={index}
                        className="border border-purple-500 text-center"
                      >
                        <td className="border-2 px-4 py-2">{index + 1}</td>
                        <td className="border-2 px-4 py-2">
                          {product.id || "-"}
                        </td>
                        <td className="border-2 px-4 py-2">
                          {product.name || "-"}
                        </td>
                        <td className="border-2 px-4 py-2">
                          {product.description || "-"}
                        </td>
                        <td className="border-2 px-4 py-2">
                          {product.price || "-"}
                        </td>
                        <td className="border-2 px-4 py-2">
                          {product.category || "-"}
                        </td>
                        <td className="border-2 px-4 py-2">
                          {product.condition || "-"}
                        </td>
                        <td className="border-2 px-4 py-2">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Categories table */}
          {activeDiv === "categorieDetails" && (
            <div className="text-purple-700 text-xl font-semibold">
              Categories Details
            </div>
          )}
          {/* Customer table */}
          {activeDiv === "customerDetails" && (
            <div className="text-purple-700 text-xl font-semibold">
              <h1 className="text-3xl p-6">Cutomers</h1>
              <p className="text-red text-xl bg-customBg px-6 py-3 mx-5">
                Customers Details
              </p>

              <div className=" mx-[20px]">
                <table className="w-full border-collapse mt-5 mx- border-2  text-black">
                  <thead>
                    <tr className="bg-customBg">
                      <th className="border-2 px-4 py-2">S.No</th>
                      <th className="border-2 px-4 py-2">Email</th>
                      <th className="border-2 px-4 py-2">First Name</th>
                      <th className="border-2 px-4 py-2">Last Name</th>
                      <th className="border-2 px-4 py-2">Gender</th>
                      <th className="border-2 px-4 py-2">Phone Number</th>
                      <th className="border-2 px-4 py-2">Address</th>
                      <th className="border-2 px-4 py-2">Added Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={index}
                        className="border border-purple-500 text-center"
                      >
                        <td className="border-2 px-4 py-2">{index + 1}</td>
                        <td className="border-2 px-4 py-2">{user.email}</td>
                        <td className="border-2 px-4 py-2">
                          {user.first_name || "-"}
                        </td>
                        <td className="border-2 px-4 py-2">
                          {user.last_name || "-"}
                        </td>
                        <td className="border-2 px-4 py-2">
                          {user.gender || "-"}
                        </td>
                        <td className="border-2 px-4 py-2">
                          {user.phone_number || "-"}
                        </td>
                        <td className="border-2 px-4 py-2">
                          {user.address || "-"}
                        </td>
                        <td className="border-2 px-4 py-2">
                          {user.added_date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" w-[50%]"></div>
    </div>
  );
}

export default AdminDashboard;
