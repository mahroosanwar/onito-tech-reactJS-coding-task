import { React } from "react";

import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <header className={styles["nav-header"]}>
      <nav className={styles.navbar}>
        <div>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              {/* <button onClick={props.onClick}>
                Registration Form
              </button> */}
              <Link to="/registration-form" onClick={props.onClick}>
                Registration Form
              </Link>
            </li>
            <li>
              <Link to="/users-data">Users Data</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
