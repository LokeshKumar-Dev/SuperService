import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../Constants/ProductConstants";
import { logout } from "./userActions";
import SuperServer from "../../api/SuperServer";

// PRODUCT LIST
export const listProduct =
  (keyword = " ", pageNumber = " ") =>
    async (dispatch) => {
      try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await SuperServer.get(
          `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
        );
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

// PRODUCT LIST by Category
export const listProductById =
  (id) =>
    async (dispatch) => {
      try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await SuperServer.get(
          `/api/products/category/${id}`
        );
        dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

export const listCategory =
  () =>
    async (dispatch) => {
      try {
        dispatch({ type: CATEGORY_LIST_REQUEST });
        const { data } = await SuperServer.get(
          `/api/products/category`
        );
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: CATEGORY_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await SuperServer.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// PRODUCT REVIEW CREATE
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await SuperServer.post(`/api/products/${productId}/review`, review, config);
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
