import * as React from "react";
import lodash from "lodash";
import { Button } from "./components/button";
import { Posts } from "./components/product-list-components";
import styles from "./shopApp.module.css";
import { ModalProductProposal } from "./components/modalProductProposal";
import { Header } from "./components/header";
import { ImagesTop } from "./components/imagesTop";

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
    const prodCount = products.length;
    const numFavorites = countFavorite(products);

    const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false);

    const [isShowingMessage, setIsShowingMessage] =
        React.useState<boolean>(false);
    const message = isShowingMessage ? "Adding product..." : "";

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
        setProducts((products) => {
            let productsCopy = lodash.cloneDeep(products);
            productsCopy[idx].isFavorite = !products[idx].isFavorite;
            return productsCopy;
        });
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
            <Header />
            <ImagesTop />

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

            <ModalProductProposal
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                onSubmit={onSubmit}
            />
        </React.Fragment>
    );
};

const countFavorite = (products: IProduct[]) => {
    let numFavorite = 0;
    for (let i = 0; i < products.length; i++) {
        if (products[i].isFavorite === true) {
            numFavorite += 1;
        }
    }
    return numFavorite;
};
