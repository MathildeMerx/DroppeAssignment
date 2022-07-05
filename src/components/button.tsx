import * as React from "react";
import styles from "./button.module.css";

interface IButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export const Button = ({ children, onClick }: IButtonProps) => (
    <button className={styles.button} onClick={onClick}>
        {children}
    </button>
);
