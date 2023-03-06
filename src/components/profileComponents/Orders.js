import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
const Orders = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              No Orders
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{
                  fontSize: "12px",
                }}
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>PAID</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className='alert-light'
                      key={order._id}
                      style={{ borderBottom: "1px solid grey" }}
                    >
                      <td>
                        <Link to={`/order/${order._id}`} className="link" style={{ color: '#000', textDecoration: "none" }}>
                          <i class="fa fa-folder-open"></i>
                        </Link>
                      </td>
                      <td style={{ fontWeight: "600" }}>
                        {
                          order.status < 1 ?
                            <p className="text-warning">Waiting</p> :
                            order.status === 1 ?
                              <p className="text-info">Confirmed</p> :
                              <p className="text-success">Completed</p>
                        }
                      </td>
                      <td>
                        {order.isPaid
                          ? moment(order.paidAt).calendar()
                          : moment(order.createdAt).calendar()}
                      </td>
                      <td>{order.isPaid ? <>Paid</> : <>Not Paid</>}</td>
                      <td>₹{order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
