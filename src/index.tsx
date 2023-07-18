import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AllProducts from "./pages/AllProducts";
import NewProduct from "./pages/NewProduct";
import ProductsDetail from "./pages/ProductsDetail";
import MyCart from "./pages/MyCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/products", element: <AllProducts /> },
      { path: "/products/new", element: <NewProduct /> },
      { path: "/products/:id", element: <ProductsDetail /> },
      { path: "/carts", element: <MyCart /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
