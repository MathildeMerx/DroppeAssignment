import * as React from "react";
import { ModalProductProposal } from "./components/modalProductProposal";
import { Header } from "./components/header";
import { ImagesTop } from "./components/imagesTop";
import { ProductDisplay } from "./components/productDisplay";
import { useShopApp } from "./useShopApp";

export const ShopApp = () => {
    const {
        onClickFavorite,
        message,
        onClickButton,
        products,
        onSubmit,
        isFormOpen,
        setIsFormOpen,
    } = useShopApp();

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
