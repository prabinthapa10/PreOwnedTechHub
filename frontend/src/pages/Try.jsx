import React from "react";

function Try() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/product_list/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1>Hellos</h1>
    </div>
  );
}

export default Try;
