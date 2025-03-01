import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./SideBar.module.css";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      

      <Outlet />

      <footer className={styles.footer}>
        <div>
          &copy; Copyright {new Date().getFullYear()} by worlWide Inc.
        </div>
      </footer>
    </div>
  );
}

export default SideBar;
