import React from "react";
import styles from "./Hamburger.module.css";

// Hamburger menu component
// Takes in open and setOpen
// Open is a boolean that determines if the menu is open or closed
// SetOpen is a function that sets the open state
const HamburgerMenu = ({ open, setOpen }) => {
    const hamburgerStyles = `block ${
        styles["hamburger"]
    } md:hidden focus:outline-none ${open ? styles["open"] : ""}`;

    return (
        <div className="h-full translate-y-1">
            <button
                id={styles["menu-btn"]}
                className={hamburgerStyles}
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <span
                    className={`${styles["ham-line"]}  ${styles["hamburger--relative"]}  ${styles["hamburger-top"]}`}
                ></span>
                <span
                    className={`${styles["ham-line"]}  ${styles["hamburger--relative"]}  ${styles["hamburger-middle"]}`}
                ></span>
                <span
                    className={`${styles["ham-line"]}  ${styles["hamburger--relative"]}  ${styles["hamburger-bottom"]}`}
                ></span>
            </button>
        </div>
    );
};

export default HamburgerMenu;
