/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WebController } from "../../../ParentContext/Context";
import toast from "react-hot-toast";

const CartProduct = ({ product }) => {
  const { userInfo } = useContext(WebController);
  const router = useNavigate();
  const [value, setValue] = useState(1);
  const { img, name, seller, price, ratings, shipping } = product;

  const plus = () => {
    setValue(value + 1);
  };
  const minus = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };
  const totalPrice = (price + shipping) * value;

  const handleOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const customerName = form.customerName.value;
    const price = form.price.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const productName = form.productName.value;

    const orders = {
      customerName,
      price: totalPrice,
      email,
      phone,
      address,
      productName,
    };
    fetch(`${import.meta.env.VITE_OST_URL}/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orders),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          form.reset();
          toast.success("Your order Completed");
          router("/orders");
        }
      });
  };
  return (
    <form onSubmit={handleOrder}>
      <div className="row align-items-center justify-content-center py-3">
        <div className="col-12 col-lg-6">
          <div className="cart-img">
            <img className="w-75" src={img} alt={name} />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="details">
            <h4>
              <span className="text-secondary">Ratings:</span> {ratings}
            </h4>
            <h1>{name}</h1>
            <div className="d-flex align-items-center">
              <h3 className="pe-5">Price: $ {price}</h3>
              <h5 className="text-secondary">Shipping: $ {shipping}</h5>
            </div>
            <p>Brand: {seller}</p>
            <p className="color-text">
              In order to sit comfortably for long periods, people need freedom
              of movement. The Form rocking chair has a molded plastic shell
              with a wide, curved seat…
            </p>
            <p className="color-text">* Certified engineered hardwood frame.</p>
            <p className="color-text">
              * Durable mortise-and-tenon construction.
            </p>

            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Customer Name</label>
              <input
                type="text"
                className="form-control mt-2"
                id="formGroupExampleInput"
                placeholder="Customer Name"
                defaultValue={userInfo?.displayName}
                name="customerName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Price</label>
              <input
                type="text"
                className="form-control mt-2"
                id="formGroupExampleInput"
                placeholder={totalPrice}
                name="price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Email</label>
              <input
                type="text"
                className="form-control mt-2"
                id="formGroupExampleInput"
                placeholder="Enput Your Email"
                defaultValue={userInfo?.email}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Phone</label>
              <input
                type="text"
                className="form-control mt-2"
                id="formGroupExampleInput"
                placeholder="Input Your Phone Number"
                name="phone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Your address</label>
              <input
                type="text"
                className="form-control mt-2"
                id="formGroupExampleInput"
                placeholder="Input Your address"
                name="address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Product name</label>
              <input
                type="text"
                className="form-control mt-2"
                id="formGroupExampleInput"
                name="productName"
                defaultValue={name}
                readOnly
              />
            </div>

            <h3 className="color-text py-3">Total: $ {totalPrice}</h3>
            <div className="counter">
              <div
                className="btn-group pe-0 pe-md-3 shadow-sm"
                role="group"
                aria-label="Basic example"
              >
                <button type="button" onClick={minus} className="btn minus">
                  -
                </button>
                <input
                  type="number"
                  className="text-center"
                  disabled
                  value={value}
                />
                <button type="button" onClick={plus} className="btn plus">
                  +
                </button>
              </div>
              <button
                type="submit"
                className="btn btn-dark rounded-0 btn-200px orderBtn"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CartProduct;
