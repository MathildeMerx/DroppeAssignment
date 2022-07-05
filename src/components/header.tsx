import * as React from "react";
import styles from "../shop-app.module.css";
import logo from "../images/droppe-logo.png";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={["container", styles.headerImageWrapper].join(" ")}>
                <img src={logo} className={styles.headerImage} alt="logo" />
            </div>
        </header>
    );
};
