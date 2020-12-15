import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "Macbook Pro",
  description: "This is the best product",
  price: "33333",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "50",
  images: [],
  colors: ["Black", "Brown", "SIlver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "Black",
  brand: "Apple",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);

  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  // redux --> spread out the state and grab the user
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (event) => {
    event.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        // browser built-in alert
        window.alert(`${res.data.title} is created`);

        window.location.reload();
      })
      .catch((err) => {
        console.log(err);

        toast.error(err.response.data.err);
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });

    // console.log(event.target.name, '-----', event.target.value);
  };
  const handleCategoryChange = (event) => {
    event.preventDefault();

    console.log("CLICKED CATEGORY", event.target.value);

    setValues({ ...values, subs: [], category: event.target.value });

    getCategorySubs(event.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
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
            <h4>Product create</h4>
          )}
          <hr />

          {/* {JSON.stringify(values.categories)} */}

          {/* {JSON.stringify(values)} */}

          {JSON.stringify(values.subs)}

          {JSON.stringify(values.images)}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
