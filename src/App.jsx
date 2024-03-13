import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./Component/Layout/Layout";
import { Products } from "./Component/Products/Products";
import Categories from "./Component/Categories/Categories";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import Home from "./Component/Home/Home";
import Brands from "./Component/Brands/Brands";
import { AuthContextProvider } from "./Context/Authcontext";
import Cart from "./Component/Cart/Cart";
import ProtectedRoute from "./Component/Gurd/Gurd";
import { QueryClient, QueryClientProvider } from "react-query";
import Productdetails from "./Component/Productdetails/Productdetails";
import CartcontextProvider from "./Context/Cartcontext";
import { Toaster } from "react-hot-toast";
import Payment from "./Component/Payment/Payment";
import Allorders from "./Component/Allorder/Allorders";
import Profile from "./Component/Profile/Profile";
const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, path: "home", element: <Home /> },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:cat",
        element: (
          <ProtectedRoute>
            <Productdetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
export default function App() {
  const myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
        <AuthContextProvider>
          <CartcontextProvider>
            <RouterProvider router={myRouter} />
          </CartcontextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}
