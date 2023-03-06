import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import Footer from "./../components/Footer";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const id = match.params.id;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} id={id} />
      {/* <CalltoActionSection /> */}
      {/* <div className="shopcontainer row">
        {loading ? (
          <div className="mb-5">
            <Loading />
          </div>
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {products.map((product) => (
              <div
                className="shop col-lg-4 col-md-6 col-sm-6"
                key={product._id}
              >
                <div className="border-product">
                  <Link to={`/products/${product._id}`}>
                    <div className="shopBack">
                      <img src={product.image} alt={product.name} />
                    </div>
                  </Link>

                  <div className="shoptext">
                    <p>
                      <Link to={`/products/${product._id}`}>
                        {product.name}
                      </Link>
                    </p>

                    <Rating
                      value={product.rating || product.description.split(' ')[0]}
                      text={`${product.numReviews || product.description.split(' ')[1]} reviews`}
                    />
                    <h3>${product.price}</h3>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div> */}
      <Footer />
    </div>
  );
};

export default HomeScreen;
