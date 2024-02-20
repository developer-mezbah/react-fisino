import React, { useContext, useEffect, useState } from "react";
import { WebController } from "../../ParentContext/Context";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Orders = () => {
  const { userInfo } = useContext(WebController);

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders", userInfo?.email],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_OST_URL}/orders?email=${userInfo.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (order) => {
    const agree = window.confirm(`are You want to Cancel ${order.productName}`);
    if (agree) {
      fetch(`${import.meta.env.VITE_OST_URL}/orders/${order._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success(`Your ${order.productName} is Deleted Successfully!`);
            refetch()
          }
        });
    }
  };
  return (
    <div className="container" style={{ margin: "100px auto" }}>
      <h2 className="pt-3">Your all Orders</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Serial</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Eamil</th>
            <th scope="col">Price</th>
            <th scope="col">number</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={order._id}>
              <th scope="row">{index + 1}</th>
              <td>{order.customerName}</td>
              <td>{order.email}</td>
              <td>{order.price}$</td>
              <td>{order.phone}</td>
              <td>
                <button
                  onClick={() => handleDelete(order)}
                  className="btn btn-outline-danger"
                >
                  Delete Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
