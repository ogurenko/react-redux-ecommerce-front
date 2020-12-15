import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
  const {
    images,
    title,
    price,
    brand,
    color,
    count,
    quantity,
    shipping,
    _id,
  } = p;
  const dispatch = useDispatch();

  const colors = ["Black", "Brown", "SIlver", "White", "Blue"];

  const handleColorChange = (e) => {
    console.log("color change", e.target.value);
    // update the state of cart in redux and LS as well
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === _id) {
          cart[i].color = e.target.value;
        }
      });

      //   console.log("cart update color", cart);
      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    console.log("available quantity", quantity);
    let pcount = e.target.value < 1 ? 1 : e.target.value;

    if (pcount > quantity) {
      toast.error(`Max available quantity: ${quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
       cart.map((product, i) => {
        if (product.count === count) {
          if (product._id === _id) {
            cart[i].count = pcount;
          }
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const showColors = () => {
    return colors
      .filter((c) => c !== color)
      .map((c) => {
        return (
          <option key={c} value={c}>
            {c}
          </option>
        );
      });
  };

  const showColor = () => {
    return (
      <select
        onChange={handleColorChange}
        name="color"
        className="form-control"
      >
        {color ? (
          <option value={color}>{color}</option>
        ) : (
          <option>Select</option>
        )}
        {showColors()}
      </select>
    );
  };

  const handleRemove = () => {
    // console.log(_id, 'to remove');

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product.count === count) {
          if (product._id === _id) {
            cart.splice(i, 1);
          }
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {images.length ? (
              <ModalImage small={images[0].url} large={images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{title}</td>
        <td>${price}</td>
        <td>{brand}</td>
        <td>{showColor()}</td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center">
          {shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td>
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
