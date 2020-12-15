import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";

import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
// import {useParams} from 'react-router-dom'
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "SIlver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match, history }) => {
  // redux --> spread out the state and grab the user
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // console.log('single product', p)
      // 1. load single product
      setValues({ ...values, ...p.data });
      // 2. load single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); // show default subs
      });
      let arr = [];

      p.data.subs.map((s) => {
        return arr.push(s._id);
      });
      // console.log("ARR", arr);

      setArrayOfSubIds((prev) => arr);
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategories(c.data);
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} is updated`);
        // redirect to admin dashboard
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        toast.error(err.response.data.err);
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCategoryChange = (event) => {
    event.preventDefault();

    // console.log("CLICKED CATEGORY", event.target.value);

    setValues({ ...values, subs: [] });

    setSelectedCategory(event.target.value);

    getCategorySubs(event.target.value).then((res) => {
      // console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });

    // console.log("EXISTING CATEGORY values.category", values.category);

    if (values.category._id === event.target.value) {
      loadProduct();
    }
    setArrayOfSubIds([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product update</h4>
          )}

          {/* {JSON.stringify(slug)} */}
          {/* {JSON.stringify(values)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            setValues={setValues}
            values={values}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
