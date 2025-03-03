import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Toastify from "../components/Toastify";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import NavMenu from "../components/NavMenu";
import Navbar from "../components/Navbar";

export default function SubmtiProduct() {
  const [token, setToken] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("");
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

  const handleChangeCategory = (e) => {
    setProductCategory(e.target.value);
  };
  const handleChangeCondition = (e) => {
    setProductCondition(e.target.value);
  };

  const validate = () => {
    const errors = {};
    if (!productName) errors.productName = "Product name is required.";
    if (!productDescription)
      errors.productDescription = "Description is required.";
    if (!productPrice || isNaN(productPrice))
      errors.productPrice = "Valid price is required.";
    if (!productBrand) errors.productBrand = "Brand is required.";
    if (!productStock || isNaN(productStock))
      errors.productStock = "Valid stock quantity is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Error adding product. Please try again.");
      return;
    }

    setIsSubmit(true);

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("category", productCategory);
    formData.append("image", productImage);
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
      toast.success("Added Successfully");
    } catch (error) {
      toast.error("Error adding product. Please try again.");
    }
  };

  const navigate = useNavigate();
  const backButton = () => {
    navigate("/admin-dashboard");
  };

  return (
    <>
      <Toastify />
      <Navbar />
      <div className="mt-1">
        <NavMenu />
      </div>
      <form className="w-[90%] m-auto p-4 rounded shadow-md mt-10">
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
        {formErrors.productName && (
          <p className="text-red-500">{formErrors.productName}</p>
        )}
        <textarea
          id="description"
          name="description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Product Description"
          className="block w-full p-2 border rounded"
          rows="4"
        />
        {formErrors.productDescription && (
          <p className="text-red-500">{formErrors.productDescription}</p>
        )}
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
        {formErrors.productPrice && (
          <p className="text-red-500">{formErrors.productPrice}</p>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProductImage(e.target.files[0])}
          className="block w-full p-2 border rounded"
        />
        {formErrors.productImage && (
          <p className="text-red-500">{formErrors.productImage}</p>
        )}
        <select
          id="category"
          name="category"
          value={productCategory}
          onChange={handleChangeCategory}
          className="block w-full p-2 border rounded mt-5"
        >
          <option value="Laptop">Laptop</option>
          <option value="Smartphone">Smartphone/Tablet</option>
          <option value="Smartwatch">Smartwatch</option>
        </select>
        {formErrors.productCategory && (
          <p className="text-red-500">{formErrors.productCategory}</p>
        )}
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
        {formErrors.productBrand && (
          <p className="text-red-500">{formErrors.productBrand}</p>
        )}
        <select
          id="condition"
          name="condition"
          value={productCondition}
          onChange={handleChangeCondition}
          className="block w-full p-2 border rounded"
        >
          <option value="New">New</option>
          <option value="Used - Like New">Used - Like New</option>
          <option value="Used - Good">Used - Good</option>
          <option value="Used - Fair">Used - Fair</option>
        </select>
        {formErrors.productCondition && (
          <p className="text-red-500">{formErrors.productCondition}</p>
        )}
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
        {formErrors.productStock && (
          <p className="text-red-500">{formErrors.productStock}</p>
        )}
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
        {formErrors.processor && (
          <p className="text-red-500">{formErrors.processor}</p>
        )}
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
        {formErrors.ram && <p className="text-red-500">{formErrors.ram}</p>}
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
        {formErrors.storage && (
          <p className="text-red-500">{formErrors.storage}</p>
        )}
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
        {formErrors.battery && (
          <p className="text-red-500">{formErrors.battery}</p>
        )}
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
        {formErrors.screenSize && (
          <p className="text-red-500">{formErrors.screenSize}</p>
        )}
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
        {formErrors.operatingSystem && (
          <p className="text-red-500">{formErrors.operatingSystem}</p>
        )}
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
        {formErrors.camera && (
          <p className="text-red-500">{formErrors.camera}</p>
        )}
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
        {formErrors.simSlots && (
          <p className="text-red-500">{formErrors.simSlots}</p>
        )}
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
        {formErrors.gpu && <p className="text-red-500">{formErrors.gpu}</p>}
        <div>
          <Button name="Submit Product" />
        </div>
      </form>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
}
