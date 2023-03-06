import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Actions/userActions";
import Header from "./../components/Header";
import { verify } from "../Redux/Actions/userActions";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [Error, setError] = useState(false);
  const [otp, setOtp] = useState();
  const [isOtp, setisOtp] = useState(false);

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, isRegister, userEmail } = userRegister;

  useEffect(() => {
    console.log("register", isRegister);
    if (isRegister && userEmail) {
      setisOtp(true)
    }
  }, [isRegister, history, redirect, userEmail]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password1) {
      setError(true); return
    }
    setError(false);
    dispatch(register(name, email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const otpSubmitHandler = (e) => {
    e.preventDefault();
    if (otp && email) dispatch(verify(otp, email));
  };
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {isRegister && <Message variant="alert-warning"><Link to="/verify">Otp Verification</Link></Message>}
        {Error && <Message variant="alert-danger">{"Password doesn't match"}</Message>}
        {loading && <Loading />}

        {!isOtp ?
          <form
            className="Login col-md-8 col-lg-4 col-11"
            onSubmit={submitHandler}
          >
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />

            <button type="submit">Register</button>
            <p>
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                I Have Account <strong>Login</strong>
              </Link>
            </p>
          </form> :
          <div className="container d-flex flex-column justify-content-center align-items-center login-center">
            <form
              className="Login col-md-8 col-lg-4 col-11"
              onSubmit={otpSubmitHandler}
            >
              <input
                type="text"
                placeholder="Otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button type="submit">Verify</button>
              <p>
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        }


      </div>
    </>
  );
};

export default Register;
