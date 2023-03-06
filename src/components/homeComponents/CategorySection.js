import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const CategorySection = (props) => {
  const sideNav = useRef(null);

  // const catie = {
  //   "Cleaning & Pest Control": [8, 9, 10],
  // }

  const productList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = productList;

  return (
    <>
      <div ref={sideNav} id="mySidenav" class="sidenav">
        <p class="closebtn" onClick={() => {
          sideNav.current.style.width = "0";
        }}><i class="fa fa-arrow-left" aria-hidden="true"></i></p>
        <p>About</p>
        <p>Services</p>
        <p>Clients</p>
        <p>Contact</p>
      </div>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              {/* <span onClick={() => {
                sideNav.current.style.width = "350px";
              }}>open</span> */}
              <h4 className="mb-4" style={{fontWeight: "300"}}>Categories</h4>
              <div className="shopcontainer">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {categories.map((category) => (
                      <Link to={`/category/${category.id}`} key={category._id}>
                        <div
                          className="categoryCard"
                          key={category._id}
                        >
                          <div className="categoryCard__img">
                            <img src={category.image} alt={category.name} />
                          </div>

                          <div className="categoryCard__title">
                            <p>
                              <i className="far fa-star"></i>
                              {category.description}
                            </p>
                            <h4>
                              {category.name}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySection;
