import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {
  return (
    <>
      {orders.map((order) => {
        const showOrderInTable = (order) => {
          return (
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th className="scope">Title</th>
                  <th className="scope">Price</th>
                  <th className="scope">Brand</th>
                  <th className="scope">Color</th>
                  <th className="scope">Count</th>
                  <th className="scope">Shipping</th>
                </tr>
              </thead>

              <tbody>
                {order.products.map((p, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <b>{p.product.title}</b>
                      </td>
                      <td>{p.product.price}</td>
                      <td>{p.product.brand}</td>
                      <td>{p.color}</td>
                      <td>{p.count}</td>
                      <td>
                        {p.product.shipping === "Yes" ? (
                          <CheckCircleOutlined style={{ color: "green" }} />
                        ) : (
                          <CloseCircleOutlined style={{ color: "red" }} />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        };
        return (
          <div key={order._id} className="row pb-5">
            <div className="btn btn-block bg-light">
              <ShowPaymentInfo order={order} showStatus={false} />

              <div className="row">
                <div className="col-md-4">Delivery Status</div>
                <div className="col-md-8">
                  <select
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="form-control"
                    defaultValue={order.orderStatus}
                    name="status"
                  >
                    <option value="Not Processed">Not Processed</option>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="processing">Processing</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {showOrderInTable(order)}
          </div>
        );
      })}
    </>
  );
};

export default Orders;
