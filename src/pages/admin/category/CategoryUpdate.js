import React, { useState, useEffect } from "react";
import CategoryForm from "../../../components/forms/CategoryForm";

import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";

import { updateCategory, getCategory } from "../../../functions/category";

const CategoryUpdate = (props) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // console.log(props);
    loadCategory();
  }, []);

  
  const loadCategory = () =>
    getCategory(props.match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log(name);
    setLoading(true);

    updateCategory(props.match.params.slug, { name }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        props.history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update Category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />

          {/* {JSON.stringify(categories)} */}
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
