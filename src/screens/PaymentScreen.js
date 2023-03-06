import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import Header2 from "./../components/Header2";

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <Header2 />
      <div className="container d-flex justify-content-center align-items-center login-center h2c ">
        <form
          className="Login2 col-md-8 col-lg-4 col-11 shadow"
          onSubmit={submitHandler}
        >
          <h4>SELECT PAYMENT METHOD</h4>
          <div className="payment-container">
            <div className="radio-container">
              <div class="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="radio1"
                  name="optradio"
                  value="PayPal"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" for="radio1">PayPal or Credit Card</label>
              </div>
              <div class="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="radio2"
                  name="optradio"
                  value="Cash"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" for="radio2">Direct Cash</label>
              </div>
            </div>
          </div>

          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
