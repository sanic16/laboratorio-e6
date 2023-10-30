import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Layout from "./pages/Layout";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import RequireAuth from "./pages/RequireAuth";
import Login from "./pages/Login";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <Error />,
//     children: [
//       { path: "", element: <Home /> },
//       { path: "about", element: <About /> },
//       { path: "dashboard", element: <Dashboard />  },
//     ],
//   },
// ]);

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      
      <Route path="/" element={<RequireAuth />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Route>
    <Route path="*" element={<Error />} />
  </Route>
)

const router = createBrowserRouter(routeDefinitions)



function App() {
  // const auth = useSelector(state => state.auth.isAuth)
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
