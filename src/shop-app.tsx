import * as React from "react";
import lodash from "lodash";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "./components/button";
import { Posts } from "./components/product-list-components";
import { Form } from "./components/form";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import styles from "./shopApp.module.css";

interface IProduct {
    category?: string;
    description: string;
    id?: number;
    image?: string;
    price: number | string;
    rating?: { count: number; rate: number };
    title: string;
    isFavorite?: boolean;
}

export const ShopApp = () => {
    const [products, setProducts] = React.useState<IProduct[]>([]);
    const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false);
    const [isShowingMessage, setIsShowingMessage] =
        React.useState<boolean>(false);
    const message = isShowingMessage ? "Adding product..." : "";
    const [numFavorites, setNumFavorites] = React.useState<number>(0);
    const prodCount = products.length;

    React.useEffect(() => {
        fetch("https://fakestoreapi.com/products").then((response) => {
            let jsonResponse = response.json();

            jsonResponse.then((rawData) => {
                let data = [];

                for (let i = 0; i < rawData.length; i++) {
                    let updatedProd = rawData[i];
                    data.push(updatedProd);
                }
                setProducts(data);
            });
        });
    }, []);

    React.useEffect(() => {
        document.title = "Droppe refactor app";
    }, []);

    const onClickFavorite = (title: string) => {
        const idx = lodash.findIndex(products, { title: title });
        if (idx === -1) {
            return;
        }
        const updateNumFavorite = products[idx].isFavorite ? -1 : 1;
        setProducts((products) => {
            let productsCopy = lodash.cloneDeep(products);
            productsCopy[idx].isFavorite = !products[idx].isFavorite;
            return productsCopy;
        });
        setNumFavorites((numFavorites) => numFavorites + updateNumFavorite);
    };

    const onSubmit = (payload: {
        title: string;
        description: string;
        price: string;
    }) => {
        setProducts((products) => {
            return [
                ...products,
                {
                    title: payload.title,
                    description: payload.description,
                    price: payload.price,
                },
            ];
        });

        setIsFormOpen(false);
        setIsShowingMessage(true);

        // **this POST request doesn't actually post anything to any database**
        fetch("https://fakestoreapi.com/products", {
            method: "POST",
            body: JSON.stringify({
                title: payload.title,
                price: payload.price,
                description: payload.description,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                (() => {
                    setTimeout(() => setIsShowingMessage(false), 2000);
                })();
            });
    };

    return (
        <React.Fragment>
            <div className={styles.header}>
                <div
                    className={["container", styles.headerImageWrapper].join(
                        " "
                    )}
                >
                    <img src={logo} className={styles.headerImage} alt="logo" />
                </div>
            </div>

            <>
                <span
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
                </span>
            </>

            <div
                className={["container", styles.main].join(" ")}
                style={{ paddingTop: 0 }}
            >
                <div className={styles.buttonWrapper}>
                    <span role="button">
                        <Button onClick={() => setIsFormOpen(true)}>
                            Send product proposal
                        </Button>
                    </span>
                    {isShowingMessage && (
                        <div className={styles.messageContainer}>
                            <i>{message}</i>
                        </div>
                    )}
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

            <>
                <Modal
                    isOpen={isFormOpen}
                    className={styles.reactModalContent}
                    overlayClassName={styles.reactModalOverlay}
                >
                    <div className={styles.modalContentHelper}>
                        <div
                            className={styles.modalClose}
                            onClick={() => setIsFormOpen(false)}
                        >
                            <FaTimes />
                        </div>

                        <Form on-submit={onSubmit} />
                    </div>
                </Modal>
            </>
        </React.Fragment>
    );
};
