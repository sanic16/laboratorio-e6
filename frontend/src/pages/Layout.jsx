import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import classes from "../styles/pages/Layout.module.css";

const Layout = () => {
  return (
    <div className={classes.body}>
      <NavBar />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
