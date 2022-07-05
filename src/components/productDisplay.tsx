import * as React from "react";
import { Button } from "./button";
import { Posts } from "./product-list-components";
import styles from "../shopApp.module.css";
import { IProduct } from "../shop-app";

const countFavorite = (products: IProduct[]) => {
    let numFavorite = 0;
    for (let i = 0; i < products.length; i++) {
        if (products[i].isFavorite === true) {
            numFavorite += 1;
        }
    }
    return numFavorite;
};

interface IProductDisaplyProps {
    products: IProduct[];
    onClickButton: () => void;
    message: string;
    onClickFavorite: (title: string) => void;
}

export const ProductDisplay = ({
    products,
    onClickButton,
    message,
    onClickFavorite,
}: IProductDisaplyProps) => {
    const prodCount = products.length;
    const numFavorites = countFavorite(products);
    return (
        <div
            className={["container", styles.main].join(" ")}
            style={{ paddingTop: 0 }}
        >
            <div className={styles.buttonWrapper}>
                <span role="button">
                    <Button onClick={onClickButton}>
                        Send product proposal
                    </Button>
                </span>
                {message ? (
                    <div className={styles.messageContainer}>
                        <i>{message}</i>
                    </div>
                ) : null}
            </div>

            <div className={styles.statsContainer}>
                <span>Total products: {prodCount}</span>
                {" - "}
                <span>Number of favorites: {numFavorites}</span>
            </div>

            {products && !!products.length ? (
                <Posts products={products} onFav={onClickFavorite} />
            ) : (
                <div></div>
            )}
        </div>
    );
};
