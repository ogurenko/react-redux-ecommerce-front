import React, { useState, useEffect } from "react";

import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);



  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  },[]);

  
   const loadAllProducts = () => {
     setLoading(true);

     getProducts("createdAt", "desc", page).then((res) => {
       setProducts(res.data);
       setLoading(false);
     });
   };

 

  return (
    <>
      {productsCount}
      <div className="container">
        {/* {JSON.stringify(products)} */}
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => {
              return (
                <div key={product._id} className="col-md-4">
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
