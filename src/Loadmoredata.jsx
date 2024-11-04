import React, { useEffect, useState } from "react";
import "./style.css";

function Loadmoredata() {
  const [product, setproduct] = useState([]);
  const [count, setcount] = useState(0);
  const [loading, setloading] = useState(false);
  const [disable, setdisable] = useState(false);
  async function fetchproduct() {
    try {
      setloading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const result = await response.json();
      if (result && result.products && result.products.length) {
        console.log(result);
        setproduct((prevData) => [...prevData, ...result.products]);
        setloading(false);
      }
    } catch (error) {
      console.log(error.message);
      setloading(false);
    }
  }

useEffect(()=>{
if(product && product.length===100)setdisable(true)
},[product])

  useEffect(() => {
    fetchproduct();
  }, []);
  if (loading) {
    <div>loading...</div>;
  }
  return (
    <div className="load-more-container">
      <div className="product-container">
        {product && product.length
          ? product.map((item) => (
              <div className="product">
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title} </p>
              </div>
            ))
          : null}
      </div>

      <div className="button-container">
        <button disabled={disable} onClick={() => setcount(count + 1)}>
          load more products
        </button>
        {disable ? <p>you have reached to 100 products</p> : null}
      </div>
    </div>
  );
}

export default Loadmoredata;
