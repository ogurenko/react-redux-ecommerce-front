// CRUD

import axios from "axios";

// list of categories
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

// get a single category
export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

// removing the category
export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  });
};

// update category
export const updateCategory = async (slug, category, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    category,
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};

// create category

export const createCategory = async (category, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken: authtoken,
    },
  });
};

// get subcategories
export const getCategorySubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
