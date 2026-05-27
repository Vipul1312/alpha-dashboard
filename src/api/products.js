import axios from "axios";

const BASE_URL = "https://dummyjson.com";


export const fetchProducts = async (limit = 100, skip = 0) => {
  const { data } = await axios.get(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/products/${id}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/products/categories`);
  return data.map((c) => (typeof c === "string" ? c : c.slug || c.name));
};
