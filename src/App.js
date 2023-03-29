import { ChakraProvider, extendTheme, Flex } from "@chakra-ui/react";
import "./App.css";
import Layout from "./Components/Layout";
import StoreProvider from "./store";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Products from "./Components/Products";
import SingleProduct from "./Components/SingleProduct";
import ByCategory from "./Components/ByCategory";
import CartScreen from "./Components/CartScreen";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Navbar from "./Components/Navbar";
import SearchProducts from "./Components/SearchProducts";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminLayout from "./Components/Admin/AdminLayout";
import { Outlet } from "react-router-dom";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

// export const store = createContext()

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Sidebar />
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <Products category="product" />
          </>
        ),
      },
      {
        path: "/products",
        element: <Navigate to={"/"} />,
      },
      {
        path: "/products/:productId",
        element: <SingleProduct />,
      },
      {
        path: "/products-by-category/:category",
        element: <ByCategory />,
      },
      {
        path: "cart",
        element: <CartScreen />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
    // element: <><Sidebar /> <Products category="product" /></>
  },
]);

function App() {
  return (
    <StoreProvider>
      <ChakraProvider theme={theme}>
        {/* <RouterProvider router={router}>
        </RouterProvider>
        <Layout /> */}
        {/* <Navbar />
        <Sidebar /> */}
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
            </Route>
            <Route path="/" element={<Flex >
                    <Sidebar />
                    <Outlet />
            </Flex>}>
              <Route path="/" element={<Products category={"product"} />} />
              <Route path="products" element={<Navigate to="/" />} />
              <Route path="/search" element={<SearchProducts />} />
              <Route path="/products/:productId" element={<SingleProduct />} />
              <Route
                path="products-by-category/:category"
                element={<ByCategory />}
              />
              <Route path="cart" element={<CartScreen />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
            </Route>
          </Route>
        </Routes>
      </ChakraProvider>
    </StoreProvider>
  );
}

export default App;
