import { Fragment, React } from "react";

import Navbar from "../Navbar/Navbar";

import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Fragment>
      <Navbar onClick={props.onClick} />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
