import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import { getUserDetails, updateUserProfilePhoto } from "../Redux/Actions/userActions";
import Orders from "./../components/profileComponents/Orders";
import moment from "moment";
import { listMyOrders } from "../Redux/Actions/OrderActions";
import * as filestack from 'filestack-js';

const ProfileScreen = () => {
  window.scrollTo(0, 0);

  const [image, setImage] = useState("");
  const client = filestack.init('AFmaRKROkSWypbC3kty3Az');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  useEffect(() => {
    dispatch(listMyOrders());
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  return (
    <>
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Profile Photo</h4>
            </div>
            <div className="modal-body px-4" style={{fontWeight: '200', fontSize: "1rem"}}>
              Here your photo changes completely
            </div>
            <form className="px-4">
              <label className="form-label">Images:</label>
              <input className="form-control mt-1 mb-2" type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required />
            </form>
            <div className="modal-footer px-4">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-dark" data-dismiss="modal"
                onClick={() => {
                  client.upload(image)
                    .then(data => {
                      dispatch(updateUserProfilePhoto({ image: data.url }));
                      // data.url
                    });
                }}
              >Submit</button>
            </div>
          </div>

        </div>
      </div>
      <Header />
      <div className="container mt-lg-5 mt-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow " style={{ borderRadius: "15px" }}>
            <div className="author-card pb-0 pb-md-3 br">
              <div className="author-card-profile col">
                <div className="author-card-avatar row-md-5" data-toggle="modal" data-target="#myModal">
                  {/* USER Dp */}
                  {
                    userInfo.image ?
                      <img src={userInfo.image} alt={userInfo.name} /> :
                      <img src={"./user.png"} alt={userInfo.name} />
                  }
                </div>
                <div className="author-card-details row-md-7 mt-4">
                  <h5 className="author-card-name mb-2">
                    <strong>{userInfo.name}</strong>
                  </h5>
                  <span className="author-card-position">
                    <>Joined {moment(userInfo.createdAt).format("LL")}</>
                  </span>
                </div>
              </div>
            </div>
            <div className="wizard pt-3 br">
              <div class="d-flex align-items-start br">
                <div
                  class="nav align-items-start flex-column col-12 nav-pills me-3 br"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    class="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Profile Settings
                  </button>
                  <button
                    class="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Orders List
                    <span className="badge2">{orders ? orders.length : 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* panels */}
          <div
            class="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              class="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTabs />
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders orders={orders} loading={loading} error={error} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
