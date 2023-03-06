import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Message from "../components/LoadingError/Error";
import { saveShippingAddress } from "../Redux/Actions/cartActions";

import axios from "axios";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  const autoDetectHandler = (e) => {
    e.preventDefault();
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const res = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&apiKey=b413cdd854ce4f48bc3acd90b81aee6e`)
            .catch((err) => {
              setError(true);
              console.log("Geolocation error", err);
            })
          if (res) {
            const loc = res.data.features[0].properties;
            setCountry(loc.country);
            setPostalCode(loc.postcode);
            setCity(loc.district + " " + loc.county);
          };
        },
        (err) => {
          setError(true);
          console.log("Geolocation error", err);
        },
        options);
    } else {
      setError(true);
      console.log("Geolocation is not supported by this browser.");
    }
  };
  return (
    <>
      <Header />
      {error && <Message variant="alert-danger">Geolocation is not supported by this browser.</Message>}
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-5 col-11"
          onSubmit={submitHandler}
        >
          <h6>DELIVERY ADDRESS</h6>
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <button onClick={autoDetectHandler} type="button" className="mx-2" style={{ width: "40%" }}>Auto-Detect</button>
          <button type="submit" className="" style={{ width: "40%", textAlign: "center" }}>Continue<i class="mx-1 fa fa-chevron-right"></i></button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
