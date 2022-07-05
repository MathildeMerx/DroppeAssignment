import * as React from "react";
import lodash from "lodash";
import { ModalProductProposal } from "./components/modalProductProposal";
import { Header } from "./components/header";
import { ImagesTop } from "./components/imagesTop";
import { ProductDisplay } from "./components/productDisplay";

export interface IProduct {
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
    const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false);
    const onClickButton = () => setIsFormOpen(true);

    React.useEffect(() => {
        document.title = "Droppe refactor app";
    }, []);

    const [products, setProducts] = React.useState<IProduct[]>([]);

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

            <ModalProductProposal
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                onSubmit={onSubmit}
            />
            <ProductDisplay
                products={products}
                onClickButton={onClickButton}
                message={message}
                onClickFavorite={onClickFavorite}
            />
        </React.Fragment>
    );
};
