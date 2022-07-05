import React from "react";
import lodash from "lodash";

const messageText = "Adding product...";

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

export const useShopApp = () => {
    const [products, setProducts] = React.useState<IProduct[]>([]);

    const [message, setMessage] = React.useState<string>("");

    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const onClickButton = () => setIsFormOpen(true);

    React.useEffect(() => {
        document.title = "Droppe refactor app";
    }, []);

    React.useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then((rawData) => {
                let data = [];

                for (let i = 0; i < rawData.length; i++) {
                    let updatedProd = rawData[i];
                    data.push(updatedProd);
                }
                setProducts(data);
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
        setMessage(messageText);

        // **this POST request doesn't actually post anything to any database**
        fetch("https://fakestoreapi.com/products", {
            method: "POST",
            body: JSON.stringify({
                title: payload.title,
                price: payload.price,
                description: payload.description,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                (() => {
                    setTimeout(() => setMessage(""), 2000);
                })();
            });
    };

    return {
        onClickFavorite,
        message,
        onClickButton,
        products,
        onSubmit,
        isFormOpen,
        setIsFormOpen,
    };
};
