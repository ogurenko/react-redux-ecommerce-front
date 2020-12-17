import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

import { useSelector } from "react-redux";

import { getCategories } from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createSub, removeSub, getSubs } from "../../../functions/sub";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [parentcat, setParentcat] = useState("");

  const [searchQuery, setsearchQuery] = useState("");

  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    setLoading(true);

    createSub({ name: name, parent: parentcat }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleChange = (event) => {
    return setParentcat(event.target.value);
  };

  const handleRemove = async (slug) => {
    let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (answer) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          console.log(err);

          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (searchQuery) => (c) => {
    return c.name.toLowerCase().includes(searchQuery);
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
            <h4>Create Sub Category</h4>
          )}

          <div className="form-group">
            <label>Parent Category</label>

            <select
              name="parentcat"
              className="form-control"
              onChange={handleChange}
            >
              <option>Please select</option>

              {categories.length > 0 &&
                categories.map((c) => {
                  return (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* {JSON.stringify(parentcat)} */}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <LocalSearch
            searchQuery={searchQuery}
            setsearchQuery={setsearchQuery}
          />

          {subs.filter(searched(searchQuery)).map((s) => {
            return (
              <div key={s._id} className="alert alert-secondary">
                {s.name}
                <span
                  onClick={() => handleRemove(s.slug)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/sub/${s.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
