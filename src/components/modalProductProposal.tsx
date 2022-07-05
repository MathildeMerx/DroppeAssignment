import * as React from "react";
import Modal from "react-modal";
import styles from "../shopApp.module.css";
import { Form } from "./form";
import { FaTimes } from "react-icons/fa";

interface IModalProductProposalProps {
    isFormOpen: boolean;
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (payload: {
        title: string;
        description: string;
        price: string;
    }) => void;
}

export const ModalProductProposal = ({
    isFormOpen,
    setIsFormOpen,
    onSubmit,
}: IModalProductProposalProps) => {
    return (
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

                <Form onSubmit={onSubmit} />
            </div>
        </Modal>
    );
};
