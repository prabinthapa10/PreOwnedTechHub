import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import axios from "axios";
import Button from "../components/Button";
export default function AddProduct() {
  const [token, setToken] = useState(null);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("Laptop");
  const [productBrand, setProductBrand] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [productStock, setStock] = useState("");
  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [battery, setBattery] = useState("");
  const [screenSize, setScreenSize] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [camera, setCamera] = useState("");
  const [simSlots, setSimSlots] = useState("");
  const [gpu, setGpu] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    }
    console.log("Token:", storedToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("category", productCategory);
    formData.append("brand", productBrand);
    formData.append("condition", productCondition);
    formData.append("stock", productStock);
    formData.append("processor", processor);
    formData.append("ram", ram);
    formData.append("storage", storage);
    formData.append("battery", battery);
    formData.append("screen_size", screenSize);
    formData.append("operating_system", operatingSystem);
    formData.append("camera", camera);
    formData.append("sim_slots", simSlots);
    formData.append("gpu", gpu);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/add_product/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product added:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded shadow-md"
    >
      <InputField
        id="name"
        name="name"
        label="Product Name"
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeHolder="Product Name"
        className="block w-full p-2 border rounded"
      />
      <textarea
        id="description"
        name="description"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        placeholder="Product Description"
        className="block w-full p-2 border rounded"
        rows="4"
      />
      <InputField
        id="price"
        name="price"
        label="Product Price"
        type="text"
        value={productPrice}
        onChange={(e) => setProductPrice(Number(e.target.value))}
        placeHolder="Product Price"
        className="block w-full p-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProductImage(e.target.files[0])} // Store the file object
        className="block w-full p-2 border rounded"
      />
      <InputField
        id="category"
        name="category"
        label="Product Category"
        type="text"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
        placeHolder="Product Category"
        className="block w-full p-2 border rounded"
      />
      <InputField
        id="brand"
        name="brand"
        label="Product Brand"
        type="text"
        value={productBrand}
        onChange={(e) => setProductBrand(e.target.value)}
        placeHolder="Product Brand"
        className="block w-full p-2 border rounded"
      />
      <InputField
        id="condition"
        name="condition"
        label="Product Condition"
        type="text"
        value={productCondition}
        onChange={(e) => setProductCondition(e.target.value)}
        placeHolder="Product Condition"
        className="block w-full p-2 border rounded"
      />
      <InputField
        id="stock"
        name="stock"
        label="Stock"
        type="text"
        value={productStock}
        onChange={(e) => setStock(Number(e.target.value))}
        placeHolder="Stock"
        className="block w-full p-2 border rounded"
      />
      <InputField
        id="processor"
        name="processor"
        label="Processor"
        type="text"
        value={processor}
        onChange={(e) => setProcessor(e.target.value)}
        placeHolder="Processor"
        className="block w-full p-2 border rounded"
      />
      <InputField
        id="ram"
        name="ram"
        label="RAM"
        type="text"
        value={ram}
        onChange={(e) => setRam(e.target.value)}
        placeHolder="RAM"
        className="block w-full p-2 border rounded"
      />
      <InputField
        id="storage"
        name="storage"
        label="Storage"
        type="text"
        value={storage}
        onChange={(e) => setStorage(e.target.value)}
        placeHolder="Storage"
        className="block w-full p-2 border rounded"
      />
      <InputField
        id="battery"
        name="battery"
        label="Battery"
        type="text"
        value={battery}
        onChange={(e) => setBattery(e.target.value)}
        placeHolder="Battery"
        className="block w-full p-2 border rounded"
      />

      <InputField
        id="screen_size"
        name="screen_size"
        label="Screen Size"
        type="text"
        value={screenSize}
        onChange={(e) => setScreenSize(e.target.value)}
        placeHolder="Screen Size"
        className="block w-full p-2 border rounded"
      />
      <InputField
        id="operating_system"
        name="operating_system"
        label="Operating System"
        type="text"
        value={operatingSystem}
        onChange={(e) => setOperatingSystem(e.target.value)}
        placeHolder="Operating System"
        className="block w-full p-2 border rounded"
      />
      <InputField
        id="camera"
        name="camera"
        label="Camera"
        type="text"
        value={camera}
        onChange={(e) => setCamera(e.target.value)}
        placeHolder="Camera"
        className="block w-full p-2 border rounded"
      />
      <InputField
        id="sim_slots"
        name="sim_slots"
        label="Sim Slots"
        type="text"
        value={simSlots}
        onChange={(e) => setSimSlots(e.target.value)}
        placeHolder="Sim Slots"
        className="block w-full p-2 border rounded"
      />
      <InputField
        id="gpu"
        name="gpu"
        label="GPU"
        type="text"
        value={gpu}
        onChange={(e) => setGpu(e.target.value)}
        placeHolder="GPU"
        className="block w-full p-2 border rounded"
      />
      <div>
        <Button />
      </div>
    </form>
  );
}
