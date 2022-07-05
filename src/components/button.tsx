import * as React from "react";
import styles from "./button.module.css";

interface IButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
}

export const Button = ({ children, onClick, type }: IButtonProps) => (
    <button className={styles.button} onClick={onClick} type={type}>
        {children}
    </button>
);
