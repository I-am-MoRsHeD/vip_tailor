import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import Home from "../pages/Home/Home/Home";
import AddProduct from "../pages/AddProduct/AddProduct";
import Login from "../pages/Home/Login/SignIn.jsx";
import Registation from "../pages/Home/Registation/Registation.jsx";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome.jsx";
import ContactUs from "../pages/ContactUs/ContactUs.jsx";
import OrderedProduct from "../pages/Dashboard-Employee/OrderedProduct/OrderedProduct.jsx";
import EmployeeHome from "../pages/Dashboard-Employee/EmployeeHome/EmployeeHome.jsx";
import OrderedList from "../pages/Dashboard-Employee/OrderedList/OrderedList.jsx";
import MembersRequest from "../pages/Dashboard/MembersRequest/MembersRequest.jsx";
import AllMembers from "../pages/Dashboard/AllMembers/AllMembers.jsx";
import Errorpage from "../pages/ErrorPage/Errorpage.jsx";
import EmployeeRoute from "./EmployeeRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import ProductStatement from "../pages/Dashboard/ProductStatement/ProductStatement.jsx";
import OrderStatement from "../pages/Dashboard/OrderStatement/OrderStatement.jsx";
import NoticePage from "../pages/NoticePage/NoticePage.jsx";
import AddNotice from "../pages/Dashboard/AddNotice/AddNotice.jsx";
import ProductDetails from "../components/ProductDetails/ProductDetails.jsx";
import AddCategory from "../pages/Dashboard/AddCategory/AddCategory.jsx";
import AddToCart from "../pages/Dashboard/AddToCart/AddToCart.jsx";
import WaitingMessage from "../components/WaitingMessage/WaitingMessage.jsx";
import ForgetPass from "../pages/Home/Login/ForgetPass.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Errorpage></Errorpage>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/notice/:id",
        element: <NoticePage />,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/forgetpassword",
        element: <ForgetPass />,
      },
      {
        path: "/register",
        element: <Registation></Registation>,
      },
      {
        path: "/message",
        element: <WaitingMessage />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
    children: [
      // admin routes
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "addCategory",
        element: <AddCategory></AddCategory>,
      },
      {
        path: "productStatement",
        element: (
          <AdminRoute>
            <ProductStatement></ProductStatement>
          </AdminRoute>
        ),
      },
      {
        path: "orderStatement",
        element: (
          <AdminRoute>
            <OrderStatement></OrderStatement>
          </AdminRoute>
        ),
      },
      {
        path: "addNotice",
        element: (
          <AdminRoute>
            <AddNotice></AddNotice>
          </AdminRoute>
        ),
      },
      {
        path: "membersRequest",
        element: (
          <AdminRoute>
            <MembersRequest></MembersRequest>
          </AdminRoute>
        ),
      },
      {
        path: "allMembers",
        element: (
          <AdminRoute>
            <AllMembers></AllMembers>
          </AdminRoute>
        ),
      },
      // employee routes
      {
        path: "employeeHome",
        element: (
          <EmployeeRoute>
            <EmployeeHome></EmployeeHome>
          </EmployeeRoute>
        ),
      },
      {
        path: "productList",
        element: <ProductDetails />,
      },
      {
        path: "addToCart",
        element: <AddToCart />,
      },
      {
        path: "addProduct",
        element: (
          <EmployeeRoute>
            <AddProduct></AddProduct>
          </EmployeeRoute>
        ),
      },
      {
        path: "ordered",
        element: (
          <EmployeeRoute>
            <OrderedProduct></OrderedProduct>
          </EmployeeRoute>
        ),
      },
      {
        path: "orderedList",
        element: (
          <EmployeeRoute>
            <OrderedList></OrderedList>
          </EmployeeRoute>
        ),
      },
    ],
  },
]);

export default router;
