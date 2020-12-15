import axios from "axios";

export const getCoupons = async () =>
  axios.get(`${process.env.REACT_APP_API}/coupons`);

export const removeCoupon = async (couponId, authToken) =>
  axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      authToken,
    },
  });

export const createCoupon = async (coupon, authToken) =>
  axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        authToken,
      },
    }
  );
