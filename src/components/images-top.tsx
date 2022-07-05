import * as React from "react";
import styles from "../shop-app.module.css";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";

export const ImagesTop = () => {
    return (
        <div
            className={["container", styles.main].join(" ")}
            style={{
                margin: "50px inherit",
                display: "flex",
                justifyContent: "space-evenly",
            }}
        >
            <img
                src={img1}
                style={{ maxHeight: "15em", display: "block" }}
                alt="people preparing food"
            />
            <img
                src={img2}
                style={{ maxHeight: "15rem", display: "block" }}
                alt="worker fixing shelve"
            />
        </div>
    );
};
