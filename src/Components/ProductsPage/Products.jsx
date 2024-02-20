/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Product from "../SignleProduct/Product";
import { useQuery } from "@tanstack/react-query";

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_OST_URL}/services`);
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="products">
      <div className="products-header">
        <h1
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
          className="pt-5 text-center"
        >
          All Products
        </h1>
        <h4
          data-aos="flip-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
          className="text-center pb-5"
        >
          Choose Your Best Products Here
        </h4>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-3 g-4 py-5">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
