import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";

import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [star, setStar] = useState();
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "Asus",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "SIlver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  // show categories in the sidebar
  const [categories, setCategories] = useState([]);

  const [categoriesIds, setCategoriesIds] = useState([]);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const { SubMenu, ItemGroup } = Menu;
  useEffect(() => {
    loadAllProducts();
    // fetch  categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    // console.log('load text', text);

    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoriesIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleCategories = () => {
    return categories.map((c) => {
      return (
        <div key={c._id}>
          <Checkbox
            onChange={handleCheck}
            className="pb-2 pl-4 pr-4"
            value={c._id}
            name="category"
            checked={categoriesIds.includes(c._id)}
          >
            {c.name}
          </Checkbox>
          <br />
        </div>
      );
    });
  };

  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    // console.log(e.target.value);

    let inTheState = [...categoriesIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setCategoriesIds(inTheState);

    // console.log(inTheState);

    fetchProducts({ category: inTheState });
  };

  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    fetchProducts({ stars: num });
  };

  const handleStars = () => {
    return (
      <div className="pr-4 pl-4 pb-2">
        <Star starClick={handleStarClick} numberOfStars={5} />
        <Star starClick={handleStarClick} numberOfStars={4} />
        <Star starClick={handleStarClick} numberOfStars={3} />
        <Star starClick={handleStarClick} numberOfStars={2} />
        <Star starClick={handleStarClick} numberOfStars={1} />
      </div>
    );
  };

  const handleSubCategories = () => {
    return subs.map((s) => {
      return (
        <div
          key={s._id}
          onClick={() => handleSubSubmit(s)}
          className="p-1 m-1 badge badge-secondary"
          style={{ cursor: "pointer" }}
        >
          {s.name}
        </div>
      );
    });
  };
  const handleSubSubmit = (sub) => {
    // console.log("SUB", s);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");

    fetchProducts({ sub: sub });
  };

  const handleBrands = () => {
    return brands.map((b) => {
      return (
        <Radio
          key={b}
          value={b}
          name={b}
          checked={b === brand}
          onChange={handleChangeBrand}
          className="pb-1 pl-4 pr-4"
        >
          {b}
        </Radio>
      );
    });
  };

  const handleChangeBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesIds([]);
    setStar("");
    setColor("");
    setShipping("");

    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const handleColors = () => {
    return colors.map((c) => {
      return (
        <Radio
          key={c}
          value={c}
          name={c}
          checked={c === color}
          onChange={handleChangeColor}
          className="pb-1 pl-4 pr-4"
        >
          {c}
        </Radio>
      );
    });
  };

  const handleChangeColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesIds([]);
    setStar("");
    setBrand("");
    setShipping("");

    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  const handleShipping = () => {
    return (
      <>
        <Checkbox
          className="pb-2 pl-4 pr-4"
          onChange={handleShippingChange}
          value="Yes"
          checked={shipping === "Yes"}
        >
          Yes
        </Checkbox>

        <Checkbox
          className="pb-2 pl-4 pr-4"
          onChange={handleShippingChange}
          value="No"
          checked={shipping === "No"}
        >
          No
        </Checkbox>
      </>
    );
  };

  const handleShippingChange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />
          <Menu
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            mode="inline"
          >
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined />
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </div>
            </SubMenu>
            {/* categories */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{handleCategories()}</div>
            </SubMenu>
            {/* stars */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined />
                  Rating
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{handleStars()}</div>
            </SubMenu>
            {/* subcategory */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Sub Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pl-4 pr-4">
                {handleSubCategories()}
              </div>
            </SubMenu>
            {/* Brands */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Brands
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5 ">
                {handleBrands()}
              </div>
            </SubMenu>
            {/* Colors */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Colors
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {handleColors()}
              </div>
            </SubMenu>
            {/* Shipping */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Shipping
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {handleShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>
        {/* Heading */}
        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          {products.length < 1 && <p>Not products found</p>}
          {/* Products */}
          <div className="row pb-5">
            {products.map((p) => {
              return (
                <div key={p._id} className="col-md-4 mt-3">
                  <ProductCard product={p} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
